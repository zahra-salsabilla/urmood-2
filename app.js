require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database.js');
const mysql = require('mysql');
const db = require('./connection');

app.use(bodyParser.json());
app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`app listening in port ${port}`);
});


app.get('/', (req, res) => {
    res.send( "connect");
});

// const pool = mysql.createConnection({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
// });

app.get('/alltips', (req, res) => {
    const sql = "SELECT * FROM tipstips order by rand()";
    db.query(sql, [req.params.tipstips], (error, result) => {
       if (result===0) {
        res.send({status: 'not found'});
       } else{
        res.send(result);
       }
    });
});

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
  
