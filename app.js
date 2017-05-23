var imagesArray = [];
var displayedImages = [];
var lastShown = [];
var counter = 0;
var list = document.getElementById('list');

//object constructor
function ImageOption(name, path){
  this.name=name;
  this.path=path;
  this.clickCount=0;
  this.displayCount=0;
  imagesArray.push(this);
}

var bag = new ImageOption ('bag', 'img/bag.jpg');
var banana = new ImageOption('banana', 'img/banana.jpg');
var bathroom = new ImageOption('bathroom', 'img/bathroom.jpg');
var boots = new ImageOption('boots', 'img/boots.jpg');
var breakfast = new ImageOption('breakfast', 'img/breakfast.jpg');
var bubblegum = new ImageOption('bubblegum', 'img/bubblegum.jpg');
var chair = new ImageOption('chair', 'img/chair.jpg');
var cthulhu = new ImageOption('cthulhu', 'img/cthulhu.jpg');
var dogduck = new ImageOption('dog-duck', 'img/dog-duck.jpeg');
var dragon = new ImageOption('dragon', 'img/dragon.jpg');
var pen = new ImageOption('pen', 'img/pen.jpg');
var petsweep = new ImageOption('pet-sweep', 'img/pet-sweep.jpg');
var scissors = new ImageOption('scissors', 'img/scissors.jpg');
var shark = new ImageOption('shark', 'img/shark.jpg');
var sweep = new ImageOption('sweep', 'img/sweep.png');
var tauntaun = new ImageOption('tauntaun', 'img/tauntaun.jpg');
var unicorn = new ImageOption('unicorn', 'img/unicorn.jpg');
var usb = new ImageOption('usb', 'img/usb.gif');
var watercan = new ImageOption('water-can', 'img/water-can.jpg');


//generates array of three random images
function randomImages(max){
  for (var i =0; i<3; i++){
    displayedImages.push(imagesArray[Math.floor(Math.random() * max)]);
  }
  // console.log(displayedImages);
  // while(displayedImages[0] === displayedImages[1] || displayedImages[0] === displayedImages[2] || displayedImages[1] === displayedImages[2]){
  //   displayedImages.splice(1, 2);
  //   displayedImages.push(imagesArray[Math.floor(Math.random() * max +1)]);
  //   displayedImages.push(imagesArray[Math.floor(Math.random() * max +1)]);
  // }
  //compares current array[i] to last shown array, and to the other two positions in the current array, replaces if there is a similarity
  while(displayedImages[0] === lastShown[0] || displayedImages[0] === lastShown[1] || displayedImages[0] === lastShown[2] || displayedImages[0] === displayedImages[1] || displayedImages[0] === displayedImages[2]){
    displayedImages.splice(0, 1, imagesArray[Math.floor(Math.random() * max)]);
  }
  while(displayedImages[1] === lastShown[0] || displayedImages[1] === lastShown[1] || displayedImages[1] === lastShown[2] || displayedImages[1] === displayedImages[0] || displayedImages[1] === displayedImages[2]){
    displayedImages.splice(1, 1, imagesArray[Math.floor(Math.random() * max)]);
  }
  while(displayedImages[2] === lastShown[0] || displayedImages[2] === lastShown[1] || displayedImages[2] === lastShown[2] || displayedImages[2] === displayedImages[1] || displayedImages[2] === displayedImages[0]){
    displayedImages.splice(2, 1, imagesArray[Math.floor(Math.random() * max)]);
  }
  //end last and current display
  return displayedImages;
}

randomImages(imagesArray.length);


function clicker(click) {
  for (var i = 0; i < imagesArray.length; i++) {
    if (imagesArray[i].name === click) {
      imagesArray[i].clickCount ++;
      console.log(imagesArray[i].clickCount);
    }
  }
}

function render(){
  for (var j = 0; j<3; j++) {
    var display = document.getElementById('display');
    var object = displayedImages[j];
    var image = document.createElement('img');
    image.setAttribute('class','survey');
    image.setAttribute('src', object.path);
    image.setAttribute('id', object.name);
    image.addEventListener('click', eventHandler);
    display.appendChild(image);
    object.displayCount++;
    console.log(displayedImages);
  }
}

function eventHandler() {
  if (counter < 24) {
    var selected = event.target;
    console.log(selected);
    console.log(selected.id);
    clicker(selected.id);
    counter ++;
    lastShown = displayedImages;
    displayedImages = [];
    document.getElementById('display').innerHTML = '';
    randomImages(imagesArray.length);
    render();
    console.log(selected.clickCount);
  } else {
    document.getElementById('display').innerHTML = '';
    var ul = document.createElement('ul');
    document.body.appendChild(ul);
    for (var x = 0; x < imagesArray.length; x++){
      var li = document.createElement('li');
      li.innerHTML = imagesArray[x].name + ' was clicked ' + imagesArray[x].clickCount + ' times and was clicked ' + Math.floor(imagesArray[x].clickCount/imagesArray[x].displayCount * 100) + ' percent of times displayed';
      list.appendChild(li);
    }
  }
}

render();
