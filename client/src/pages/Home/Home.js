import "./Home.scss";

import { ButtonBase } from "@mui/material";
import { Spinner } from "../../components/Spinner/Spinner";
import { useState } from "react";
import axios from "axios";

// import { getGlobalStyle } from "../../utils/index";
import PersonIcon from '@mui/icons-material/Person';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  let [showSpinner, setShowSpinner] = useState(true);
  let [accountsNumber, setAccountsNumber] = useState(0);
  let [charactersNumber, setCharactersNumber] = useState(0);
  let [hoursNumber, setHoursNumber] = useState(0);
  let [vehiclesNumber, setVehiclesNumber] = useState(0);

  const checkSession = async (key) => {
    const response = await axios.get("http://127.0.0.1:5000/api/session", {
      params: {
        key: key,
      },
    });

    setShowSpinner(!response.data.found);
    
    if (response.data.found === false) {
      return window.location.href = "/";
    }
  }

  const key = params.key;

  checkSession(key);

  const checkInformations = async () => {
    const response = await axios.get("http://127.0.0.1:5000/api/informations", {});

    setAccountsNumber(response.data.accountsNumber);
    setCharactersNumber(response.data.charactersNumber);
    setHoursNumber(response.data.hoursNumber);
    setVehiclesNumber(response.data.vehiclesNumber);
  }

  checkInformations();

  return (
    <div className="home">
      <Spinner open={showSpinner} />
      
      <div className="sidebar">
        <div className="sidebar__upper">
          <div className="basic-info">
            <h1>Cześć, Paweł!</h1>
            <p>To jest testowy panel</p>
          </div>
        </div>

        <div className="sidebar__main">
          <ul className="buttons">
            <li>
              <ButtonBase className="button" onClick={() => {}}>
                <PersonRoundedIcon className="icon" />
                <span className="description">Konto</span>
              </ButtonBase>
            </li>
          </ul>
        </div>
      </div>

      <div className="main">
        <h1>Czy wiesz, że na serwerze jest już w sumie...</h1>

        <div className="container">
          <div className="item">
            <PersonIcon className="icon" />

            <p>{accountsNumber}</p>
            <span>KONT</span>
          </div>

          <div className="item">
            <AccessibilityIcon className="icon" />

            <p>{charactersNumber}</p>
            <span>POSTACI</span>
          </div>

          <div className="item">
            <AccessTimeIcon className="icon" />

            <p>{(hoursNumber / 100).toFixed()}</p>
            <span>PRZEGRANYCH<br></br>GODZIN</span>
          </div>

          <div className="item">
            <DirectionsCarIcon className="icon" />

            <p>{vehiclesNumber}</p>
            <span>POJAZDÓW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
