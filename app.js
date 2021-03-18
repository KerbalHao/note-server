/*
 * @Date: 2021-03-17 15:21:33
 * @LastEditors: KerbalHao
 * @FilePath: \my-server\app.js
 */
let express = require("express");
let path = require("path");
let cookieParse = require("cookie-parser");
let bodyParser = require("body-parser");
let session = require("express-session");
let morgan = require("morgan");

let app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "hello world", cookie: { maxAge: 6000000 } }));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header("Access-Control-Allow-Credentials",true)
  if (req.method === "OPTIONS") {
    res.send(200)
  }else {
    next()
  }
}

app.use(allowCrossDomain)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(3100, () => {
  console.log(`Example app listening at http://localhost:${3100}`)
})

// module.exports =  app