'use client';

import * as XLSX from 'xlsx';
import { Sensor } from '../lib/types';
import { downloadTextFile, parseSensorsCsv, sensorsToCsv } from '../lib/csv';

type Props = {
  sensors: Sensor[];
  onImport: (sensors: Sensor[]) => void;
};

export default function ImportExportPanel({ sensors, onImport }: Props) {
  async function importCsv(file: File) {
    const text = await file.text();
    const parsed = parseSensorsCsv(text);
    onImport(parsed);
  }

  async function importXlsx(file: File) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet);
    const parsed: Sensor[] = rows.map((row, index) => ({
      id: Number(row.id ?? row.ID ?? index),
      name: String(row.name ?? row.Name ?? `Sensor ${String(index + 1).padStart(2, '0')}`),
      type: String(row.type ?? row.Type ?? 'Soil Moisture'),
      x: Number(row.x ?? row.X ?? 0),
      y: Number(row.y ?? row.Y ?? 0),
      z: Number(row.z ?? row.Z ?? 0)
    }));
    onImport(parsed);
  }

  function exportXlsx() {
    const worksheet = XLSX.utils.json_to_sheet(sensors.map((sensor) => ({
      id: sensor.id,
      name: sensor.name,
      type: sensor.type,
      x: Number(sensor.x.toFixed(2)),
      y: Number(sensor.y.toFixed(2)),
      z: Number(sensor.z.toFixed(2))
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'sensors');
    XLSX.writeFile(workbook, 'sensors.xlsx');
  }

  return (
    <div className="panel">
      <div className="panel-title"><h3>Import / Export</h3></div>
      <p className="help">File CSV yang dihasilkan kompatibel dengan program C++ terminal AgroMesh: <b>id,name,type,x,y,z</b>.</p>
      <div className="form-row">
        <label>Import CSV / XLSX</label>
        <input
          className="input"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            if (file.name.toLowerCase().endsWith('.csv')) await importCsv(file);
            else await importXlsx(file);
            event.target.value = '';
          }}
        />
      </div>
      <div className="button-row">
        <button className="btn" onClick={() => downloadTextFile('sensors.csv', sensorsToCsv(sensors))}>Download CSV</button>
        <button className="btn secondary" onClick={exportXlsx}>Download XLSX</button>
        <button className="btn secondary" onClick={() => downloadTextFile('agromesh_dataset.json', JSON.stringify({ sensors }, null, 2), 'application/json')}>Download JSON</button>
      </div>
    </div>
  );
}
