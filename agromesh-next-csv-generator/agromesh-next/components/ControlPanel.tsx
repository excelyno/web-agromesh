'use client';

import { FieldConfig, PresetName } from '../lib/types';

type Props = {
  field: FieldConfig;
  sensorCount: number;
  onFieldChange: (field: FieldConfig) => void;
  onGenerateRandom: (count: number) => void;
  onGenerateGrid: (rows: number, cols: number) => void;
  onPreset: (preset: PresetName) => void;
  onClear: () => void;
};

export default function ControlPanel({ field, sensorCount, onFieldChange, onGenerateRandom, onGenerateGrid, onPreset, onClear }: Props) {
  return (
    <div className="panel">
      <div className="panel-title"><h3>Konfigurasi Lahan</h3></div>
      <div className="form-row">
        <label>Nama lahan</label>
        <input className="input" value={field.fieldName} onChange={(event) => onFieldChange({ ...field, fieldName: event.target.value })} />
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>Lebar X</label>
          <input className="input" type="number" min={1} value={field.width} onChange={(event) => onFieldChange({ ...field, width: Number(event.target.value) })} />
        </div>
        <div className="form-row">
          <label>Panjang Y</label>
          <input className="input" type="number" min={1} value={field.height} onChange={(event) => onFieldChange({ ...field, height: Number(event.target.value) })} />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-row">
          <label>Elevasi Z Max</label>
          <input className="input" type="number" min={0} value={field.depth} onChange={(event) => onFieldChange({ ...field, depth: Number(event.target.value) })} />
        </div>
        <div className="form-row">
          <label>Satuan</label>
          <select className="select" value={field.unit} onChange={(event) => onFieldChange({ ...field, unit: event.target.value as 'meter' | 'cm' })}>
            <option value="meter">meter</option>
            <option value="cm">cm</option>
          </select>
        </div>
      </div>

      <div className="panel-title" style={{ marginTop: 12 }}><h3>Generator Dataset</h3><span className="badge">{sensorCount} sensor</span></div>
      <div className="button-row">
        <button className="btn secondary small" onClick={() => onPreset('rice_field')}>Preset Sawah 25</button>
        <button className="btn secondary small" onClick={() => onPreset('greenhouse')}>Greenhouse 24</button>
        <button className="btn secondary small" onClick={() => onPreset('orchard')}>Orchard 25</button>
        <button className="btn secondary small" onClick={() => onPreset('hydroponic')}>Hydroponic 24</button>
      </div>
      <div className="button-row" style={{ marginTop: 10 }}>
        <button className="btn small" onClick={() => onGenerateRandom(25)}>Random 25</button>
        <button className="btn small" onClick={() => onGenerateRandom(50)}>Random 50</button>
        <button className="btn secondary small" onClick={() => onGenerateGrid(5, 5)}>Grid 5x5</button>
        <button className="btn danger small" onClick={onClear}>Kosongkan</button>
      </div>
    </div>
  );
}
