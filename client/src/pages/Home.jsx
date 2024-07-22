import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
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

  useEffect(() => {}, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    axios
      .post("http://localhost:3000/user/chat", { input })
      .then((response) => {
        setResponse(response.data.message);
        console.log("Response from OpenAI", response.data.message);
      })
      .catch((error) => {
        console.log("Error while sending message", error);
      });
  };

  return (
    <>
      <h1 className="text-center mt-3">Welcome to ChatTalk</h1>
      <div className="container">
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-md-8">
            <div className="card">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-secondary">
                  Lets Talk with ChatTalk
                </span>

                <div className="d-flex flex-row">
                  <button className="btn btn-secondary" onClick={handleClick}>
                    Send
                  </button>
                </div>
              </div>

              <div className="mt-3 inputs">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your query here !"
                  value={input}
                  name="input"
                  onChange={handleChange}
                />
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <span className="star">
                      <IoChatbubbleEllipsesSharp />
                    </span>

                    <div className="d-flex flex-column">
                      <span>Marketing</span>
                      <div className="d-flex flex-row align-items-center time-text">
                        <small>Marketing</small>
                        <span className="dots"></span>
                        <small>viewed Just now</small>
                        <span className="dots"></span>
                        <small>Edited 15 minutes ago</small>
                      </div>
                    </div>
                  </div>

                  <span className="content-text-1">BA</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <span className="star">
                      <IoChatbubbleEllipsesSharp />
                    </span>

                    <div className="d-flex flex-column">
                      <span>Developing</span>
                      <div className="d-flex flex-row align-items-center time-text">
                        <small>Developing</small>
                        <span className="dots"></span>
                        <small>viewed Just now</small>
                        <span className="dots"></span>
                        <small>Edited 25 minutes ago</small>
                      </div>
                    </div>
                  </div>

                  <span className="content-text-2">05</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <span className="star">
                      <IoChatbubbleEllipsesSharp />
                    </span>

                    <div className="d-flex flex-column">
                      <span>Marketing</span>
                      <div className="d-flex flex-row align-items-center time-text">
                        <small>Marketing</small>
                        <span className="dots"></span>
                        <small>viewed Just now</small>
                        <span className="dots"></span>
                        <small>Edited 15 minutes ago</small>
                      </div>
                    </div>
                  </div>

                  <span className="content-text-1">BA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center mt-3">
          <p>{response}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
