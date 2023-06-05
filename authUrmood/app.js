require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult} = require('express-validator');

//secret key untuk JWT
const secretKey = process.env.SECRET_KEY;

app.use(express.json());

//Middleware untuk memverifikasi token di setiap permintaan otentikasi
function authenticateToken(req, res, next) {
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({error: 'No token'});
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token not valid: ', err);
            return res.status(403).json({error: 'Token not Valid'});
        }

        req.userId = decoded.userId;
        next();
    });
}

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

app.post('/login', loginValidation, (req, res) => {
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

            //make JWT token
            const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});

            //send token as response
            return res.status(200).json({
                message: 'Login successful',
                token: token
            });
        });
    });
});

//get users data
app.get('/users/:id', authenticateToken, (req, res) => {
    const userId = req.userId;

    //take users data by userId
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Failed to retrieve user data:', err);
            return res.status(500).json({error: 'Failed to retrieve user data'});
        }

        if (result.length === 0) {
            return res.status(404).json({error: 'User data not found'});
        }

        const user = result[0];

        //send users data as response
        return res.status(200).json({
            message:'Successfully retrieve user data',
            user: user
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});