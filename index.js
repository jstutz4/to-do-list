const { render } = require('ejs');
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
  let params = [request.query.title, request.query.status, request.query.description ]
  
  pool.query(sql, params, (error, result)=>{
    
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
      console.log(JSON.stringify(result.rows))
      response.json(result.rows)
      // response.render('partials/todolist_items', {'data': JSON.stringify(result.rows)})
    }
    else
    {
      response.json({success: false})
    }
  });
}

function removeTask(request, response)
{
  var sql = ("DELETE FROM todolist WHERE itemID=$1::int");
  var params = [request.query.task]

  pool.query(sql, params, (error, result)=>{
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

function updateStatus(request, response)
{
  var sql = ("UPDATE todolist set status = $1::int WHERE itemID=$2::int");
  var params = [request.query.status, request.query.task]

  pool.query(sql, params, (error, results)=>{
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

function getfilter(request, response)
{
  let sql = ''
  if (request.query.filter > 0)
  {
    sql = ("SELECT * FROM todolist WHERE status = $1::int");
    params = [request.query.filter]

    pool.query(sql,params, (error, result)=>{
      if(!error)
      {
        console.log(JSON.stringify(result.rows))
        response.json(result.rows)
        // response.render('partials/todolist_items', {'data': JSON.stringify(result.rows)})
      }
      else
      {
        response.json({success: false})
      }
      });
    }
    else
    {
      sql = ("SELECT * FROM todolist");
      pool.query(sql, (error, result)=>{
        if(!error)
        {
          console.log(JSON.stringify(result.rows))
          response.json(result.rows)
          // response.render('partials/todolist_items', {'data': JSON.stringify(result.rows)})
        }
        else
        {
          response.json({success: false})
        }
      });
    }
  }
  
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.static("public/html"))
  .get('/', (req, res) => res.render("pages/index"))
  .get('/add', addToDoItem)
  .get('/read', getAllFromDB)
  .get('/delete', removeTask)
  .get('/updateStatus', updateStatus)
  .get('/statusfilter', getfilter)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
