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
app.get('/api/getSchedules', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
