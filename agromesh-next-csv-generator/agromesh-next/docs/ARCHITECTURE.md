# Arsitektur AgroMesh Generator

## Tujuan

Aplikasi ini dibuat untuk memisahkan dua tanggung jawab:

1. Web Next.js sebagai pembuat dataset sensor.
2. C++ terminal sebagai engine algoritma MST, Kruskal, BFS, dan brute force.

Dengan pemisahan ini, presentasi algoritma C++ tetap jelas, sementara data input bisa dibuat secara visual.

## Alur Sistem

```text
User membuka web
    ↓
User membuat atau mengimpor titik sensor
    ↓
Web memvalidasi data
    ↓
User export sensors.csv
    ↓
Program C++ membaca sensors.csv
    ↓
C++ menjalankan Kruskal MST, BFS, dan brute force
```

## Modul Frontend

### app/page.tsx

Halaman utama. Mengatur state sensor, konfigurasi lahan, tab preview, import/export, dan canvas.

### components/FieldCanvas.tsx

Komponen visual untuk bidang lahan. Tugasnya:

- Menampilkan sensor sebagai titik.
- Menambah sensor dengan double click.
- Memindahkan sensor dengan drag.
- Menampilkan garis bantu nearest-neighbor sebagai preview visual non-algoritmik.

Catatan: garis bantu bukan MST final. MST final tetap dihitung C++.

### components/ControlPanel.tsx

Panel konfigurasi ukuran lahan dan generator dataset.

### components/SensorForm.tsx

Editor sensor terpilih.

### components/ImportExportPanel.tsx

Import/export CSV, XLSX, dan JSON.

### components/SensorTable.tsx

Tabel seluruh sensor.

### components/CsvPreview.tsx

Preview CSV yang akan dipakai C++.

### components/ValidationBox.tsx

Menampilkan error dan warning dataset.

## Modul Library

### lib/csv.ts

Berisi parser CSV sederhana, converter sensor ke CSV, validator, dan helper download file.

### lib/generator.ts

Berisi generator random, grid, dan preset pertanian.

### lib/sensorTypes.ts

Berisi daftar tipe sensor dan warna tampilannya.

### lib/storage.ts

Menyimpan data ke localStorage.

### lib/types.ts

Tipe TypeScript utama.
