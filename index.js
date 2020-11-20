const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


function addToDoItem(request, response)
{
  var sql = ("INSERT INTO todolist (title, status) VALUES( $1::text, $2::int)");

  var params = [request.query]
  console.log("query start")
  console.log(request.query)
  console.log(url.parse(req.url,true).query)
  console.log("query end")

  

}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.static("public/html"))
  .get('/', (req, res) => res.render("pages/index"))
  .get('/add', addToDoItem)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
