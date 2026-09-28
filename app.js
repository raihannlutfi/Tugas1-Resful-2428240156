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
    npm: 'ISI_NPM_KAMU',
    topik: 'Area Parkir',
    endpoint: '/parking-records'
  });
});

// GET /parking-records
// Menampilkan seluruh data parkir
app.get('/parking-records', (req, res) => {
  res.json(parkingRecords);
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});