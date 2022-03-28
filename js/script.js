import "./byeie"; // loučíme se s IE
import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import App from "./App.jsx";

ReactDOM.render(<App />, document.getElementById("root"));

/*
// snadné načtení souboru pro každého!
fetch("https://blabla.cz/blabla.json")
  .then(response => response.json()) // nebo .text(), když to není json
  .then(data => {
    // tady jde provést s daty cokoliv
  });
*/
