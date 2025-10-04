import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    //save the new user to DB
    try {
        const insertUser = db.prepare(`INSERT INTO users(username,password) VALUES(?,?)`);
        const result = insertUser.run(username, hashedPassword);
        //I want to Add a First TODO for the user
        const defaultTodo = `Hello :) Add Your First Todo! `;
        const insertTodo = db.prepare(`INSERT INTO todos(user_id,task) VALUES(?,?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo);
        //Create a Token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    //save the new user to DB
    try {

        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
        const user = getUser.get(username);
        //validate User
        if (!user)
            return res.status(404).send({ message: 'User not Found' });
        //Validate Password
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid)
            return res.status(401).send({ message: "Password is Incorrect" });
        //Create a Token
        const token = jwt.sign({ id: user.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

export default router;