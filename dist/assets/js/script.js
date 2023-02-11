const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".input");
const displayOutput = document.querySelector(".output");

let input = "";

for (const key of keys) {
    const value = key.dataset.key;

    key.addEventListener("click", () => {
        console.log(value);

        if (value == "clear") {
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            displayInput.innerHTML = cleanInput(input);
        } else if (value == "=") {
            let result = eval(percentageInput(input));
            displayOutput.innerHTML = cleanOutput(result);
        } else if (value == "brackets") {
            if (
                input.indexOf("(") == -1 ||
                (input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") < input.lastIndexOf(")"))
            ) {
                input += "(";
            } else if (
                (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
                (input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") > input.lastIndexOf(")"))
            ) {
                input += ")";
            }

            displayInput.innerHTML = cleanInput(input);
        } else {
            if (validateInput(value)) {
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
    });
}

const cleanInput = (input) => {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for (let i = 0; i < inputArrayLength; i++) {
        if (inputArray[i] == "*") {
            inputArray[i] = `<span class="text-[#EB6666] mx-1">x</span>`;
        } else if (inputArray[i] == "/") {
            inputArray[i] = `<span class="text-[#EB6666] mx-1">÷</span>`;
        } else if (inputArray[i] == "+") {
            inputArray[i] = `<span class="text-[#EB6666] mx-1">+</span>`;
        } else if (inputArray[i] == "-") {
            inputArray[i] = `<span class="text-[#EB6666] mx-1">-</span>`;
        } else if (inputArray[i] == "(") {
            inputArray[i] = `<span class="text-[#26FED7] mx-1">(</span>`;
        } else if (inputArray[i] == ")") {
            inputArray[i] = `<span class="text-[#26FED7] mx-1">)</span>`;
        } else if (inputArray[i] == "%") {
            inputArray[i] = `<span class="text-[#26FED7] mx-1">%</span>`;
        }
    }

    return inputArray.join("");
};

const cleanOutput = (output) => {
    let outputString = output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];

    let outputArray = outputString.split("");

    if (outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0; i -= 3) {
            outputArray.splice(i, 0, ",");
        }
    }

    if (decimal) {
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join("");
};

const validateInput = (value) => {
    let lastInput = input.slice(-1);
    let operators = ["+", "-", "*", "/"];

    if (value == "." && lastInput == ".") {
        return false;
    }

    if (operators.includes(value)) {
        if (operators.includes(lastInput)) {
            return false;
        } else {
            return true;
        }
    }

    return true;
};

const percentageInput = (input) => {
    let inputArray = input.split("");

    for (let i = 0; i < inputArray.length; i++) {
        if (inputArray[i] == "%") {
            inputArray[i] = "/100";
        }
    }

    return inputArray.join("");
};
