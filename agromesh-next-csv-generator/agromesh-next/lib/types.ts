export type SensorTypeKey =
  | 'soil_moisture'
  | 'temperature'
  | 'humidity'
  | 'ph_soil'
  | 'light_intensity'
  | 'rainfall'
  | 'soil_nutrient'
  | 'water_level'
  | 'wind_speed'
  | 'gateway_candidate';

export type Sensor = {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  z: number;
  note?: string;
};

export type FieldConfig = {
  width: number;
  height: number;
  depth: number;
  unit: 'meter' | 'cm';
  fieldName: string;
};

export type ValidationResult = {
  ok: boolean;
  errors: string[];
  warnings: string[];
};

export type PresetName = 'rice_field' | 'greenhouse' | 'orchard' | 'hydroponic';
