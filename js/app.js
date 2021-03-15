'use strict';

let productsNames=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg',
'dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

let imageSection=document.getElementById('imageSection')
let firstImage=document.getElementById('firstImage');
let secondImage=document.getElementById('secondImage');
let thirdImage=document.getElementById('thirdImage');

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

console.table(BusMall.productsImg);

////////////////////////////// fun to display Random Imgs /////////////////////////////
function randomNum(max,min){
    return Math.floor(Math.random()*(max-min+1)+min)
}

let uniqueIteration=[0,0,0];
let secondIndex=0;
let thirdIndex=0;
function randomImage(){
    
    let firstIndex=randomNum(BusMall.productsImg.length-1,0);
    if(uniqueIteration[0]===firstIndex || uniqueIteration[0]===secondIndex || uniqueIteration[0]===thirdIndex ){
        firstIndex=randomNum(BusMall.productsImg.length-1,0);
    };
    let  firstRandomImage=BusMall.productsImg[firstIndex];
    firstImage.src=firstRandomImage.path;
    firstImage.title=firstRandomImage.name;
    firstImage.alt=firstRandomImage.name;
    firstRandomImage.views++;
    uniqueIteration.splice(0,1,firstIndex);
    
     secondIndex=randomNum(BusMall.productsImg.length-1,0);
    if(uniqueIteration[1]===firstIndex || uniqueIteration[1]===secondIndex || uniqueIteration[1]===thirdIndex){
        secondIndex=randomNum(BusMall.productsImg.length-1,0);
    };
    if(secondIndex != firstIndex){
    let secondRandomImg=BusMall.productsImg[secondIndex];
    secondImage.src=secondRandomImg.path;
    secondImage.title=secondRandomImg.name;
    secondImage.alt=secondImage.name;
    secondRandomImg.views++;
    uniqueIteration.splice(1,1,secondIndex);
    
    // console.log(secondImage,secondRandomImg); 
    }

     thirdIndex=randomNum(BusMall.productsImg.length-1,0);
    if(uniqueIteration[2]===firstIndex || uniqueIteration[2]===secondIndex || uniqueIteration[2]===thirdIndex){
        thirdIndex=randomNum(BusMall.productsImg.length-1,0);
    };
    if(thirdIndex!=secondIndex && thirdIndex!=firstIndex){
    let  thirdRandomImage=BusMall.productsImg[thirdIndex];
    thirdImage.src=thirdRandomImage.path;
    thirdImage.title=thirdRandomImage.name;
    thirdImage.alt=thirdRandomImage.name;
    thirdRandomImage.views++;
    uniqueIteration.splice(2,1,thirdIndex);
    
    // console.log(thirdImage,thirdRandomImage);
    }
}
    console.log(uniqueIteration);
    randomImage();


//////////////////////////////// trace click(event lesten)//////////////////////////
     
let userAlert=alert('Please Choose an image');
let resultsButton=document.getElementById('resultsButton');

let attempts = 25;
let counter=0;
let views=[];
let likes=[];
imageSection.addEventListener('click',imageCount)

function imageCount(event){ 
    
    if(event.target.id ==='firstImage' || event.target.id === 'secondImage'|| event.target.id === 'thirdImage'){
         for (let i=0; i<BusMall.productsImg.length;i++){
            if( event.target.title === BusMall.productsImg[i].name ){
                BusMall.productsImg[i].likes++;
                counter++;
                views.push( BusMall.productsImg[i].views);
                likes.push( BusMall.productsImg[i].likes);
                console.table(views,likes);
            }
        }
    }

    
    randomImage();
    
    // while(event.target.id !=='firstImage' && event.target.id !== 'secondImage' && event.target.id !== 'thirdImage')
        

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
                            // this dataset is drawn below
                            backgroundColor:'RGBA(102, 29, 121, 1)'
                            // 'RGBA(102, 29, 121, 1)','RGBA(104, 17, 43, 1)']
                        },
                        {
                            label: 'votes',
                            data: likes,
                            // this dataset is drawn on top
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
  
            


   