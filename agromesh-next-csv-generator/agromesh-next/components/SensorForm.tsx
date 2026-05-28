'use client';

import { FieldConfig, Sensor } from '../lib/types';
import { SENSOR_TYPES } from '../lib/sensorTypes';

type Props = {
  sensor: Sensor | null;
  field: FieldConfig;
  onChange: (sensor: Sensor) => void;
  onDelete: (id: number) => void;
};

export default function SensorForm({ sensor, field, onChange, onDelete }: Props) {
  if (!sensor) {
    return (
      <div className="panel">
        <div className="panel-title"><h3>Editor Sensor</h3></div>
        <p className="help">Pilih titik sensor pada lahan untuk mengubah nama, tipe, dan koordinatnya. Double click pada lahan untuk menambah sensor baru.</p>
      </div>
    );
  }

  function update<K extends keyof Sensor>(key: K, value: Sensor[K]) {
    onChange({ ...sensor!, [key]: value });
  }

  return (
    <div className="panel">
      <div className="panel-title">
        <h3>Editor Sensor</h3>
        <span className="badge">ID {sensor.id}</span>
      </div>
      <div className="form-row">
        <label>Nama sensor</label>
        <input className="input" value={sensor.name} onChange={(event) => update('name', event.target.value)} />
      </div>
      <div className="form-row">
        <label>Tipe sensor</label>
        <select className="select" value={sensor.type} onChange={(event) => update('type', event.target.value)}>
          {SENSOR_TYPES.map((item) => <option key={item.key} value={item.label}>{item.label}</option>)}
        </select>
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>X / lebar</label>
          <input className="input" type="number" min={0} max={field.width} step="0.01" value={sensor.x} onChange={(event) => update('x', Number(event.target.value))} />
        </div>
        <div className="form-row">
          <label>Y / panjang</label>
          <input className="input" type="number" min={0} max={field.height} step="0.01" value={sensor.y} onChange={(event) => update('y', Number(event.target.value))} />
        </div>
      </div>
      <div className="form-row">
        <label>Z / elevasi</label>
        <input className="input" type="number" min={0} max={field.depth} step="0.01" value={sensor.z} onChange={(event) => update('z', Number(event.target.value))} />
      </div>
      <button className="btn danger" onClick={() => onDelete(sensor.id)}>Hapus Sensor</button>
    </div>
  );
}
