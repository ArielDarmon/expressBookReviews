const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", async (req,res) => {
    const username = req.query.username;
    const password = req.query.password;

    users = Object.values(users);

    if(!username) {
        res.send("Please enter a username!");
    }
    if(!password) {
        res.send("Please enter a password!");
    }
    try {
        const user = await users.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed. No user found.' });
        }
        const passwordMatch = await users.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed. Password error.' });
        }
        const token = jwt.sign({ userId: user._id }, 'my-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
