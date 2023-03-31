import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

import "./Login.scss";

const getGlobalStyle = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
};

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
