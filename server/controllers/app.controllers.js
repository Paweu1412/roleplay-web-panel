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
  res.set('Access-Control-Allow-Origin', '*');

  const { username, password } = req.query;

  pool.query('SELECT * FROM accounts WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error(error);

      res.json({
        status: 1,
        message: 'Błąd serwera',
      });

      return;
    }

    if (results.length === 0) {
      res.json({
        status: 2,
        message: 'Nieprawidłowy login',
      });

      return;
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        res.json({
          status: 3,
          message: 'Błąd serwera',
        });
        
        return;
      }

      if (!result) {
        res.json({
          status: 4,
          message: 'Nieprawidłowe hasło',
        });

        return;
      }

      res.json({
        status: 5,
        message: 'Autoryzacja udana',
      });
    });
  });
}