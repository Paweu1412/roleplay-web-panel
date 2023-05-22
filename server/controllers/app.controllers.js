const { Request, Response } = require("express");

const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

let currentKeys = [];

exports.checkSession = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  
  const queryKey = req.query.key;

  let sessionFound = false;

  for (const [username, [key, timestamp]] of Object.entries(currentKeys)) {
    if (key === queryKey) {
      sessionFound = true;
      break;
    }
  }

  res.json({
    found: sessionFound
  });
}

exports.checkCredentials = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const { username, password } = req.query;

  const generateKey = (username) => {
    const key = uuidv4();

    currentKeys[username] = [key, Date.now()];

    // setTimeout(() => {
    //   delete currentKeys[username];
    // }, 10000);

    return key;
  }

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

      if (currentKeys[username]) {
        res.json({
          status: 6,
          message: 'Autoryzacja udana',
          key: currentKeys[username][0],
        });

        return;
      }

      res.json({
        status: 5,
        message: 'Autoryzacja udana',
        key: generateKey(username),
      });
    });
  });
}