import React from "react";
import "../styles/style.scss";

import Display from "./components/display.component";
import DarkmodeSwitch from "./components/darkModeSwitch/darkModeSwitch.component";
import Button from "./components/button.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: ""
    };
  }

  //=======================================================================
  // Convert a number to string and separates it to 3-digit parts
  numToStr(num) {
    if (num === "-") {
      return "";
    }
    var n = Number(num);
    return n.toLocaleString("en"); // 8312456 --> "8,312,456"
  }

  //convert the given string to number
  strToNum(str) {
    return Number(str.replace(/,/g, "")); // "8,312,456" --> 8312456
  }

  // Get history value:
  getHistory() {
    return document.getElementById("history").innerText;
  }

  // Print history value:
  printHistory(value) {
    document.getElementById("history").innerText = value;
  }

  // Get the result value:
  getResult() {
    return document.getElementById("result").innerText;
  }

  // Print the result value:
  printResult(value) {
    if (value === "") {
      // if value is a string print it
      document.getElementById("result").innerText = value;
      return;
    } else {
      // if value in not a string, first convert in to string and then print it
      document.getElementById("result").innerText = this.numToStr(value);
    }
  }
  //=======================================================================

  operatorHandleClick = (operators) => {
    for (var i = 0; i < operators.length; i++) {
      operators[i].addEventListener("click", (e) => {
        if (e.target.id === "clear") {
          // Clear Button  ---------------------------------------
          document.getElementById("history").innerText = "";
          document.getElementById("result").innerText = "";
        } else if (e.target.id === "delete") {
          // Delete (Backspace) Button  ------------------------------------
          var result = this.strToNum(this.getResult()).toString(); //  "8,312,456" --> 8312456 --> "8312456"
          if (result) {
            // if result has a value
            result = result.substr(0, result.length - 1);
            this.printResult(result);
          }
        } else {
          result = this.getResult();
          let history = this.getHistory();
          if (result === "" && history !== "") {
            if (isNaN(history[history.length - 1])) {
              //if the last part of history is not a number
              history = history.substr(0, history.length - 1);
            }
          }

          if (result !== "" || history !== "") {
            result = result === "" ? result : this.strToNum(result);
            history += result;

            if (e.target.id === "equal") {
              // Equal Button ----------------------------------
              this.printResult(eval(history));
              this.printHistory("");
            } else {
              // if the operator isn't "DEL" or "C" or "="
              history += e.target.id; // Add operator value to history
              this.printHistory(history);
              this.printResult("");
            }
          }
        }
      });
    }
  };
  // the end of for loop (adding Eventlistener to Operators)
  //Add Eventlistener to Numbers
  numberHandleClick = (numbers) => {
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].addEventListener("click", (e) => {
        let result = this.strToNum(this.getResult());
        if (!isNaN(result)) {
          // if result is a number
          result += e.target.id;
          this.printResult(result);
        }
      });
    }
  };

  //Dark mode toggle
  darkModeToggle = (darkSwitch) => {
    darkSwitch.addEventListener("click", () => {
      if (this.state.isDarkMode === false) {
        this.setState({ isDarkMode: !this.state.isDarkMode });
        //console.log(this.state.isDarkMode);
      } else {
        this.setState({ isDarkMode: !this.state.isDarkMode });
        //console.log(this.state.isDarkMode);
      }

      const calculator = document.querySelector(".container");
      calculator.classList.toggle("dark");
    });
  };

  //=======================================================================
  componentDidMount() {
    const operators = document.getElementsByClassName("operator");
    this.operatorHandleClick(operators);

    const numbers = document.getElementsByClassName("number");
    this.numberHandleClick(numbers);

    const darkSwitch = document.getElementById("modeSwitch");
    this.darkModeToggle(darkSwitch);
  }

  render() {
    return (
      <div className="container">

        <Display />

        <DarkmodeSwitch isDark={this.state.isDarkMode} />

        <Button btnClass="operator" id="clear" sign="C" />
        <Button btnClass="operator" id="%" sign="%" />
        <Button btnClass="operator" id="/" sign="&divide;" />
        <Button btnClass="number" id="7" sign="7" />
        <Button btnClass="number" id="8" sign="8" />
        <Button btnClass="number" id="9" sign="9" />
        <Button btnClass="operator" id="*" sign="&times;" />
        <Button btnClass="number" id="4" sign="4" />
        <Button btnClass="number" id="5" sign="5" />
        <Button btnClass="number" id="6" sign="6" />
        <Button btnClass="operator" id="-" sign="-" />
        <Button btnClass="number" id="1" sign="1" />
        <Button btnClass="number" id="2" sign="2" />
        <Button btnClass="number" id="3" sign="3" />
        <Button btnClass="operator" id="+" sign="+" />
        <Button btnClass="operator" id="equal" sign="=" />
        <Button btnClass="operator" sign="DEL" id="delete" />
        <Button btnClass="operator" id="." sign="." />
        <Button btnClass="number" id="0" sign="0" />
      </div>
    );
  }
}

export default App;
