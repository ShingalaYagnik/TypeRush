// const URL_QUOTE = 'http://api.quotable.io/random';
const quoteDisplay = document.getElementById("quote-display");
const timerDisplay = document.getElementById("timer");

var sec = 0;
var stoptime = true;

function startTimer() {
	if (stoptime == true) {
		stoptime = false;
		timerCycle();
	}
}
function stopTimer() {
	if (stoptime == false) {
		stoptime = true;
	}
}

function timerCycle() {
	if (stoptime == false) {
		sec = parseInt(sec);

		sec = sec + 1;
		timerDisplay.innerHTML = sec;
		setTimeout("timerCycle()", 1000);
	}
}

const quoteInput = document.body;
var len,
	ind,
	isPrevSpace = false;
var quote = quoteDisplay.innerText;
ind = 0;
len = quote.length;
quoteDisplay.innerHTML = "";

var words = quote.split(" ").length;

quote.split("").forEach((element) => {
	const charSpan = document.createElement("span");
	charSpan.innerText = element;
	quoteDisplay.appendChild(charSpan);
});

var btn = document.createElement("button");
btn.innerHTML = "Replay";
btn.classList.add("btn");
btn.classList.add("replay-btn");
document.body.appendChild(btn);

startTimer();

quoteInput.addEventListener("keypress", (key) => {
	const spanArray = document.querySelectorAll("span");
	if (key.key === spanArray[ind].innerText) {
		spanArray[ind].classList.add("correct");
		spanArray[ind].classList.remove("incorrect");
		isPrevSpace = false;
		ind++;
	} else if (
		ind + 1 < len &&
		spanArray[ind + 1].innerText == " " &&
		isPrevSpace &&
		key.key == " "
	) {
		spanArray[ind].classList.add("correct");
		spanArray[ind].classList.remove("incorrect");
		ind++;
		spanArray[ind].classList.add("correct");
		spanArray[ind].classList.remove("incorrect");
		ind++;
	} else {
		spanArray[ind].classList.add("incorrect");
		spanArray[ind].classList.remove("correct");
		if (key.key == " ") {
			isPrevSpace = true;
		} else {
			isPrevSpace = false;
		}
	}
	if (ind + 1 >= len) {
		btn.classList.remove("replay-btn");
		stopTimer();
		var timeTaken = parseInt(timerDisplay.innerHTML);

		timerDisplay.innerHTML =
			" wpm = " +
			Math.floor((parseInt(words) * 60.0) / timeTaken).toString() +
			"\nwords = " +
			words.toString() +
			"\nTime Taken = " +
			timeTaken.toString();
		btn.addEventListener("click", function () {
			location.href = "/";
		});
	}
});
