var imagesArray = [];
var chartLabels = [];
var chartClickData = [];
var chartDisplayData = [];
// var clickPercent = []; // trying to figure out the percentages
var displayedImages = [];
var lastShown = [];
var counter = 0;
var list = document.getElementById('list');

if(localStorage.chartClickData){
  chartClickData = localStorage.chartClickData.split(',');
  counter = 24;
} else {
  chartClickData = [];
}

//object constructor
function ImageOption(name, path){
  this.name = name;
  this.path = path;
  this.clickCount = 0;
  this.displayCount = 0;
  imagesArray.push(this);
}

new ImageOption('bag', 'img/bag.jpg');
new ImageOption('banana', 'img/banana.jpg');
new ImageOption('bathroom', 'img/bathroom.jpg');
new ImageOption('boots', 'img/boots.jpg');
new ImageOption('breakfast', 'img/breakfast.jpg');
new ImageOption('bubblegum', 'img/bubblegum.jpg');
new ImageOption('chair', 'img/chair.jpg');
new ImageOption('cthulhu', 'img/cthulhu.jpg');
new ImageOption('dog-duck', 'img/dog-duck.jpeg');
new ImageOption('dragon', 'img/dragon.jpg');
new ImageOption('pen', 'img/pen.jpg');
new ImageOption('pet-sweep', 'img/pet-sweep.jpg');
new ImageOption('scissors', 'img/scissors.jpg');
new ImageOption('shark', 'img/shark.jpg');
new ImageOption('sweep', 'img/sweep.png');
new ImageOption('tauntaun', 'img/tauntaun.jpg');
new ImageOption('unicorn', 'img/unicorn.jpg');
new ImageOption('usb', 'img/usb.gif');
new ImageOption('water-can', 'img/water-can.jpg');


//generates array of three random images
function randomImages(max){
  for (var i =0; i<3; i++){
    displayedImages.push(imagesArray[Math.floor(Math.random() * max)]);
  }
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

//renders the three images, creates an image tag with class, src and id attributes
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

function creatList(){
  document.getElementById('display').innerHTML = '';
  var ul = document.createElement('ul');
  document.body.appendChild(ul);
  for (var x = 0; x < imagesArray.length; x++){
    var li = document.createElement('li');
    li.innerHTML = imagesArray[x].name + ' was clicked ' + imagesArray[x].clickCount + ' times and was clicked ' + Math.floor(imagesArray[x].clickCount/imagesArray[x].displayCount * 100) + ' percent of times displayed';
    list.appendChild(li);
  }
}

function getChartData(){
  for(var n = 0; n < imagesArray.length; n++){
    chartLabels.push(imagesArray[n].name);
    chartClickData.push(imagesArray[n].clickCount);
    chartDisplayData.push(imagesArray[n].displayCount);
  }
}

function buildChart(){
  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');

  var myChart = new Chart(ctx, { //i don't know how to kill this linter error....
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'times images chosen',
        data: chartClickData,
        backgroundColor: 'blue',
      }]
    },
    options: {
      scales:{
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

//what happens everytime you click? This happens. clicker is triggered, counter is added to, sets the last shown images as the current images, then clears teh current images. Clears the page, renders new random images.
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
    creatList();
    getChartData();
    buildChart();
    save();
  }
}

if (counter < 24) {
  render();
} else {
  creatList();
  getChartData();
  buildChart();

}

function save() {
  localStorage.chartClickData = chartClickData;
  console.log(chartClickData);
}
