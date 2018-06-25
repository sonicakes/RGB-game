let numSquares = 6;
let colors = generateRandomColors(numSquares);
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");

/******************************************************************************/

function fillSquare(square, color){
  square.style.background = color;
  //save the color in dataset attribute to use it later in comparison
  square.dataset.color = color;
}

function resetMessage(){
  messageDisplay.textContent = "";
  messageDisplay.style.background = "";
}

/******************************************************************************/

easyBtn.addEventListener("click", function() {
  resetMessage();
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = 3;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      fillSquare(squares[i], colors[i]);
    } else {
      squares[i].style.display = "none";
    }
  }
});

hardBtn.addEventListener("click", function() {
  resetMessage();
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = 6;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    fillSquare(squares[i], colors[i]);
    squares[i].style.display = "block";
  }
});

resetButton.addEventListener("click", function() {
  resetMessage();
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    fillSquare(squares[i], colors[i]);
  }
  h1.style.background = "hotpink";
});

colorDisplay.textContent = pickedColor;

for (let i = 0; i < squares.length; i++) {
  // add initial colors to squares
  fillSquare(squares[i], colors[i]);

  //add click listeners to squares
  squares[i].addEventListener("click", function() {

    if (messageDisplay.textContent === "") {
      //grab color of clicked squares from dataset saved earlier
      let clickedColor = this.dataset.color;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        messageDisplay.style.background = "green";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
        messageDisplay.style.background = "red";
      }
    }

  });
}

function changeColors(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.background = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to arr
  for (let i = 0; i < num; i++) {
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor() {
  //pick a "red" from 0 - 255
  let r = Math.floor(Math.random() * 256);
  //pick a "green" from 0 - 255
  let g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 - 255
  let b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
