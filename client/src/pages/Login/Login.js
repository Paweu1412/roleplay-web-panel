import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

import "./Login.scss";

import { getGlobalStyle } from "../../utils/index";
import { AlertInfo } from "../../components/Alert/Alert";
import axios from "axios";

const SubmitLogin = async () => {
  const responseStatuses = {
    1: {message: "Błąd serwera", state: "error"},
    2: {message: "Nieprawidłowy login", state: "error"},
    3: {message: "Błąd serwera", state: "error"},
    4: {message: "Nieprawidłowe hasło", state: "error"},
    5: {message: "Zalogowano pomyślnie", state: "success"},
  }

  const response = await axios.get("http://127.0.0.1:5000/api/credentials", {
    params: {
      username: "Pawel",
      password: "vibe2"
    }
  });
}

const Login = () => {
  return (
    <div className="container">
      <div className="box">
        <div className="box__header">
          <h1>Zaloguj się</h1>
        </div>

        <div className="box__form">
          <TextField
            required
            label="Nazwa użytkownika"
            variant="outlined"
            style={{
              width: "100%",
              marginTop: "25px"
            }}
            inputProps={{
              style: {
                color: getGlobalStyle("--ui-text"),
              }
            }}
          />

          <TextField
            required
            type="password"
            label="Hasło"
            variant="outlined"
            style={{
              width: "100%",
              marginTop: "25px",
            }}
            inputProps={{
              style: {
                color: getGlobalStyle("--ui-text"),
              }
            }}
          />

          <FormControlLabel
            control={
              <Checkbox 
                value="remember"
                sx={{
                  color: getGlobalStyle("--ui-text"),

                  '&.Mui-checked': {
                    color: getGlobalStyle("--theme"),
                  }
                }}
              />
            }
            label="Zapamiętaj mnie"
            style={{
              marginTop: "15px",
              color: getGlobalStyle("--ui-text"),
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
              marginTop: "15px",
              marginBottom: "15px",
              color: getGlobalStyle("--ui")
            }}
            // onClick={} // TODO: Check credentials and setShow the alert component if needed
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
