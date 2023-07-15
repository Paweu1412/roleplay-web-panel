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

import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

import { ThreeDots, TailSpin } from 'react-loading-icons'

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  let [showSpinner, setShowSpinner] = useState(true);
  let [accountsNumber, setAccountsNumber] = useState(0);
  let [charactersNumber, setCharactersNumber] = useState(0);
  let [hoursNumber, setHoursNumber] = useState(0);
  let [vehiclesNumber, setVehiclesNumber] = useState(0);
  let [accountName, setAccountName] = useState("");
  let [accountUID, setAccountUID] = useState(0);

  const checkSession = async (key) => {
    const response = await axios.get("http://127.0.0.1:5000/api/session", {
      params: {
        key: key,
      },
    });
    
    if (response.data.found === false) {
      return window.location.href = "/";
    }
  }

  const key = params.key;

  checkSession(key);

  const checkInformations = async (key) => {
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
    setAccountUID(responseSecond.data.accountUID)

    setTimeout(() => {
      setShowSpinner(false);
    }, 50);
  }

  checkInformations(key);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="home">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: 'transparent',
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: 'canvas',
            events: {
              resize: false
            },
          },
          "particles": {
            "number": {
              "value": 40,
              "density": {
                "enable": true,
                "value_area": 400
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 1,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 10,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 200,
              "color": "#ffffff",
              "opacity": 0.05,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 1,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "retina_detect": true
        }}
      />  

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
