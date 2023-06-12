const express = require('express');
const app = express();

// Endpoint untuk mendapatkan daftar artikel
app.get('/article', (req, res) => {
  const articles = [
    {
      link: 'https://www.halodoc.com/kesehatan/kesehatan-mental',
      title: 'Kesehatan Mental',
      body: 'Kesehatan mental dipengaruhi oleh peristiwa dalam kehidupan yang meninggalkan dampak yang besar pada kepribadian dan perilaku seseorang. Peristiwa-peristiwa tersebut dapat berupa kekerasan dalam rumah tangga, pelecehan anak, atau stres berat jangka panjang.'
    },
    {
      link: 'https://www.cnnindonesia.com/gaya-hidup/20210805110641-255-676710/5-rekomendasi-konsultasi-online-dengan-psikolog-gratis',
      title: '5 Rekomendasi Konsultasi Online dengan Psikolog Gratis',
      body: 'Tak hanya kesehatan fisik, kesehatan mental juga penting di masa pandemi Covid-19 ini. Salah satu cara menjaga kesehatan mental adalah dengan bantuan profesional seperti psikolog, konselor, hingga psikiater. Beberapa layanan psikologi menyediakan konsultasi online secara gratis. Anda bisa memanfaatkan layanan ini untuk menjaga dan meningkatkan kesehatan mental.Berikut rekomendasi konsultasi online dengan psikologi gratis:'
    },
    {
      link: 'https://www.halodoc.com/artikel/9-cara-sederhana-menjaga-kesehatan-mental',
      title: '9 Cara Sederhana Menjaga Kesehatan Mental',
      body: 'Beberapa langkah sederhana bisa diterapkan untuk meningkatkan kualitas kesehatan mental. Dengan melakukan perubahan ini, maka dapat dipastikan hal ini memengaruhi semua aspek kehidupan. Dengan menjaga kesehatan mental, maka kamu merasakan beberapa efeknya seperti suasana hati yang membaik, membangun ketahanan, dan membantu menikmati hidup secara keseluruhan.'
    },
    {
      link: 'https://iik.ac.id/blog/ini-gejala-depresi-yang-wajib-kamu-tahu/',
      title: 'Psikologi: Ini Gejala Depresi Yang Wajib Kamu Tahu!',
      body: 'Depresi dapat dikatakan membahayakan jika tidak ditangani secepatnya dan secara tepat. Bahkan, orang depresi akut dapat berujung fatal, seperti kasus bunuh diri. Maka dari itu, penting mengetahui gejala-gejala depresi sejak awal sehingga dapat dilakukan langkah pengobatan secepatnya.'
    },
    {
      link: 'https://www.halodoc.com/kesehatan/kesehatan-mental',
      title: 'Kesehatan Mental',
      body: 'Kesehatan mental dipengaruhi oleh peristiwa dalam kehidupan yang meninggalkan dampak yang besar pada kepribadian dan perilaku seseorang. Peristiwa-peristiwa tersebut dapat berupa kekerasan dalam rumah tangga, pelecehan anak, atau stres berat jangka panjang.'
    }
  ];

  res.json(articles);
});

// Menjalankan server API pada port 3000
app.listen(3000, () => {
  console.log('API server is running on port 3000');
});
