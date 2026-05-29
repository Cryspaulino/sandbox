myFunction()
funcExpression()
// the second function hasn't been declared yet so it wouldn't work.

// Declaration function
function myFunction() {
    var myVar = 11;

}

// Expression function
const funcExpression = function() {}

// Arrow function
const arrow = (num) => num * 2

// If what you're iterating is a list probably don't use for loops