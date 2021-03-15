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

function randomImage(){
    
    const firstIndex=randomNum(BusMall.productsImg.length-1,0);
    const firstRandomImage=BusMall.productsImg[firstIndex];
    firstImage.src=firstRandomImage.path;
    firstImage.title=firstRandomImage.name;
    firstImage.alt=firstRandomImage.name;
    firstRandomImage.views++;
    console.log(firstImage,firstRandomImage);
    
    const secondIndex=randomNum(BusMall.productsImg.length-1,0);
    
   if(secondIndex != firstIndex){
    const secondRandomImg=BusMall.productsImg[secondIndex];
    secondImage.src=secondRandomImg.path;
    secondImage.title=secondRandomImg.name;
    secondImage.alt=secondImage.name;
    secondRandomImg.views++;
    console.log(secondImage,secondRandomImg); 
    }

    const thirdIndex=randomNum(BusMall.productsImg.length-1,0);
    
    if(thirdIndex!=secondIndex && thirdIndex!=firstIndex){
    const thirdRandomImage=BusMall.productsImg[thirdIndex];
    thirdImage.src=thirdRandomImage.path;
    thirdImage.title=thirdRandomImage.name;
    thirdImage.alt=thirdRandomImage.name;
    thirdRandomImage.views++;
    console.log(thirdImage,thirdRandomImage);
    }
}

randomImage();


//////////////////////////////// trace click(event lesten)//////////////////////////
     
let userAlert=alert('Please Choose an image');
let resultsButton=document.getElementById('resultsButton');

let attempts = 25;

let counter=0;
imageSection.addEventListener('click',imageCount)

function imageCount(event){ 
    
    if(event.target.id ==='firstImage' || event.target.id === 'secondImage'|| event.target.id === 'thirdImage'){
         for (let i=0; i<BusMall.productsImg.length;i++){
            if(BusMall.productsImg[i].name === event.target.title){
                BusMall.productsImg[i].likes++;
                counter++;
                console.table(BusMall.productsImg[i]);

            }
        }
    }

    randomImage();

    if(counter===attempts){

        imageSection.removeEventListener('click',imageCount);
        let button=document.createElement('button');
        resultsButton.appendChild(button);
        button.textContent='Results';
        resultsButton.addEventListener('click',resultDesplay);
    
        function resultDesplay(event){

            let list=document.getElementById('list');
            let unorderedlist=document.createElement('ul');
            list.appendChild(unorderedlist);
            
            for(let i=0; i< BusMall.productsImg.length; i++){
                
                let listItem=document.createElement('li');
                unorderedlist.appendChild(listItem); 
                listItem.textContent= BusMall.productsImg[i].name +' had '+ BusMall.productsImg[i].likes+' votes, and was seen '+ BusMall.productsImg[i].views+' times' ;
            }
        }
    }
}

    
    
    
   
    

