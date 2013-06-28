test("CALC exists", function () {
	ok(typeof CALC == 'object', "Passed!");
});

test("CALC contains a function createCalculator", function () {
	ok(typeof CALC.createCalculator == 'function');
});