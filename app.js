const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const db = require('./connection');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`app listening in port ${port}`);
});

app.get('/', (req, res) => {
    res.send( "connect");
});


//show all question
app.get('/question', (req, res) => {
    const sql = 'SELECT * FROM tbquestions';
    db.query(sql, (error, result) => {
        if (result===0) {
            res.send({status: 'questions not found'});
        } else{
            res.send(result);
        }
    });
})

//input user's answer
app.post('/answer', (req, res) => {
    const { answer, email } = req.body;
    const sql = 'INSERT INTO tbanswer (email, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [email, ...answer], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'failed to save answer' });
        } else {
            return res.status(200).json({
            message: 'answer saved',
            });
        }
    });
});


//get all answer by email
app.get('/getanswer', (req, res) => {
    const { email } = req.query;
    const sql = 'SELECT * FROM tbanswer WHERE email LIKE ?';

    db.query(sql , [`%${email}%`], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'server error' });
        } 
        
        return res.status(200).json({
            users: results,
        });
        }
    );
})

//giving response for the indication from ml
app.post('/contact', (req, res) => {
    const indication = req.body. indication;

    //call function generateResponse for generate response by indication
    const response = generateResponse(indication);

    //send response as JSON
    res.json(response);
});

//function to generate response by indication
function generateResponse(indication) {
    let message = ' ';
    let contact = [ ];

    if (indication === 'stres ringan') {
        message = 'you are having low stress levels';
        contact = [
            {no: '6285158871220', name: 'satu persen'},
            {no: '6281393193531', name: 'dr.Permadi'},
            {no: '6285786756504', name: 'dr.Iwan'},
        ];
    }else if (indication === 'stres sedang') {
        message = 'you are having moderate stress levels';
        contact = [
            {no: '6285158871220', name: 'satu persen'},
            {no: '6281393193531', name: 'dr.Permadi'},
            {no: '6285786756504', name: 'dr.Iwan'},
        ];
    }else if (indication === 'stres berat'){
        message = 'you are having high stress levels';
        contact = [
            {no: '6285158871220', name: 'satu persen'},
            {no: '6281393193531', name: 'dr.Permadi'},
            {no: '6285786756504', name: 'dr.Iwan'},
        ];
    }else{
        //not valid indication
        message = 'Not valid indication'
    }

    return {
        status: true,
        message: message,
        contact: contact,
    };
}
