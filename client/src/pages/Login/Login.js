import "./Login.scss";

import { getGlobalStyle } from "../../utils/index";
import { AlertInfo } from "../../components/Alert/Alert";
import axios from "axios";
import { useState } from "react";

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

const Login = () => {
  const [alertInfo, setAlertInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SubmitLogin = async () => {
    const responseStatuses = {
      1: { message: "Błąd serwera", state: "error" },
      2: { message: "Nieprawidłowy login", state: "error" },
      3: { message: "Błąd serwera", state: "error" },
      4: { message: "Nieprawidłowe hasło", state: "error" },
      5: { message: "Zalogowano pomyślnie", state: "success" },
      6: { message: "Przywrócono sesję", state: "success" },
    };

    if (username === "" || password === "") {
      setAlertInfo(<AlertInfo state="warning" info="Wypełnij wszystkie pola" />);

      setTimeout(() => {
        setAlertInfo(null);
      }, 5 * 1000);
      
      return;
    }

    const response = await axios.get("http://127.0.0.1:5000/api/credentials", {
        params: {
          username: username,
          password: password,
        },
      }
    );

    const info = responseStatuses[response.data.status];

    if (info.state === "success") {
      const key = response.data.key;

      return window.location.href = `/dashboard?key=${key}`;
    }

    setAlertInfo(<AlertInfo state={info.state} info={info.message} />);

    setTimeout(() => {
      setAlertInfo(null);
    }, 5 * 1000);
  };

  return (
    <div className="login">
      {alertInfo && <div className="container__alert">{alertInfo}</div>}

      <div className="box">
        <div className="box__header">
          <h1>Zaloguj się</h1>
        </div>

        <div className="box__form">
          <TextField
            required
            label="Nazwa użytkownika"
            variant="outlined"
            onPaste={(e) => {setUsername(e.target.value)}}
            onChange={(e) => {setUsername(e.target.value)}}
            style={{
              width: "100%",
              marginTop: "25px",
            }}
            inputProps={{
              style: {
                color: getGlobalStyle("--ui-text"),
              },
            }}
          />

          <TextField
            required
            type="password"
            label="Hasło"
            variant="outlined"
            onPaste={(e) => {setPassword(e.target.value)}}
            onChange={(e) => {setPassword(e.target.value)}}
            style={{
              width: "100%",
              marginTop: "25px",
            }}
            inputProps={{
              style: {
                color: getGlobalStyle("--ui-text"),
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: getGlobalStyle("--theme"),
              fontFamily: "ui-regular",
              fontWeight: "600",
              marginTop: "40px",
              marginBottom: "15px",
              color: getGlobalStyle("--ui")
            }}
            onClick={SubmitLogin}
          >
            Zaloguj się
          </Button>

          <div className="box__form__links">
            <Link href="#" 
              variant="body2" 
              style={{ 
                fontFamily: "ui-regular",
                fontWeight: "600",
                color: getGlobalStyle("--ui-text"),
                textDecoration: "none"
              }}
            >
              Zapomniałeś hasła?
            </Link>

            <Link href="#" 
              variant="body2" 
              style={{ 
                fontFamily: "ui-regular",
                fontWeight: "600",
                color: getGlobalStyle("--ui-text"),
                textDecoration: "none"
              }}
            >
              Nie masz konta?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
