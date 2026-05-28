'use client';

import { Sensor } from '../lib/types';

type Props = {
  sensors: Sensor[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function SensorTable({ sensors, selectedId, onSelect }: Props) {
  return (
    <div className="panel">
      <div className="panel-title">
        <h3>Tabel Sensor</h3>
        <span className="badge">{sensors.length} baris</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>ID</th>
              <th>Nama</th>
              <th>Tipe</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={sensor.id} onClick={() => onSelect(sensor.id)} style={{ background: selectedId === sensor.id ? '#f0fff4' : undefined }}>
                <td>{index}</td>
                <td>{sensor.id}</td>
                <td>{sensor.name}</td>
                <td>{sensor.type}</td>
                <td>{sensor.x.toFixed(2)}</td>
                <td>{sensor.y.toFixed(2)}</td>
                <td>{sensor.z.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
