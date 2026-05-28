# AgroMesh Next.js CSV/XLSX Generator

AgroMesh Next adalah web generator untuk membuat dataset sensor IoT smart farming. Web ini **tidak menjalankan algoritma Kruskal, MST, BFS, atau brute force**. Web ini hanya menghasilkan file `sensors.csv` / `sensors.xlsx` yang kemudian dibaca oleh program C++ terminal AgroMesh.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka browser ke:

```bash
http://localhost:3000
```

## Cara Build Production

```bash
npm run build
npm start
```

## Output Utama

Web menghasilkan CSV dengan format:

```csv
id,name,type,x,y,z
0,Sensor 01,Soil Moisture,8.00,8.00,0.00
1,Sensor 02,Temperature,22.00,12.00,0.00
```

File tersebut dapat diberikan ke program C++:

```bash
./agromesh sensors.csv
```

## Struktur Folder

```text
app/              halaman utama Next.js
components/       komponen UI
lib/              helper CSV, generator, type, storage
data/             contoh dataset
public/           aset publik
docs/             dokumentasi sistem
```

## Fitur

- Canvas lahan 2D interaktif.
- Double click untuk tambah sensor.
- Drag sensor untuk memindahkan posisi.
- Edit nama, tipe, koordinat X/Y/Z.
- Generate preset sawah, greenhouse, orchard, hydroponic.
- Generate random dan grid.
- Import CSV/XLSX.
- Export CSV/XLSX/JSON.
- Validasi dataset sebelum dipakai oleh C++.
- Preview CSV langsung.
- LocalStorage agar data tidak hilang saat refresh.

## Hubungan dengan C++

Web ini berperan sebagai **data generator**. Program C++ tetap menjadi inti algoritma:

```text
Web Next.js -> sensors.csv -> C++ terminal -> Kruskal MST -> BFS -> brute force gateway
```
