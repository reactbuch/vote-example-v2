// React
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Import VotingComponent
import VotingComponent from "./components/VotingComponent";

// Sample data
const vote = {
  title: "How is your day?",
  description: "Tell me: how has your day been so far?",
  choices: [
    { id: "choice_1", title: "Good", count: 7 },
    { id: "choice_2", title: "Bad", count: 12 },
    { id: "choice_3", title: "Not sure yet", count: 1 }
  ]
};

// Render VotingComponent
ReactDOM.render(
  <VotingComponent vote={vote} />,
  document.getElementById("root")
);
