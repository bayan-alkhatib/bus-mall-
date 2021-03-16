'use strict';

let productsNames=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg',
'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

let imageSection=document.getElementById('imageSection');
let firstImage=document.getElementById('firstImage');
let secondImage=document.getElementById('secondImage');
let thirdImage=document.getElementById('thirdImage');
//console.log(secondImage);

/////////////////////////////////////////Constructor Fun //////////////////////////
function BusMall(name){
    this.name=name;
    this.views=0;
    this.likes=0;
    this.path=`./img/assets/${name}`;
    BusMall.productsImg.push(this);
}

///////////////////////////////////creat Array of object Imgs ///////////////////////////////
BusMall.productsImg=[];

for(let i=0;i<productsNames.length;i++){
        new BusMall(productsNames[i]);
}

//console.table(BusMall.productsImg);

////////////////////////////// fun to display Random unique Imgs /////////////////////////////
function randomNum(max,min){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function randomImage(image,index){

  let randomImage=BusMall.productsImg[index];
  //console.log(BusMall.productsImg[index]);
  image.src=randomImage.path;
  image.title=randomImage.name;
  image.alt=randomImage.name;
  //console.log(image);
  randomImage.views++;
  return randomImage;
}

let uniqueArray=[];
let firstIndex;
let secondIndex;
let thirdIndex;
  
function uniqueImage(){
    do{
        firstIndex=randomNum(BusMall.productsImg.length-1,0);
        secondIndex=randomNum(BusMall.productsImg.length-1,0);
        thirdIndex=randomNum(BusMall.productsImg.length-1,0);
    } while(firstIndex===secondIndex || firstIndex === thirdIndex || secondIndex=== thirdIndex || uniqueArray.includes(firstIndex) || uniqueArray.includes(secondIndex)  || uniqueArray.includes(thirdIndex))
   
    
    uniqueArray[0]= firstIndex;
    uniqueArray[1]= secondIndex;
    uniqueArray[2]= thirdIndex;
}

uniqueImage();
randomImage(firstImage,firstIndex);
randomImage(secondImage,secondIndex);
randomImage(thirdImage,thirdIndex);

//////////////////////////////// trace click(event lesten)//////////////////////////
     
let userAlert=alert('Please Choose an Image');

let resultsButton=document.getElementById('resultsButton');


let attempts = 25;
let counter=0;
let views=[];
let likes=[];

imageSection.addEventListener('click',imageCount);

function imageCount(event){ 
    
    if(event.target.id ==='firstImage' || event.target.id === 'secondImage'|| event.target.id === 'thirdImage'){
         for (let i=0; i<BusMall.productsImg.length;i++){
            if( event.target.title === BusMall.productsImg[i].name ){
                BusMall.productsImg[i].likes++;
                counter++;
                views.push( BusMall.productsImg[i].views);
                likes.push( BusMall.productsImg[i].likes);
                //console.table(views,likes);
            }
        }
    }

    uniqueImage();
    randomImage(firstImage,firstIndex);
    randomImage(secondImage,secondIndex);
    randomImage(thirdImage,thirdIndex);
   
    localStorage.setItem('productImages',JSON.stringify( BusMall.productsImg));
    storageData ();

    if(counter===attempts){

        imageSection.removeEventListener('click',imageCount);
        let button=document.createElement('button');
        resultsButton.appendChild(button);
        button.textContent='Results';
        resultsButton.addEventListener('click',resultDesplay);
    
        function resultDesplay(event){
           
            let ctx = document.getElementById('myChart');

                let myChart = new Chart(ctx,{
                    type: 'bar',
                    data: {
                        datasets: [{
                            label: 'views',
                            data: views,
                            backgroundColor:'RGBA(102, 29, 121, 1)'
                            // 'RGBA(102, 29, 121, 1)','RGBA(104, 17, 43, 1)']
                        },
                        {
                            label: 'votes',
                            data: likes,
                            backgroundColor:'RGBA(220, 153, 205, 1)'
                            // ,'RGBA(227, 133, 135, 1)']  
                        }],
                        labels:productsNames,
                    },
                    options: {
                        labels: {
                        fontColor: 'white',
                        }
                    }
                })
        }
    }
}
  
function  storageData (){
    let storage=localStorage.getItem('productImages');
    storage=JSON.parse(storage);
    storage.views++;
    storage.likes++;
    console.log(storage);
    return storage;
}           


   