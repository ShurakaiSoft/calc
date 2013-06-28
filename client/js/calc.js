/**
 * 
 * 
 * var calc = CALC.createCalculator();
 * 
 */
(function () {
	window.CALC = window.CALC || (function () {
		// private stuff
		
		// public API
		return {
			createCalculator: function (location, digits) {
				(function (displayLength) {
					displayLength = Number(displayLength) || 10;	// the length of the display in characters
					var rhs = 0;	
					var operator = null;
					var display = '0';
					var hasDecimal = false;
					var answer = 0;
					
					function updateDisplay() {
						$('#display').html(display);
					};
				
					function debug(message) {
						$('#display').html(message);
					}
					
					function resetDisplay() {
						hasDecimal = false;
						display = '0';
						updateDisplay();
					};
				
					function doCalc() {
						if (rhs == 0 || display == 0) {
							return;
						}
						var result = 0;
						switch (operator) {
						case '+':
							result = parseInt(rhs, 10) + parseInt(display, 10);
							break;
						case '-':
							result = rhs - display;
							break;
						case '*':
							result = rhs * display;
							break;
						case '/':
							result = rhs / display;
							break;
						default:
							result = "Invalid Op";
						}
						display = trimTrailingZeros(formatAnswer(result));
						updateDisplay();
						answer = true;
					};
					
					function trimTrailingZeros(number) {
						return new Number(number).toString();
					}
					
					function concatDigit(digit) {
						if (display.length < displayLength) {
							display += digit;
						}
					};
					
					function formatAnswer(answer) {
						if (String(answer).length > displayLength) {
							return Number(answer).toPrecision(displayLength - 4);
						} else {
							return answer;
						}
					};
					
					function reset() {
						rhs = 0;
						operator = null;
						answer = 0;
						resetDisplay();
					}
					
					function doDigit(digit) {
						if (answer == true) {
							answer = false;
							display = '0';
						}
						if (display == '0') {
							switch (digit) {
							case '0':
								return;
							case '.':
								hasDecimal = true;
								display = "0.";
								break;
							default:
								display = digit;
								break;
							}
						} else {
							if (digit === '.') {
								if (hasDecimal == true) {
									return;
								} else {
									hasDecimal = true;
								}
							}
							concatDigit(digit);
						}
						updateDisplay();
					}
					
					function doOperator(op) {
						if (display == '0') {
							return;
						}
						rhs = display;
						operator = op;
						resetDisplay();
					}
					
					// constructor
					$('#keypad').delegate('button', 'click', function (event) {
						var key = $(this).attr('value');
						switch (key) {
						case '0':
						case '1':
						case '2':
						case '3':
						case '4':
						case '5':
						case '6':
						case '7':
						case '8':
						case '9':
						case '.':
							doDigit(key);
							break;
						case '+':
						case '-':
						case '*':
						case '/':
							doOperator(key);
							break;
						case '=':
							doCalc();
							break;
						case 'c':
							reset();
							break;
						case 'b':
							location.href = 'home.html';
							break;
						default:
							alert("Detected Unknown Key: " + key);
							break;
						}
						event.stopPropagation();
					});
					reset();
				})(digits);
			}
		};
	})();
})();
