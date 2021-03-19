'use strict';

let productsNames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let imageSection = document.getElementById('imageSection');
let firstImage = document.getElementById('firstImage');
let secondImage = document.getElementById('secondImage');
let thirdImage = document.getElementById('thirdImage');
//console.log(secondImage);

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
console.log(BusMall.productsImg.length);



////////////////////////////// fun to display Random unique Imgs /////////////////////////////
function randomNum(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomImage(image, index) {

  let randomImage = BusMall.productsImg[index];
  //console.log(BusMall.productsImg[index]);
  image.src = randomImage.path;
  image.title = randomImage.name;
  image.alt = randomImage.name;
  //console.log(image);
  //randomImage.views++;
  BusMall.productsImg[index].views++;
  return randomImage;
}

let uniqueArray = [];
let firstIndex;
let secondIndex;
let thirdIndex;

function uniqueImage() {
  do {
    firstIndex = randomNum(BusMall.productsImg.length - 1, 0);
    secondIndex = randomNum(BusMall.productsImg.length - 1, 0);
    thirdIndex = randomNum(BusMall.productsImg.length - 1, 0);
  } while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex || uniqueArray.includes(firstIndex) || uniqueArray.includes(secondIndex) || uniqueArray.includes(thirdIndex));

  uniqueArray[0] = firstIndex;
  uniqueArray[1] = secondIndex;
  uniqueArray[2] = thirdIndex;
}

uniqueImage();
randomImage(firstImage, firstIndex);
randomImage(secondImage, secondIndex);
randomImage(thirdImage, thirdIndex);

//////////////////////////////// trace click(event listener)//////////////////////////
alert('Please Choose an Image');

let resultsButton = document.getElementById('resultsButton');

let attempts =25;
let counter = 0;


imageSection.addEventListener('click', imageCount);

function imageCount(event) {

  if (event.target.id === 'firstImage' || event.target.id === 'secondImage' || event.target.id === 'thirdImage') {
    for (let i = 0; i < BusMall.productsImg.length; i++) {
      if (event.target.title === BusMall.productsImg[i].name) {
        BusMall.productsImg[i].likes++;
        counter++;
      }
    }
  }

  uniqueImage();
  randomImage(firstImage, firstIndex);
  randomImage(secondImage, secondIndex);
  randomImage(thirdImage, thirdIndex);



  if (counter === attempts) {

    imageSection.removeEventListener('click', imageCount);
    let button = document.createElement('button');
    resultsButton.appendChild(button);
    button.textContent = 'Results';

    resultsButton.addEventListener('click', resultDisplay);

    localStorage.setItem('productImages', JSON.stringify(BusMall.productsImg));
    // console.log(typeof 'productImages');
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
  //console.table(views,likes);

  let ctx = document.getElementById('myChart');

  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'views',
        data: views,
        backgroundColor: 'RGBA(104, 17, 43, 1)',
        // 'RGBA(102, 29, 121, 1)','RGBA(104, 17, 43, 1)']
      },
      {
        label: 'votes',
        data: likes,
        backgroundColor: 'RGBA(227, 133, 135, 1)'
        // 'RGBA(220, 153, 205, 1)']
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

/////////////////////////////////////////// Local Storage Fun /////////////////////////////
function storageData() {

  for (let i = 0; i < productsNames.length; i++) {
    let storage = JSON.parse(localStorage.getItem('productImages'));
    if (storage !== null) {
      BusMall.productsImg[i].views = storage[i].views;
      BusMall.productsImg[i].likes = storage[i].likes;

    }
  }
}
storageData();


