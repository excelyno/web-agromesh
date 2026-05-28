'use client';

import { useMemo, useState } from 'react';
import { FieldConfig, Sensor } from '../lib/types';
import { getSensorTypeColor, getSensorTypeRadius } from '../lib/sensorTypes';

type Props = {
  sensors: Sensor[];
  field: FieldConfig;
  selectedId: number | null;
  showApproxLinks: boolean;
  onAddSensor: (x: number, y: number) => void;
  onSelectSensor: (id: number) => void;
  onMoveSensor: (id: number, x: number, y: number) => void;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function FieldCanvas({ sensors, field, selectedId, showApproxLinks, onAddSensor, onSelectSensor, onMoveSensor }: Props) {
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);

  const approximateLinks = useMemo(() => {
    if (!showApproxLinks || sensors.length < 2) return [];
    return sensors.slice(1).map((sensor) => {
      let best = sensors[0];
      let bestDistance = Number.POSITIVE_INFINITY;
      sensors.forEach((other) => {
        if (other.id === sensor.id) return;
        const dx = sensor.x - other.x;
        const dy = sensor.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = other;
        }
      });
      return { from: sensor, to: best };
    });
  }, [sensors, showApproxLinks]);

  function eventToCoordinate(event: React.MouseEvent<HTMLDivElement>): { x: number; y: number } {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = clamp(event.clientX - rect.left, 0, rect.width);
    const py = clamp(event.clientY - rect.top, 0, rect.height);
    return {
      x: Number(((px / rect.width) * field.width).toFixed(2)),
      y: Number(((py / rect.height) * field.height).toFixed(2))
    };
  }

  function toPercentX(x: number): string {
    return `${(x / field.width) * 100}%`;
  }

  function toPercentY(y: number): string {
    return `${(y / field.height) * 100}%`;
  }

  return (
    <div
      className="field-stage"
      onMouseMove={(event) => {
        const coordinate = eventToCoordinate(event);
        setHover(coordinate);
        if (dragId !== null) onMoveSensor(dragId, coordinate.x, coordinate.y);
      }}
      onMouseLeave={() => setHover(null)}
      onMouseUp={() => setDragId(null)}
      onDoubleClick={(event) => {
        const coordinate = eventToCoordinate(event);
        onAddSensor(coordinate.x, coordinate.y);
      }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {approximateLinks.map((link, index) => (
          <line
            key={`${link.from.id}-${link.to.id}-${index}`}
            x1={(link.from.x / field.width) * 100}
            y1={(link.from.y / field.height) * 100}
            x2={(link.to.x / field.width) * 100}
            y2={(link.to.y / field.height) * 100}
            stroke="rgba(47, 133, 90, 0.28)"
            strokeWidth="0.28"
            strokeDasharray="1 1"
          />
        ))}
      </svg>

      {sensors.map((sensor) => {
        const color = getSensorTypeColor(sensor.type);
        const radius = getSensorTypeRadius(sensor.type);
        return (
          <div key={sensor.id}>
            <button
              className={`sensor-dot ${selectedId === sensor.id ? 'selected' : ''}`}
              style={{
                left: toPercentX(sensor.x),
                top: toPercentY(sensor.y),
                width: radius * 2,
                height: radius * 2,
                background: color
              }}
              title={`${sensor.name} (${sensor.x}, ${sensor.y}, ${sensor.z})`}
              onMouseDown={(event) => {
                event.stopPropagation();
                setDragId(sensor.id);
                onSelectSensor(sensor.id);
              }}
              onClick={(event) => {
                event.stopPropagation();
                onSelectSensor(sensor.id);
              }}
            >
              {sensor.id}
            </button>
            <div
              className="sensor-label"
              style={{ left: toPercentX(sensor.x), top: toPercentY(sensor.y) }}
            >
              {sensor.name}
            </div>
          </div>
        );
      })}

      <div className="coord-pill">
        {hover ? `x=${hover.x.toFixed(2)}, y=${hover.y.toFixed(2)} ${field.unit}` : 'Double click untuk tambah sensor'}
      </div>
    </div>
  );
}
