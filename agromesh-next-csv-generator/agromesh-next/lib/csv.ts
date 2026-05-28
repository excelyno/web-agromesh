import { Sensor, ValidationResult } from './types';

function cleanCell(value: string): string {
  return value.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
}

export function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let insideQuote = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (insideQuote && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        insideQuote = !insideQuote;
      }
    } else if (ch === ',' && !insideQuote) {
      result.push(cleanCell(current));
      current = '';
    } else {
      current += ch;
    }
  }

  result.push(cleanCell(current));
  return result;
}

export function parseSensorsCsv(text: string): Sensor[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const header = splitCsvLine(lines[0]).map((item) => item.toLowerCase());
  const required = ['id', 'name', 'type', 'x', 'y', 'z'];
  const indexMap = required.map((name) => header.indexOf(name));

  if (indexMap.some((index) => index === -1)) {
    throw new Error('Header CSV wajib berisi: id,name,type,x,y,z');
  }

  return lines.slice(1).map((line, rowIndex) => {
    const cols = splitCsvLine(line);
    const sensor: Sensor = {
      id: Number(cols[indexMap[0]]),
      name: cols[indexMap[1]],
      type: cols[indexMap[2]],
      x: Number(cols[indexMap[3]]),
      y: Number(cols[indexMap[4]]),
      z: Number(cols[indexMap[5]])
    };

    if (!Number.isFinite(sensor.id) || !Number.isFinite(sensor.x) || !Number.isFinite(sensor.y) || !Number.isFinite(sensor.z)) {
      throw new Error(`Data numerik tidak valid pada baris ${rowIndex + 2}`);
    }

    return sensor;
  });
}

function escapeCsv(value: string | number): string {
  const text = String(value);
  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function sensorsToCsv(sensors: Sensor[]): string {
  const header = 'id,name,type,x,y,z';
  const rows = sensors.map((sensor) => [
    sensor.id,
    sensor.name,
    sensor.type,
    sensor.x.toFixed(2),
    sensor.y.toFixed(2),
    sensor.z.toFixed(2)
  ].map(escapeCsv).join(','));
  return [header, ...rows].join('\n');
}

export function validateSensors(sensors: Sensor[], width: number, height: number, depth: number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<number>();

  if (sensors.length < 2) {
    warnings.push('Minimal 2 sensor dibutuhkan agar program C++ dapat membangun jaringan.');
  }

  sensors.forEach((sensor, index) => {
    const label = sensor.name || `baris ${index + 1}`;
    if (ids.has(sensor.id)) errors.push(`ID duplikat ditemukan: ${sensor.id}.`);
    ids.add(sensor.id);
    if (!sensor.name.trim()) errors.push(`${label}: nama sensor kosong.`);
    if (!sensor.type.trim()) errors.push(`${label}: tipe sensor kosong.`);
    if (!Number.isFinite(sensor.x) || !Number.isFinite(sensor.y) || !Number.isFinite(sensor.z)) errors.push(`${label}: koordinat harus angka.`);
    if (sensor.x < 0 || sensor.x > width) warnings.push(`${label}: koordinat x berada di luar lebar lahan.`);
    if (sensor.y < 0 || sensor.y > height) warnings.push(`${label}: koordinat y berada di luar panjang lahan.`);
    if (sensor.z < 0 || sensor.z > depth) warnings.push(`${label}: koordinat z berada di luar kedalaman/elevasi lahan.`);
  });

  return { ok: errors.length === 0, errors, warnings };
}

export function downloadTextFile(filename: string, content: string, type = 'text/csv;charset=utf-8;'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
