import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/verify-user")
      .then((response) => {
        if (response.data.status) {
          setIsLoading(false);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error while verifying user", error);
        navigate("/");
      });
  }, [navigate]);

  return <h1 className="text-center">Welcome to ChatTalk</h1>;
};

export default Home;
