const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .use(express.static("html"))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('html/home'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
