import "./Home.scss";

import { ButtonBase } from "@mui/material";
import { Spinner } from "../../components/Spinner/Spinner";
import { useState } from "react";
import axios from "axios";

// import { getGlobalStyle } from "../../utils/index";
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  let [showSpinner, setShowSpinner] = useState(true);

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
            <PersonRoundedIcon className="icon" />

            <p>0</p>
            <span>KONT</span>
          </div>

          <div className="item">
            <PersonRoundedIcon className="icon" />

            <p>0</p>
            <span>POSTACI</span>
          </div>

          <div className="item">
            <PersonRoundedIcon className="icon" />

            <p>0</p>
            <span>GODZIN</span>
          </div>

          <div className="item">
          <PersonRoundedIcon className="icon" />

            <p>0</p>
            <span>POJAZDÓW</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
