import "./Home.scss";

import { ButtonBase } from "@mui/material";
import { Spinner } from "../../components/Spinner/Spinner";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// import { getGlobalStyle } from "../../utils/index";
import PersonIcon from '@mui/icons-material/Person';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import { ParticlesComponent as Particles } from "../../components/Particles/Particles";

import { ThreeDots, TailSpin } from 'react-loading-icons'

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const key = params.key;

  let [showSpinner, setShowSpinner] = useState(true);
  let [accountsNumber, setAccountsNumber] = useState(0);
  let [charactersNumber, setCharactersNumber] = useState(0);
  let [hoursNumber, setHoursNumber] = useState(0);
  let [vehiclesNumber, setVehiclesNumber] = useState(0);
  let [accountName, setAccountName] = useState("");
  let [accountUID, setAccountUID] = useState(0);

  useEffect(() => {
    const checkSession = async (key) => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/session", {
          params: {
            key: key,
          },
        });
        if (response.data.found === false) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
      }
    };

    const checkInformations = async (key) => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/informations", {});
        const responseSecond = await axios.get("http://127.0.0.1:5000/api/home", {
          params: {
            key: key,
          },
        });

        setAccountsNumber(response.data.accountsNumber);
        setCharactersNumber(response.data.charactersNumber);
        setHoursNumber(response.data.hoursNumber);
        setVehiclesNumber(response.data.vehiclesNumber);
        setAccountName(responseSecond.data.accountName);
        setAccountUID(responseSecond.data.accountUID);

        setShowSpinner(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (key) {
      checkSession(key);
      checkInformations(key);
    } else {
      window.location.href = "/";
    }
  }, [key]);

  return (
    <div className="home">
      <Particles />
      <Spinner open={showSpinner} />
      
      <div className="sidebar">
        <div className="sidebar__upper">
          <div className="basic-info">
            <h1>Cześć, {accountName === "" ? <ThreeDots 
              style={{
                position: "absolute",
                top: "47px",
                left: "90px",
                width: "20px",
                margin: "0"
              }}
            /> : `${accountName}!`}</h1>
            <p>Twoje UID konta: {accountUID === 0 ? <ThreeDots 
              fill="#9DA4AE"
              style={{
                position: "absolute",
                top: "70px",
                left: "155px",
                width: "15px",
                margin: "0",
              }}
            /> : accountUID}</p>
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

            <p>{accountsNumber === 0 ? <TailSpin /> : accountsNumber}</p>
            <span>KONT</span>
          </div>

          <div className="item">
            <AccessibilityIcon className="icon" />

            <p>{charactersNumber === 0 ? <TailSpin /> : charactersNumber}</p>
            <span>POSTACI</span>
          </div>

          <div className="item">
            <AccessTimeIcon className="icon" />

            <p>{hoursNumber === 0 ? <TailSpin /> : (hoursNumber / 100).toFixed()}</p>
            <span>PRZEGRANYCH<br></br>GODZIN</span>
          </div>

          <div className="item">
            <DirectionsCarIcon className="icon" />

            <p>{vehiclesNumber === 0 ? <TailSpin /> : vehiclesNumber}</p>
            <span>POJAZDÓW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
