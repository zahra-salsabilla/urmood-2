require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
//const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult} = require('express-validator');
//const secretKey = process.env.SECRET_KEY;

app.use(express.json());
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`app listening in port ${port}`);
});

app.get('/', (req, res) => {
    res.send( "connect");
});

//Validation Input register endpoint
const registerValidation = [
    body('fullname', 'Full name required').notEmpty(),
    body('email', 'Email required').notEmpty().matches(/.+\@.+\..+/).withMessage('Invalid email, try using @'),
    body('password', 'Password required').notEmpty().isLength({min: 6}).withMessage('Password at least 6 characters'),
];

//Register 
app.post('/register', registerValidation, (req, res) => {
    const {fullname, email, password} = req.body;

    //validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    //encryption password with bcrypt
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Failed to encrypt the password:', err);
            return res.status(500).json({ error: 'Registration failed'});
        }

        const sql = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
        db.query(sql, [fullname, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Registration failed: ', err);
                return res.status(500).json({error: 'Registration failed'});
            }
            return res.status(200).json({message: 'Registration successful'});
        });
    });

});

//Validation Input login endpoint
const loginValidation = [
    body('email', 'Fill with registered email').notEmpty().matches(/.+\@.+\..+/).withMessage('Invalid email, try using @'),
    body('password', 'Password required').notEmpty().isLength({min: 8}).withMessage('Password at least 6 characters'),
];

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    //validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Login failed: ', err);
            return res.status(500).json({error: 'Login failed'});
        }

        if (result.length === 0) {
            return res.status(401).json({error: 'Incorrect email or password'});
        }

        const user = result[0];
        //password hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Login failed: ', err);
                return res.status(500).json({error:'Login failed'});
            }

            if (!isMatch) {
                return res.status(401).json({error: 'Incorrect email or password'});
            }

            //send token as response
            return res.status(200).json({
                message: 'Login successful',
                //token: token
            });
        });
    });
});

//logout user
app.post('/logout', (req, res) => {
    const {Idusers} = req.body.Idusers;
    const sql = `DELETE FROM users WHERE Idusers = ?`;

    db.query(sql, [Idusers], (err, result) => {
        if (err){
            return res.status(500).json({error:'Logout failed'});
        } 

        return res.status(200).json({
            message: 'Logout successful',
        });
        
    })
});

//get users data by name
app.get('/usersdata', (req, res) => {
    const { fullname } = req.query;
  
    db.query('SELECT * FROM users WHERE fullname LIKE ?',
       [`%${fullname}%`], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'server error' });
        } else {
          res.json({ users: results });
        }
      }
    );
  });
