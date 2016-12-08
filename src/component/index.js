ANNOTATED SOURCE
CoffeeScript is a little language that compiles into JavaScript.Underneath that awkward Java - esque patina, JavaScript has always had a gorgeous heart.CoffeeScript is an attempt to expose the good parts of JavaScript in a simple way.

      The golden rule of CoffeeScript is:
“
It
’
s just JavaScript
”.
The code compiles one - to - one into the equivalent JS, and there is no
interpretation at runtime.You can use any existing JavaScript library seamlessly from CoffeeScript (and vice - versa).The compiled output is readable, pretty - printed, and tends to run as fast or faster than the equivalent handwritten JavaScript.

    The CoffeeScript compiler goes to great lengths to generate output JavaScript that runs in every JavaScript runtime, but there are exceptions.Use generator functions, for
…
from
,
or
tagged template literals only if you know that your target runtimes can support them.If you use modules, you will need to use an additional tool to resolve them.

Latest Version: 1.12
.
0

npm install -g coffee - script
Overview

CoffeeScript on
the left, compiled JavaScript output on
the right.

# Assignment:
number = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root: Math.sqrt
  square: square
  cube: (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)
var cubes, list, math, num, number, opposite, race, square,
  slice = [].slice;

number = 42;

opposite = true;

if (opposite) {
number = -42;
}

square = function(x) {
return x * x;
};

list = [1, 2, 3, 4, 5];

math = {
  root: Math.sqrt,
  square: square,
  cube: function(x) {
return x * square(x);
}
};

race = function() {
  var runners, winner;
winner = arguments[0]
,
runners = 2 <= arguments.length ? slice.call(arguments, 1)
:
[];
return print(winner, runners);
};

if (typeof elvis != = "undefined" && elvis != = null) {
  alert("I knew it!");
}

cubes = (function() {
  var i, len, results;
  results = [];
  for (i = 0
,
len = list.length;
i < len;
i++
)
{
num = list[i];
results.push(math.cube(num));
}
return results;
})
();