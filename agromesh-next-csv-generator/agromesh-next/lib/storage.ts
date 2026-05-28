import { FieldConfig, Sensor } from './types';

const SENSOR_KEY = 'agromesh.sensors.v1';
const FIELD_KEY = 'agromesh.field.v1';

export function saveSensors(sensors: Sensor[]): void {
  localStorage.setItem(SENSOR_KEY, JSON.stringify(sensors));
}

export function loadSensors(): Sensor[] | null {
  const raw = localStorage.getItem(SENSOR_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as Sensor[]; } catch { return null; }
}

export function saveField(field: FieldConfig): void {
  localStorage.setItem(FIELD_KEY, JSON.stringify(field));
}

export function loadField(): FieldConfig | null {
  const raw = localStorage.getItem(FIELD_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as FieldConfig; } catch { return null; }
}
