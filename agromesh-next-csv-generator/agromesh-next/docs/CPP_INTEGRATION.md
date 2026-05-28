# Integrasi dengan Program C++ AgroMesh

## Posisi Web

Web ini hanya membuat data input. Algoritma utama tetap di C++.

```text
Next.js Generator
    ↓ export sensors.csv
C++ Terminal Program
    ↓ load CSV
Kruskal MST
    ↓
BFS Hop Analysis
    ↓
Brute Force Gateway Optimization
```

## Command yang Disarankan

Linux/macOS:

```bash
g++ -std=c++17 agromesh.cpp -o agromesh
./agromesh sensors.csv
```

Windows MinGW:

```bash
g++ -std=c++17 agromesh.cpp -o agromesh.exe
agromesh.exe sensors.csv
```

## Kontrak Data

C++ harus membaca kolom:

```text
id, name, type, x, y, z
```

C++ sebaiknya melakukan validasi:

- file bisa dibuka
- jumlah sensor minimal 2
- setiap ID unik
- name dan type tidak kosong
- x, y, z valid angka

## Output C++ yang Disarankan

```text
mst_edges.csv
gateway_result.csv
hop_distance.csv
```

Dengan demikian, output dari C++ dapat diunggah kembali ke web di masa depan jika ingin menambahkan fitur visualisasi hasil MST.
