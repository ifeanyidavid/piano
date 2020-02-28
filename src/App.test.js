import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

describe("Piano <App />", () => {
  it("Complete app renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
