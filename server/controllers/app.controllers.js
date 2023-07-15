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

exports.checkInformations = (req, res) => {
  let accountsNumber = 0;
  let charactersNumber = 0;
  let hoursNumber = 0;
  let vehiclesNumber = 0;

  res.set('Access-Control-Allow-Origin', '*');

  pool.query(`SELECT (SELECT COUNT(*) FROM accounts) AS accountsNumber, (SELECT COUNT(*) FROM characters) AS charactersNumber, (SELECT SUM(playtime) FROM characters) / 60 AS hoursNumber, (SELECT COUNT(*) FROM vehicles) AS vehiclesNumber`, (error, results) => {
    if (error) {
      console.error(error);
      return;
    }

    const accountsNumber = results[0].accountsNumber;
    const charactersNumber = results[0].charactersNumber;
    const hoursNumber = results[0].hoursNumber;
    const vehiclesNumber = results[0].vehiclesNumber;

    res.json({
      accountsNumber: accountsNumber,
      charactersNumber: charactersNumber,
      hoursNumber: hoursNumber,
      vehiclesNumber: vehiclesNumber,
    });

    return;
  });
}

exports.checkHome = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  let accountName = null;
  let accountUID = 0;

  const queryKey = req.query.key;

  for (const [username, [key, timestamp]] of Object.entries(currentKeys)) {
    if (key === queryKey) {
      accountName = username;
      break;
    }
  }

  if (!accountName) {
    res.json({
      accountName: null,
      accountUID: 0
    });

    return;
  }

  pool.query(`SELECT UID FROM accounts WHERE username = ?`, [accountName], (error, results) => {
    if (error) {
      console.error(error);
      return;
    }

    accountUID = results[0].UID || 0;

    res.json({
      accountName: accountName,
      accountUID: accountUID
    });
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