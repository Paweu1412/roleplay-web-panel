import "./Account.scss";

import { ButtonBase } from "@mui/material";
import { Spinner } from "../../../components/Spinner/Spinner";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { getGlobalStyle } from "../../utils/index";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupIcon from '@mui/icons-material/Group';

import { ParticlesComponent as Particles } from "../../../components/Particles/Particles";

import { ThreeDots } from 'react-loading-icons'

const Account = () => {
  const { key } = useParams();

  let [showSpinner, setShowSpinner] = useState(true);
  let [accountName, setAccountName] = useState("");
  let [accountUID, setAccountUID] = useState(0);

  useEffect(() => {
    const checkSession = async (key) => {
      try {
        const response = await axios.get(`http://${window.location.hostname}:5000/api/session`, {
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
        const responseSecond = await axios.get(`http://${window.location.hostname}:5000/api/home`, {
          params: {
            key: key,
          },
        });

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
    <div className="account">
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
              <ButtonBase className="button active" onClick={() => {}}>
                <PersonRoundedIcon className="icon" />
                <span className="description">Konto</span>
              </ButtonBase>
            </li>

            <li>
              <ButtonBase className="button" onClick={() => {
                window.location.href = `/dashboard/${key}/groups`;
              }}>
                <GroupIcon className="icon" />
                <span className="description">Grupy</span>
              </ButtonBase>
            </li>
          </ul>
        </div>
      </div>

      <div className="main">
      </div>
    </div>
  );
};

export default Account;
