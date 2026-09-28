const express = require('express'); // impor express
const app = express(); // membuat aplikasi express

const PORT = process.env.PORT || 3000; // port yang digunakan

// Middleware agar req.body JSON dapat dibaca
app.use(express.json());

// Data sementara area parkir
let parkingRecords = [
  {
    id: 1,
    platNomor: 'BG 1234 AA',
    jenisKendaraan: 'motor',
    waktuMasuk: '2026-09-24T08:15:00+07:00',
    waktuKeluar: null,
    biaya: 0
  },
  {
    id: 2,
    platNomor: 'BG 5678 BB',
    jenisKendaraan: 'mobil',
    waktuMasuk: '2026-09-24T09:00:00+07:00',
    waktuKeluar: null,
    biaya: 0
  },
  {
    id: 3,
    platNomor: 'BG 9012 CC',
    jenisKendaraan: 'motor',
    waktuMasuk: '2026-09-24T10:30:00+07:00',
    waktuKeluar: '2026-09-24T12:00:00+07:00',
    biaya: 5000
  }
];

let nextId = 4;

// GET /
app.get('/', (req, res) => {
  res.json({
    nama: 'M. Raihan Al Lutfi',
    npm: '0895329239603',
    topik: 'Area Parkir',
    endpoint: '/parking-records'
  });
});

// GET /parking-records
// Menampilkan seluruh data parkir
app.get('/parking-records', (req, res) => {
  res.json(parkingRecords);
});


// GET /parking-records
// Menampilkan seluruh data atau filter berdasarkan jenis kendaraan
app.get('/parking-records', (req, res) => {
  const { jenisKendaraan } = req.query;

  if (jenisKendaraan) {
    const hasil = parkingRecords.filter(
      (parking) => parking.jenisKendaraan === jenisKendaraan
    );

    return res.json(hasil);
  }

  res.json(parkingRecords);
});

// GET /parking-records/:id
// Menampilkan satu data parkir berdasarkan id
app.get('/parking-records/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const data = parkingRecords.find((parking) => parking.id === id);

  if (!data) {
    return res.status(404).json({
      status: 404,
      message: 'Data parkir tidak ditemukan',
      data: null
    });
  }

  res.json(data);
});

app.get('/parking-records/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const data = parkingRecords.find((parking) => parking.id === id);

  if (!data) {
    return res.status(404).json({
      status: 404,
      message: 'Data parkir tidak ditemukan',
      data: null
    });
  }

  res.json(data);
});

// POST /parking-records
// Menambahkan data parkir baru
app.post('/parking-records', (req, res) => {
  const {
    platNomor,
    jenisKendaraan,
    waktuMasuk,
    waktuKeluar,
    biaya
  } = req.body;

  // Validasi data wajib
  if (!platNomor || !jenisKendaraan || !waktuMasuk) {
    return res.status(400).json({
      status: 400,
      message: 'platNomor, jenisKendaraan, dan waktuMasuk wajib diisi',
      data: null
    });
  }

  // Validasi jenis kendaraan
  if (jenisKendaraan !== 'motor' && jenisKendaraan !== 'mobil') {
    return res.status(400).json({
      status: 400,
      message: 'jenisKendaraan harus motor atau mobil',
      data: null
    });
  }

  const baru = {
    id: nextId++,
    platNomor,
    jenisKendaraan,
    waktuMasuk,
    waktuKeluar: waktuKeluar ?? null,
    biaya: biaya ?? 0
  };

  parkingRecords.push(baru);

  res.status(201).json({
    status: 201,
    message: 'Data parkir berhasil ditambahkan',
    data: baru
  });
});

// PUT /parking-records/:id
// Mengubah data parkir berdasarkan id
app.put('/parking-records/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = parkingRecords.findIndex(
    (parking) => parking.id === id
  );

  // Cek apakah data ditemukan
  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: 'Data parkir tidak ditemukan',
      data: null
    });
  }

  const {
    platNomor,
    jenisKendaraan,
    waktuMasuk,
    waktuKeluar,
    biaya
  } = req.body;

  // Validasi data wajib
  if (!platNomor || !jenisKendaraan || !waktuMasuk) {
    return res.status(400).json({
      status: 400,
      message: 'platNomor, jenisKendaraan, dan waktuMasuk wajib diisi',
      data: null
    });
  }

  // Validasi jenis kendaraan
  if (jenisKendaraan !== 'motor' && jenisKendaraan !== 'mobil') {
    return res.status(400).json({
      status: 400,
      message: 'jenisKendaraan harus motor atau mobil',
      data: null
    });
  }

  // Mengganti data lama dengan data baru
  parkingRecords[index] = {
    id: id,
    platNomor,
    jenisKendaraan,
    waktuMasuk,
    waktuKeluar: waktuKeluar ?? null,
    biaya: biaya ?? 0
  };

  res.status(200).json({
    status: 200,
    message: 'Data parkir berhasil diubah',
    data: parkingRecords[index]
  });
});

// DELETE /parking-records/:id
// Menghapus data parkir berdasarkan id
app.delete('/parking-records/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = parkingRecords.findIndex(
    (parking) => parking.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      status: 404,
      message: 'Data parkir tidak ditemukan',
      data: null
    });
  }

  parkingRecords.splice(index, 1);

  res.status(200).json({
    status: 200,
    message: `Data parkir dengan id ${id} berhasil dihapus`,
    data: null
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});