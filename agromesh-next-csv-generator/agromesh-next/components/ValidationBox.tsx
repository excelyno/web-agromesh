'use client';

import { ValidationResult } from '../lib/types';

type Props = { validation: ValidationResult };

export default function ValidationBox({ validation }: Props) {
  if (validation.errors.length === 0 && validation.warnings.length === 0) {
    return <div className="success">Dataset valid. CSV siap dipakai oleh program C++ AgroMesh.</div>;
  }

  return (
    <div>
      {validation.errors.length > 0 && (
        <div className="error">
          <b>Error:</b>
          <ul>
            {validation.errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      )}
      {validation.warnings.length > 0 && (
        <div className="warning">
          <b>Warning:</b>
          <ul>
            {validation.warnings.map((warning) => <li key={warning}>{warning}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
