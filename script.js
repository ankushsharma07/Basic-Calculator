const output = document.querySelector(".output-box");
let resultShown = false;
let lastAnswer = "";

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (value === "C") {
            output.innerText = "Enter Number";
            resultShown = false;
            lastAnswer = "";
            return;
        }

        if (value === "back") {
            output.innerText = output.innerText.slice(0, -1);
            return;
        }

        if (value === "Ans") {
            if (lastAnswer !== "") {
                if (output.innerText === "Enter Number" || resultShown) {
                    output.innerText = "Ans";
                } else {
                    output.innerText += "Ans";
                }
                resultShown = false;
            }
            return;
        }

        if (value === "=") {
            try {
                let expression = output.innerText.replace(/Ans/g, lastAnswer);
                let result = eval(expression);
                output.innerText = result;
                lastAnswer = result;
                resultShown = true;
            } catch {
                output.innerText = "Error";
                resultShown = true;
            }
            return;
        }

        if (resultShown && ["+", "-", "*", "/"].includes(value)) {
            output.innerText += value;
            resultShown = false;
            return;
        }

        if (resultShown) {
            output.innerText = value;
            resultShown = false;
            return;
        }

        if (output.innerText === "Enter Number") {
            output.innerText = value;
        } else {
            output.innerText += value;
        }
    });
});

document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (/[\d+\-*/.]/.test(key)) {
        simulateClick(key);
    }

    if (key === "Enter") {
        simulateClick("=");
    }

    if (key === "Backspace") {
        simulateClick("back");
    }

    if (key === "Escape") {
        simulateClick("C");
    }

    if (key.toLowerCase() === "a") {
        simulateClick("Ans");
    }
});

function simulateClick(value) {
    let btn = [...document.querySelectorAll("button")].find(b => b.innerText === value);
    if (btn) btn.click();
}
