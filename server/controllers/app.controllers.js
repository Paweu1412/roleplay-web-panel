const { Request, Response } = require("express");

const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

exports.checkCredentials = (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM accounts WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Błąd serwera');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Nieprawidłowy login lub hasło');
      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Błąd serwera');
        return;
      }

      if (!result) {
        res.status(401).send('Nieprawidłowy login lub hasło');
        return;
      }

      res.status(200).send('Autoryzacja udana');
    });
  });
}