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
  let sql = ("INSERT INTO todolist (title, status, description) VALUES( $1::text, $2::int, $3::text)");
  let description = (request.query.description ? request.query.description : '');
  let params = [request.query.title, 3, description ]
  
  console.log(params)
  pool.query(sql, params, (error, result)=>{
    console.log("results")
    console.log(result)
    if (!error)
    {
      response.json({success: true})
    }
    else
    {
      response.json({success: false})

    }
  });
}

function getAllFromDB(request, response)
{
  let sql = ("SELECT * FROM todolist");

  pool.query(sql, (error, result)=>{
    if(!error)
    {
      response.json(JSON.stringify(result.rows))
    }
    else
    {
      response.json({success: false})
    }
  })
}


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.static("public/html"))
  .get('/', (req, res) => res.render("pages/index"))
  .get('/add', addToDoItem)
  .get('/read', getAllFromDB)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
