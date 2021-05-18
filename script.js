const net = new brain.NeuralNetwork(); //Network object from the brain.js

//Raw Data
let data = [{
  input: {r: 0, b: 0, g: 0},
  output: [1]
},
{
  input: {r: 1, b: 1, g: 1},
  output: [0]
},
];
//Training basic data
net.train(data);
//Getting Elements by their Id from the HTML
const sandbox = document.getElementById('sandbox');
const guess = document.getElementById('guess');
const netowrk_image = document.getElementById('network-img');
//Buttons
const white_button = document.getElementById('white'); 
const black_button = document.getElementById('black');
//SVG of the neural network
netowrk_image.innerHTML = brain.utilities.toSVG(net);


//Get the background color at random
let current_background;
//Method to get random background color
getRandomBackground();

function getRandomBackground(){
  //Math.random returns a random number from 0-1
  current_background = {
    r: Math.random(),
    b: Math.random(),
    g: Math.random()
  };
  //Setting the color in the range of 1-255
  sandbox.style.backgroundColor = `rgba(${current_background.r * 255},${current_background.g * 255}, ${current_background.b * 255})`;
  const guess_color = net.run(current_background)[0];
  //net.run returns and array
  guess.style.color = guess_color > 0.5 ? '#FFF' : '#000';
  //the guess is between 0-1 and hence anything above o.5 is regarded as white.
}

white_button.addEventListener('click', () => {
  chosenColor(1);
});

black_button.addEventListener('click', () => {
  chosenColor(0);
})

function chosenColor(value){
  //Adding the data to the raw list
  data.push({
   input: current_background,
    output: [value]
  });
//Self train after the data is updated
net.train(data);
//Get new background
getRandomBackground();
//To check if it is updating or not
console.log(JSON.stringify(data));
}