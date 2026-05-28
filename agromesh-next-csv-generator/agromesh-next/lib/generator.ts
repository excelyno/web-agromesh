import { FieldConfig, PresetName, Sensor } from './types';
import { SENSOR_TYPES } from './sensorTypes';

export const DEFAULT_FIELD: FieldConfig = {
  width: 100,
  height: 100,
  depth: 20,
  unit: 'meter',
  fieldName: 'Demo Smart Farming Field'
};

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function typeAt(index: number): string {
  return SENSOR_TYPES[index % (SENSOR_TYPES.length - 1)].label;
}

export function createSensor(id: number, x: number, y: number, z = 0, type?: string): Sensor {
  const padded = String(id + 1).padStart(2, '0');
  return {
    id,
    name: `Sensor ${padded}`,
    type: type ?? typeAt(id),
    x: round2(x),
    y: round2(y),
    z: round2(z)
  };
}

export function generateRandomSensors(count: number, field: FieldConfig): Sensor[] {
  const sensors: Sensor[] = [];
  for (let i = 0; i < count; i++) {
    sensors.push(createSensor(
      i,
      Math.random() * field.width,
      Math.random() * field.height,
      Math.random() * Math.max(0, field.depth * 0.25)
    ));
  }
  return sensors;
}

export function generateGridSensors(rows: number, cols: number, field: FieldConfig): Sensor[] {
  const sensors: Sensor[] = [];
  const xGap = field.width / (cols + 1);
  const yGap = field.height / (rows + 1);
  let id = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      sensors.push(createSensor(id, xGap * (c + 1), yGap * (r + 1), 0));
      id++;
    }
  }
  return sensors;
}

export function generatePresetSensors(preset: PresetName, field: FieldConfig): Sensor[] {
  if (preset === 'greenhouse') {
    return generateGridSensors(4, 6, { ...field, width: 60, height: 40, depth: 5 });
  }

  if (preset === 'orchard') {
    const base = generateGridSensors(5, 5, field);
    return base.map((sensor, index) => ({ ...sensor, type: index % 4 === 0 ? 'Soil Nutrient' : sensor.type }));
  }

  if (preset === 'hydroponic') {
    const sensors = generateGridSensors(3, 8, { ...field, width: 80, height: 30, depth: 4 });
    return sensors.map((sensor, index) => ({ ...sensor, type: index % 3 === 0 ? 'Water Level' : index % 3 === 1 ? 'pH Soil' : 'Temperature' }));
  }

  return [
    createSensor(0, 8, 8, 0, 'Soil Moisture'),
    createSensor(1, 22, 12, 0, 'Temperature'),
    createSensor(2, 38, 10, 0, 'Humidity'),
    createSensor(3, 55, 14, 0, 'pH Soil'),
    createSensor(4, 78, 9, 0, 'Light Intensity'),
    createSensor(5, 90, 22, 0, 'Rainfall'),
    createSensor(6, 14, 31, 0, 'Soil Nutrient'),
    createSensor(7, 30, 35, 0, 'Soil Moisture'),
    createSensor(8, 47, 32, 0, 'Temperature'),
    createSensor(9, 68, 38, 0, 'Humidity'),
    createSensor(10, 86, 41, 0, 'pH Soil'),
    createSensor(11, 10, 54, 0, 'Light Intensity'),
    createSensor(12, 25, 58, 0, 'Rainfall'),
    createSensor(13, 44, 54, 0, 'Soil Moisture'),
    createSensor(14, 62, 62, 0, 'Soil Nutrient'),
    createSensor(15, 81, 59, 0, 'Temperature'),
    createSensor(16, 17, 74, 0, 'Humidity'),
    createSensor(17, 35, 78, 0, 'pH Soil'),
    createSensor(18, 51, 75, 0, 'Soil Moisture'),
    createSensor(19, 72, 80, 0, 'Light Intensity'),
    createSensor(20, 91, 76, 0, 'Rainfall'),
    createSensor(21, 12, 91, 0, 'Soil Nutrient'),
    createSensor(22, 32, 92, 0, 'Temperature'),
    createSensor(23, 58, 90, 0, 'Humidity'),
    createSensor(24, 84, 92, 0, 'Soil Moisture')
  ];
}
