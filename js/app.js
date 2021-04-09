'use strict';

let productsNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let imageSection = document.getElementById('imageSection');
let resultsButton = document.getElementById('resultsButton');
let uniqueArray = [];
let index;
let attempts =25;
let counter = 0;
let randomVariable=Math.floor(Math.random() * (7 - 2) + 2);

/////////////////////////////////////////Constructor Fun //////////////////////////
function BusMall(name, views, likes) {
  this.name = name;
  this.views = views;
  this.likes = likes;
  this.path = `./img/assets/${name}`;
  BusMall.productsImg.push(this);
}

///////////////////////////////////creat Array of object Imgs ///////////////////////////////
BusMall.productsImg = [];

for (let i = 0; i < productsNames.length; i++) {
  new BusMall(productsNames[i], 0, 0);
}
console.log(BusMall.productsImg);

if(JSON.parse(localStorage.getItem('productImages'))){
  BusMall.productsImg=JSON.parse(localStorage.getItem('productImages'));
}

////////////////////////////// fun to display Random unique Imgs /////////////////////////////
function randomNum(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomImage(image,index) {

  let randomImage = BusMall.productsImg[index];
  image.src = randomImage.path;
  image.title = randomImage.name;
  image.alt = randomImage.name;
  BusMall.productsImg[index].views++;
}


function uniqueImage() {
  imageSection.innerHTML='';
  console.log(uniqueArray);
  for(let i=0;i<randomVariable;i++){
    do {
      index = randomNum(BusMall.productsImg.length - 1, 0);
    }while(uniqueArray.includes(index));
    uniqueArray.push(index);
    let image=document.createElement('img');
    imageSection.appendChild(image);
    randomImage(image,index);
  }
  if(uniqueArray.length>randomVariable){
    uniqueArray.splice(0,randomVariable);
  }
  console.log(uniqueArray,randomVariable);
}

uniqueImage();

//////////////////////////////// trace click(event listener)//////////////////////////
alert('Please Choose an Image');

imageSection.addEventListener('click', imageCount);

function imageCount(event) {

  for (let i = 0; i < BusMall.productsImg.length; i++) {
    if (event.target.title === BusMall.productsImg[i].name) {
      BusMall.productsImg[i].likes++;
    }
  }
  counter++;


  uniqueImage();

  if (counter === attempts) {

    imageSection.removeEventListener('click', imageCount);
    let button = document.createElement('button');
    resultsButton.appendChild(button);
    button.textContent = 'Results';

    resultsButton.addEventListener('click', resultDisplay);

    localStorage.setItem('productImages', JSON.stringify(BusMall.productsImg));
  }
}

//////////////////////////////////// Rsult Button listener Fun////////////////////////////////
function resultDisplay() {

  let views = [];
  let likes = [];

  for (let i = 0; i < BusMall.productsImg.length; i++) {
    views.push(BusMall.productsImg[i].views);
    likes.push(BusMall.productsImg[i].likes);
  }
  let ctx = document.getElementById('myChart');

  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'views',
        data: views,
        backgroundColor: 'RGBA(104, 17, 43, 1)',
      },
      {
        label: 'votes',
        data: likes,
        backgroundColor: 'RGBA(227, 133, 135, 1)',
      }],

      labels: productsNames,
    },
    options: {
      legend: {
        labels: {
          fontColor: 'white',
          fontSize: 16
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: 'white',
            fontSize: 14,
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 1,
            fontColor: 'white',
            fontSize: 14,
          }
        }]
      }
    }
  });
}



