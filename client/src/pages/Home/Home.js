import "./Home.scss";

// import { getGlobalStyle } from "../../utils/index";
import { Spinner } from "../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Home = () => {
	// let [showSpinner, setShowSpinner] = useState(true);
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

	let { key } = useParams();

	checkSession(key);

  return (
    <div className="container">
      <Spinner open={showSpinner} />
			
			<div className="container--left">
				
			</div>

			<div className="container--right">
			</div>
    </div>
  );
};

export default Home;
