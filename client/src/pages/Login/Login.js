import { TextField, Button } from "@mui/material";

import "./Login.scss";

const getGlobalStyle = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
};

const Login = () => {
  return (
    <div className="container">
      <div className="window">
        <div className="window__title">
          <h1>Panel logowania</h1>
        </div>

        <div className="window__body__form">
          <TextField
            id="outlined-basic"
            label="Adres e-mail"
            variant="outlined"
            inputProps={{
              style: {
                color: getGlobalStyle("--ui-text"),
                fontFamily: "ui-regular",
              },
            }}
            style={{
              width: "70%",
            }}
          />

          <TextField
            id="outlined-basic"
            label="Hasło"
            variant="outlined"
            inputProps={{
              style: {
                color: "#9DA4AE",
                fontFamily: "ui-regular",
              },
            }}
            style={{
              width: "70%",
              marginTop: "30px",
            }}
          />

          <div className="window__body__form__forgot-button">
            <a href="127.0.0.1">Zapomniałem hasła</a>
          </div>

          <Button
            variant="contained"
            style={{
              width: "70%",
              marginTop: "50px",
              backgroundColor: getGlobalStyle("--theme"),
              fontFamily: "ui-bold",
              color: getGlobalStyle("--themed-text"),
            }}
          >
            Zaloguj
          </Button>

          <Button
            variant="contained"
            style={{
              width: "70%",
              marginTop: "20px",
              backgroundColor: getGlobalStyle("--theme"),
              fontFamily: "ui-bold",
              color: getGlobalStyle("--themed-text"),
            }}
          >
            Zarejestruj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
