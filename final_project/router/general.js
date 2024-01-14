const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log(typeof users);
    users = Object.values(users);

    if(!username) {
        res.send("Please enter a username!");
    }
    if(!password) {
        res.send("Please enter a password!");
    }

    let filtered_users = users.filter((user) => user.username === username);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];

        if(password) {
            filtered_user.password = password
        }

        users.push(filtered_user);
        res.send(`User with this username already exists. The password has been updated.`);
    }
    else {
        let new_user = [username, password];
        users.push(new_user);
        res.send(`New user successfully added.`);
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {  
  return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let books_array = Object.values(books);
    for(i=0; i<books_array.length; i++) {
        let books_item = books_array[i];
        if((books_item.isbn) == isbn) {
            return res.send(books_item);
        }
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let books_array = Object.values(books);
    let books_items = new Array();
    for(i=0; i<books_array.length; i++) {
        let books_item = books_array[i];
        if((books_item.author) == author) {
            books_items.push(books_item);
        }
    }
    return res.send(books_items);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let books_array = Object.values(books);
    for(i=0; i<books_array.length; i++) {
        let books_item = books_array[i];
        if((books_item.title) == title) {
            return res.send(books_item);
        }
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let books_array = Object.values(books);
    let book_reviews = new Array();
    for(i=0; i<books_array.length; i++) {
        let books_item = books_array[i];
        if((books_item.isbn) == isbn) {
            console.log(books_item.reviews);
            book_reviews.push(Object.values(books_item.reviews));
        }
    }
    return res.send(book_reviews);
});

module.exports.general = public_users;
