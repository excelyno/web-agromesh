# Panduan Pengguna

## 1. Membuat Dataset Manual

1. Buka halaman web.
2. Double click pada lahan untuk membuat sensor baru.
3. Klik sensor untuk memilihnya.
4. Edit nama, tipe, X, Y, dan Z pada panel editor.
5. Klik Download CSV.

## 2. Membuat Dataset Otomatis

Gunakan tombol preset:

- Preset Sawah 25
- Greenhouse 24
- Orchard 25
- Hydroponic 24

Atau gunakan tombol:

- Random 25
- Random 50
- Grid 5x5

## 3. Import Dataset

Gunakan input file pada panel Import/Export. File yang didukung:

- `.csv`
- `.xlsx`
- `.xls`

Untuk CSV, header wajib:

```csv
id,name,type,x,y,z
```

## 4. Export Dataset

Tersedia tiga format:

- CSV: untuk program C++.
- XLSX: untuk dibuka di Excel.
- JSON: untuk backup atau integrasi web lain.

## 5. Menggunakan Dataset di C++

Setelah download `sensors.csv`, jalankan:

```bash
./agromesh sensors.csv
```

Program C++ akan membaca titik sensor, membangun complete graph, menjalankan Kruskal MST, BFS, dan brute force gateway.
