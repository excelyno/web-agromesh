import { SensorTypeKey } from './types';

export const SENSOR_TYPES: Array<{ key: SensorTypeKey; label: string; color: string; radius: number }> = [
  { key: 'soil_moisture', label: 'Soil Moisture', color: '#2f855a', radius: 17 },
  { key: 'temperature', label: 'Temperature', color: '#e53e3e', radius: 17 },
  { key: 'humidity', label: 'Humidity', color: '#3182ce', radius: 17 },
  { key: 'ph_soil', label: 'pH Soil', color: '#805ad5', radius: 17 },
  { key: 'light_intensity', label: 'Light Intensity', color: '#d69e2e', radius: 17 },
  { key: 'rainfall', label: 'Rainfall', color: '#2b6cb0', radius: 17 },
  { key: 'soil_nutrient', label: 'Soil Nutrient', color: '#dd6b20', radius: 17 },
  { key: 'water_level', label: 'Water Level', color: '#00a3c4', radius: 17 },
  { key: 'wind_speed', label: 'Wind Speed', color: '#4a5568', radius: 17 },
  { key: 'gateway_candidate', label: 'Gateway Candidate', color: '#1a202c', radius: 20 }
];

export function getSensorTypeColor(label: string): string {
  const found = SENSOR_TYPES.find((item) => item.label === label || item.key === label);
  return found ? found.color : '#2f855a';
}

export function getSensorTypeRadius(label: string): number {
  const found = SENSOR_TYPES.find((item) => item.label === label || item.key === label);
  return found ? found.radius : 17;
}

export function defaultSensorType(): string {
  return SENSOR_TYPES[0].label;
}
