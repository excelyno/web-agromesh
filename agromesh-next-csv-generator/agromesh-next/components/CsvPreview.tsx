'use client';

import { Sensor } from '../lib/types';
import { sensorsToCsv } from '../lib/csv';

type Props = { sensors: Sensor[] };

export default function CsvPreview({ sensors }: Props) {
  return (
    <div className="panel">
      <div className="panel-title"><h3>Preview CSV</h3><span className="badge">C++ ready</span></div>
      <pre className="preview-code">{sensorsToCsv(sensors)}</pre>
    </div>
  );
}
