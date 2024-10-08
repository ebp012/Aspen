var calcResult;
var focusStats;
var pauseStats;
var aspenConsole = document.getElementById("aspenConsole");
function clearConsole() {
	aspenConsole.innerText = "";
}
function doCmd() {
	checkLabLang();
	//console.log("Task succeded");
	var settingStuffs = clearCmd();
	var commandBlockText = document.getElementById("commandBlock").innerText;
}
function printVoid(text) {
	// Print text
	aspenConsole.innerText += "\n" + text;
}
function errorVoid(text) {
	// Error handling output
	console.log(text);
}
function checkLabLang() { // the compiler for the Void programming language 
	var commandTyped = document.getElementById("commandBlock").innerText.split(";")[0].trim();
  	var commandProcessed = commandTyped.replace(/([^\\])\\/g, "$1")
	var commandEntered = commandProcessed.replace(/[\t\n]/g, "");
	
	if (commandEntered == "print()") {
		// Print function (no arguments)
		printVoid();
	}
	else if (commandEntered.startsWith('print("') && commandEntered.endsWith('")')) {
		// Print function (string argument)
		var alertText = commandEntered.substring(7, commandEntered.length - 2);
		printVoid(alertText);
	}
	else if (commandEntered == "select()") {
		// Select function (no arguments)
		
	}
	else if (commandEntered.startsWith('select("') && commandEntered.endsWith('")')) {
		// Select function (string argument)
		var elementName = commandEntered.substring(7, commandEntered.length - 2);
	}
	else if (commandEntered.startsWith('#')) {
		// Generic full-line comment		
	}
	else if (commandEntered.startsWith('note("') && commandEntered.endsWith('")')) {
		// Alternative to print() that will print NO MATTER WHAT
		var alertText = commandEntered.substring(7, commandEntered.length - 2);
		printVoid(alertText);
	}
	else if (commandEntered == "get(aspen.version)") {
		printVoid("Aspen Alpha 1.7");
	}
	else if (commandEntered == "get()") {
		errorVoid("(void)ERR: Undefined parameter, please specify it; at (main):1:4");
	}
		
	else if (commandEntered.startsWith("calc('") && commandEntered.endsWith('")')) {
		var calcParams = commandEntered.substring(7, commandEntered.length - 2).split(":");
		if (calcParams.length >= 4 && calcParams.length <= 6) {
				var a = parseInt(calcParams[0]);
				var t = parseInt(calcParams[1]);
				var m = parseFloat(calcParams[2]);
				var n = parseFloat(calcParams[3]);
				var o = parseFloat(calcParams[4]);
				var p = parseFloat(calcParams[5]);

				if (a >= 0 && a <= 4) {
						if (a === 1 && (t === 7 || t === 8)) {
								calcResult = calculateSingleTermOperation(t, m);
						}
						else if (a === 1 && t < 7) {
								alert("Invalid calculation");
						}
						else if (a === 2) {
								calcResult = calculateBinaryOperation(t, m, n);
						}
						else if (a === 3) {
								calcResult = calculateTernaryOperation(t, m, n, o);
						}
						else if (a === 4) {
								calcResult = calculateQuaternaryOperation(t, m, n, o, p);
						}
						printVoid(calcResult);
				}
				else if (a < 0 || a > 8) {
						printVoid("(void)ERR: Invalid operand, must be between 0 and 8; at (main)1:8");
				}
		}
	}

	else {
		clearCmd();
		focusStats = false;
		return false;
	}
}

function clearCmd() {
	document.getElementById("commandBlock").innerHTML="";
}
function calculateSingleTermOperation(operation, term) {
		switch (operation) {
				case 7: // Factorial
						return factorial(term);
				case 8: // Square root
						return Math.sqrt(term);
				default:
						return null;
		}
}

function calculateBinaryOperation(operation, term1, term2) {
		switch (operation) {
				case 0: // Addition
						return term1 + term2;
				case 1: // Subtraction
						return term1 - term2;
				case 2: // Multiplication
						return term1 * term2;
				case 3: // Division
						return term1 / term2;
				case 4: // Modulus
						return term1 % term2;
				case 5: // Exponentiation
						return Math.pow(term1, term2);
				case 6: // Tetration
						return tetration(term1, term2);
				default:
						return null;
		}
}
function calculateTernaryOperation(operation, term1, term2, term3) {
		switch (operation) {
				case 0: // Addition
						return term1 + term2 + term3;
				case 1: // Subtraction
						return term1 - term2 - term3;
				case 2: // Multiplication
						return term1 * term2 * term3;
				case 3: // Division
						return (term1 / term2) / term3;
				case 5: // Exponentiation
						return term1 ** (term2 ** term3);
				default:
						return null;
		}
}
function calculateQuaternaryOperation(operation, term1, term2, term3) {
		switch (operation) {
				case 0: // Addition
						return term1 + term2 + term3 + term4;
				case 1: // Subtraction
						return term1 - term2 - term3 - term4;
				case 2: // Multiplication
						return term1 * term2 * term3 * term4;
				case 3: // Division
						return term1 / (term2 * term3 * term4);
				case 5: // Exponentiation
						return term1 ** (term2 ** (term3 ** term4));
				default:
						return null;
		}
}
function tetration(a, b) {
		if (b === 1) {
				return a;
		}
		return Math.pow(a, tetration(a, b - 1));
}
// Get the input field
var inputk = document.getElementById("commandBlock");

var isExpanded = false;

function toggleExpand() {
		isExpanded = !isExpanded;
		var commandContainer = document.getElementById("commandContainer");
		commandContainer.classList.toggle("cmdExpand", isExpanded);
		var commandBlock = document.getElementById("commandBlock");
		commandBlock.classList.toggle("cmdExpandBox", isExpanded);
		var commandConsole = document.getElementById("cmdConsole");
		commandConsole.classList.toggle("cmdConsole", isExpanded);
}
