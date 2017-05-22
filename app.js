var imagesArray = [];

//object constructor
function ImageOption(name, path){
  this.name=name;
  this.path=path;
  this.clicked=0;
  this.displayed=0;
  imagesArray.push(this);
}
