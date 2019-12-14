let historyValue = document.getElementById("history-value");
let outputValue = document.getElementById("output-value");
const getHistory = () => {
  return historyValue.textContent;
};

const printHistory = num => {
  historyValue.textContent = num;
};

const getOutput = () => {
  return outputValue.textContent;
};

const printOutput = num => {
  if (num === "") {
    outputValue.textContent = num;
  } else {
    outputValue.textContent = getFormatedValue(num);
  }
};

const getFormatedValue = num => {
  if (num == "-") return "";
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
};

const removeNumberFormat = num => {
  return Number(num.replace(/,/g, ""));
};

// operator logic
let operator = document.getElementsByClassName("operator");
for (let op of operator) {
  op.addEventListener("click", () => {
    if (op.id === "clear") {
      printHistory("");
      printOutput("");
    } else if (op.id === "backspace") {
      let output = removeNumberFormat(getOutput()).toString();
      if (output) output = output.substr(0, output.length - 1);
      printOutput(output);
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output === "" && history !== "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output !== "" || history !== "") {
        output = output === "" ? output : removeNumberFormat(output);
        history = history + output;
        if (op.id === "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + op.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

// Number logic
let number = document.getElementsByClassName("number");
for (let num of number) {
  num.addEventListener("click", () => {
    let output = removeNumberFormat(getOutput());
    if (!isNaN(output)) {
      output = output + num.id;
      printOutput(output);
    }
  });
}
