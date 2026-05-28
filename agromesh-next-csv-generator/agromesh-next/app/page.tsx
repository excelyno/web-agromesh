'use client';

import { useEffect, useMemo, useState } from 'react';
import FieldCanvas from '../components/FieldCanvas';
import SensorForm from '../components/SensorForm';
import ControlPanel from '../components/ControlPanel';
import ImportExportPanel from '../components/ImportExportPanel';
import SensorTable from '../components/SensorTable';
import CsvPreview from '../components/CsvPreview';
import ValidationBox from '../components/ValidationBox';
import { FieldConfig, PresetName, Sensor } from '../lib/types';
import { DEFAULT_FIELD, createSensor, generateGridSensors, generatePresetSensors, generateRandomSensors } from '../lib/generator';
import { validateSensors } from '../lib/csv';
import { loadField, loadSensors, saveField, saveSensors } from '../lib/storage';
import { defaultSensorType } from '../lib/sensorTypes';

export default function HomePage() {
  const [field, setField] = useState<FieldConfig>(DEFAULT_FIELD);
  const [sensors, setSensors] = useState<Sensor[]>(() => generatePresetSensors('rice_field', DEFAULT_FIELD));
  const [selectedId, setSelectedId] = useState<number | null>(0);
  const [showApproxLinks, setShowApproxLinks] = useState(true);
  const [activeTab, setActiveTab] = useState<'table' | 'csv' | 'validation'>('table');

  useEffect(() => {
    const savedSensors = loadSensors();
    const savedField = loadField();
    if (savedField) setField(savedField);
    if (savedSensors && savedSensors.length > 0) setSensors(savedSensors);
  }, []);

  useEffect(() => { saveSensors(sensors); }, [sensors]);
  useEffect(() => { saveField(field); }, [field]);

  const selectedSensor = sensors.find((sensor) => sensor.id === selectedId) ?? null;
  const validation = useMemo(() => validateSensors(sensors, field.width, field.height, field.depth), [sensors, field]);
  const stats = useMemo(() => {
    const types = new Set(sensors.map((sensor) => sensor.type));
    const avgX = sensors.length ? sensors.reduce((sum, sensor) => sum + sensor.x, 0) / sensors.length : 0;
    const avgY = sensors.length ? sensors.reduce((sum, sensor) => sum + sensor.y, 0) / sensors.length : 0;
    return { types: types.size, avgX, avgY, completeEdges: sensors.length * (sensors.length - 1) / 2 };
  }, [sensors]);

  function nextSensorId(): number {
    let id = 0;
    const used = new Set(sensors.map((sensor) => sensor.id));
    while (used.has(id)) id++;
    return id;
  }

  function addSensor(x: number, y: number) {
    const id = nextSensorId();
    const sensor = createSensor(id, x, y, 0, defaultSensorType());
    setSensors((current) => [...current, sensor]);
    setSelectedId(id);
  }

  function updateSensor(updated: Sensor) {
    setSensors((current) => current.map((sensor) => sensor.id === updated.id ? { ...updated, x: Number(updated.x), y: Number(updated.y), z: Number(updated.z) } : sensor));
  }

  function moveSensor(id: number, x: number, y: number) {
    setSensors((current) => current.map((sensor) => sensor.id === id ? { ...sensor, x, y } : sensor));
  }

  function deleteSensor(id: number) {
    const next = sensors.filter((sensor) => sensor.id !== id);
    setSensors(next);
    setSelectedId(next[0]?.id ?? null);
  }

  function importSensors(nextSensors: Sensor[]) {
    setSensors(nextSensors);
    setSelectedId(nextSensors[0]?.id ?? null);
  }

  function applyPreset(preset: PresetName) {
    let nextField = field;
    if (preset === 'greenhouse') nextField = { ...field, fieldName: 'Greenhouse Simulation', width: 60, height: 40, depth: 5 };
    if (preset === 'hydroponic') nextField = { ...field, fieldName: 'Hydroponic Farm Simulation', width: 80, height: 30, depth: 4 };
    if (preset === 'orchard') nextField = { ...field, fieldName: 'Orchard Field Simulation', width: 120, height: 120, depth: 20 };
    if (preset === 'rice_field') nextField = { ...field, fieldName: 'Rice Field Simulation', width: 100, height: 100, depth: 20 };
    setField(nextField);
    const generated = generatePresetSensors(preset, nextField);
    setSensors(generated);
    setSelectedId(generated[0]?.id ?? null);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-card">
          <div className="kicker">AgroMesh CSV/XLSX Generator</div>
          <h1>Rancang titik sensor IoT, lalu export untuk program C++.</h1>
          <p>
            Web ini hanya bertugas sebagai pembuat dataset. Hasil export <b>sensors.csv</b> dapat langsung digunakan oleh terminal C++ untuk Kruskal MST, BFS, dan brute force gateway optimization.
          </p>
          <div className="hero-actions">
            <button className="btn" onClick={() => setActiveTab('csv')}>Lihat CSV</button>
            <button className="btn secondary" onClick={() => setShowApproxLinks((value) => !value)}>{showApproxLinks ? 'Sembunyikan' : 'Tampilkan'} garis bantu</button>
          </div>
        </div>
        <div className="quick-card hero-card">
          <h3>Ringkasan Dataset</h3>
          <div className="metric-grid">
            <div className="metric"><span>Total sensor</span><strong>{sensors.length}</strong></div>
            <div className="metric"><span>Complete edge</span><strong>{stats.completeEdges}</strong></div>
            <div className="metric"><span>Jenis sensor</span><strong>{stats.types}</strong></div>
            <div className="metric"><span>Rata-rata titik</span><strong>{stats.avgX.toFixed(1)}, {stats.avgY.toFixed(1)}</strong></div>
          </div>
        </div>
      </section>

      <section className="main-grid">
        <aside className="sidebar">
          <ControlPanel
            field={field}
            sensorCount={sensors.length}
            onFieldChange={setField}
            onGenerateRandom={(count) => {
              const generated = generateRandomSensors(count, field);
              setSensors(generated);
              setSelectedId(generated[0]?.id ?? null);
            }}
            onGenerateGrid={(rows, cols) => {
              const generated = generateGridSensors(rows, cols, field);
              setSensors(generated);
              setSelectedId(generated[0]?.id ?? null);
            }}
            onPreset={applyPreset}
            onClear={() => { setSensors([]); setSelectedId(null); }}
          />
          <SensorForm sensor={selectedSensor} field={field} onChange={updateSensor} onDelete={deleteSensor} />
          <ImportExportPanel sensors={sensors} onImport={importSensors} />
        </aside>

        <section>
          <div className="panel field-wrap">
            <div className="field-toolbar">
              <div>
                <h2>{field.fieldName}</h2>
                <p className="help">Double click untuk tambah sensor. Drag titik sensor untuk memindahkan posisi.</p>
              </div>
              <span className="badge">{field.width} x {field.height} {field.unit}</span>
            </div>
            <FieldCanvas
              sensors={sensors}
              field={field}
              selectedId={selectedId}
              showApproxLinks={showApproxLinks}
              onAddSensor={addSensor}
              onSelectSensor={setSelectedId}
              onMoveSensor={moveSensor}
            />
          </div>

          <div className="panel" style={{ marginTop: 20 }}>
            <div className="tabs">
              <button className={`tab ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}>Tabel Sensor</button>
              <button className={`tab ${activeTab === 'csv' ? 'active' : ''}`} onClick={() => setActiveTab('csv')}>Preview CSV</button>
              <button className={`tab ${activeTab === 'validation' ? 'active' : ''}`} onClick={() => setActiveTab('validation')}>Validasi</button>
            </div>
            {activeTab === 'table' && <SensorTable sensors={sensors} selectedId={selectedId} onSelect={setSelectedId} />}
            {activeTab === 'csv' && <CsvPreview sensors={sensors} />}
            {activeTab === 'validation' && <ValidationBox validation={validation} />}
          </div>
        </section>
      </section>

      <p className="footer-note">AgroMesh Generator dibuat untuk menghasilkan dataset CSV/XLSX. Algoritma MST, Kruskal, BFS, dan brute force tetap dijalankan di program C++ terminal.</p>
    </main>
  );
}
