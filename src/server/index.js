const express = require('express');
const os = require('os');
const mysql = require('mysql');

//MySQL Setup
sql = mysql.createConncetion({
  host: '',
  user: '',
  password: '',
  dtabase: ''
});
//sql.connect();

const app = express();

app.use(express.static('dist'));

//Client Side Post
app.get('/api/getSchedules', (req, res) => {
  //TODO: Finish routing
  res.send({ username: os.userInfo().username });
});

//Redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
