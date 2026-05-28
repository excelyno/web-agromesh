# Format CSV AgroMesh

Program C++ AgroMesh membutuhkan CSV dengan header berikut:

```csv
id,name,type,x,y,z
```

## Kolom

| Kolom | Tipe | Wajib | Keterangan |
|---|---:|---:|---|
| id | integer | Ya | ID sensor, harus unik. |
| name | string | Ya | Nama sensor. |
| type | string | Ya | Jenis sensor. |
| x | number | Ya | Koordinat horizontal. |
| y | number | Ya | Koordinat vertikal. |
| z | number | Ya | Elevasi/kedalaman. Untuk simulasi 2D, isi `0`. |

## Contoh

```csv
id,name,type,x,y,z
0,Sensor 01,Soil Moisture,8.00,8.00,0.00
1,Sensor 02,Temperature,22.00,12.00,0.00
2,Sensor 03,Humidity,38.00,10.00,0.00
```

## Kenapa Ada Z?

Walaupun simulasi awal dapat dianggap 2D, kolom `z` tetap disiapkan agar program bisa dikembangkan ke lahan berkontur atau greenhouse bertingkat.

## Catatan ID dan Index

CSV menyimpan `id`. Program C++ boleh menggunakan urutan baris sebagai index internal. Saat menampilkan output, sebaiknya tampilkan dua-duanya:

- index internal
- id sensor dari CSV

Ini menghindari kebingungan jika ID tidak berurutan.
