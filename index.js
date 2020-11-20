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
  let description = (request.query.description ? request.query.description : '');
  var params = [request.query.title, description ]
  
  console.log(params)
  pool.query(sql, params, (error, result)=>{
    console.log( JSON.stringify(result.rows))
    if (!error)
    {
      response.render(JSON, {success: true})
    }
    else
    {
      response.render(JSON, {success: false})

    }
  });



}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.static("public/html"))
  .get('/', (req, res) => res.render("pages/index"))
  .get('/add', addToDoItem)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
