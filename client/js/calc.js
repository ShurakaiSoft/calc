/**
 * var calc = CALC.createCalculator();
 *
 * Adds a namespace variable CALC to the global scope. It contains one function,
 * createCalculator which will create a calculator in a given div with a given
 * number of display digits.
 * 
 * Example:
 * 
 * 		var calc = CALC.createCalculator('#myLocation', 10);
 * 
 */
(function () {
	window.CALC = window.CALC || (function () {
		// private stuff
		function trimTrailingZeros(number) {
			return new Number(number).toString();
		}

		function formatAnswer(answer, displayLength) {
			if (String(answer).length > displayLength) {
				return Number(answer).toPrecision(displayLength - 4); 
			} else {
				return answer;
			}
		};

		// public API
		return {
			createCalculator: function (location, digits) {
				var $display = null;
				var rhs = 0;	
				var operator = null;
				var display = '0';
				var hasDecimal = false;
				var answer = 0;
				
				
				(function uiBuilder() {
					var $location = null;
					var $keypad = null;
					
					$display = $('<div class="calc-display"></div>');
					$keypad = $(
						'<div class="calc-keypad">' +
							'<button value="b" class="warningButton back" >&laquo;</button>' +
							'<button value="c" class="doubleButton warningButton">clear</button>' +
							'<button value="+" >+</button>' +
							'<button value="7" >7</button>' +
							'<button value="8" >8</button>' +
							'<button value="9" >9</button>' +
							'<button value="-" >-</button>' +
							'<button value="4" >4</button>' +
							'<button value="5" >5</button>' +
							'<button value="6" >6</button>' +
							'<button value="*" >&#215;</button>' +
							'<button value="1" >1</button>' +
							'<button value="2" >2</button>' +
							'<button value="3" >3</button>' +
							'<button value="/" >&#247;</button>' +
							'<button value="0" >0</button>' +
							'<button value="." >.</button>' +
							'<button value="=" class="doubleButton">=</button>' +
						'</div>'
					);
					$keypad.delegate('button', 'click', function (event) {
						var keyPressed = $(this).attr('value');
						switch (keyPressed) {
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
							doDigit(keyPressed);
							break;
						case '+':
						case '-':
						case '*':
						case '/':
							doOperator(keyPressed);
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
							alert("Detected Unknown Key: " + keyPressed);
							break;
						}
						event.stopPropagation();
					});

					$location = $(location);
					$location.html(
						'<h1 id="new"><span class="logo"><i>Shurakai</i><b>Soft</b></span></h1>' +
						'<h2>SV104 CALCULATOR</h2>'
					);
					$location.append($display);
					$location.append($keypad);

					
					$display.update = function (value) {
						this.html(value);
					};
					$display.displayLength = digits || 10;
					
				})();
				
				function debug(message) {
					$display.update(message);
				}
				
				function resetDisplay() {
					hasDecimal = false;
					display = '0';
					$display.update(display);
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
					display = trimTrailingZeros(formatAnswer(result, $display.displayLength));
					$display.update(display);
					answer = true;
				};
				
				function concatDigit(digit) {
					if (display.length < $display.displayLength) {
						display += digit;
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
					$display.update(display);
				}
				
				function doOperator(op) {
					if (display == '0') {
						return;
					}
					rhs = display;
					operator = op;
					resetDisplay();
				}
				
				
				reset();
			}
		};
	})();
})();
