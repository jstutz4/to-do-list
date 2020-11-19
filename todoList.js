const express = require("express");
const path = require("path");
const url = require("url");
const fs = require("fs");
const {
    Pool
} = require("pg");
const PORT = process.env.PORT || 8100;
const app = express();
'use strict';
const request = require('request');
var stream;
const connnectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connnectionString
});


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static("frontend"));
app.get('/', (req, res) => res.render("html/home"))
