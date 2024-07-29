import React, { useEffect, useState } from "react";
import {
  IoChatbubbleEllipsesSharp,
  IoCopyOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GeminApi, verifyUser } from "../api/user.api";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    verifyUser()
      .then((response) => {
        if (response.status) {
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

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    setIsProcessing(true);
    GeminApi(input)
      .then((response) => {
        setResponse(response.message);
        setIsProcessing(false);
        console.log("Response from OpenAI", response.data.message);
      })
      .catch((error) => {
        console.log("Error while sending message", error);
        setIsProcessing(false);
      });
  };

  const handleClose = () => {
    setInput("");
    setResponse("");
    setCopiedPrompt(null);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedPrompt(index);
        console.log("Text copied to clipboard: ", text);
        setTimeout(() => setCopiedPrompt(null), 2000);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <>
      <h1 className="text-center mt-3">Welcome to ChatTalk</h1>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center mt-3">
          <div className="col-md-5">
            <div className="card recent-prompts-card">
              <h6>Popular Prompts for the day</h6>
              <ul className="list-group list-group-flush" id="textsmall">
                {[
                  "What are best practices for implementing microservices architecture?",
                  "How does GitHub Copilot enhance developer productivity?",
                  "What are the latest features in React 18?",
                  "How can I optimize performance in a large-scale web application?",
                  "What are the benefits of using TypeScript over JavaScript?",
                  "How to secure a RESTful API?",
                  "What is the future of AI in software development?",
                ].map((prompt, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => handleCopy(prompt, index)}
                    style={{ cursor: "pointer" }}
                  >
                    {prompt}
                    {copiedPrompt === index ? (
                      <IoCheckmarkOutline className="text-success" />
                    ) : (
                      <IoCopyOutline />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold text-secondary">
                  Let's Talk with ChatTalk
                </span>

                <div className="d-flex flex-row">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={handleClick}
                  >
                    Send
                  </button>
                  <button className="btn btn-secondary" onClick={handleClose}>
                    New Chat
                  </button>
                </div>
              </div>

              <div className="mt-3 inputs">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your query here!"
                  value={input}
                  name="input"
                  onChange={handleChange}
                  height="50"
                />
              </div>
              <div>
                <div className="star mt-3">
                  <IoChatbubbleEllipsesSharp />
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-row align-items-center">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row align-items-center time-text fs-5">
                        {isProcessing ? (
                          <p>Please wait for a while...</p>
                        ) : response ? (
                          <p>{response}</p>
                        ) : (
                          <p>Please enter a prompt you are looking for!</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
