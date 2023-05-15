let map = [],
  size=0,
  mine=0;


  
let voidSearvh=true;//Поиск пустоты при первом клике 
let findMine=0;//Найденные мины
let clockTime=0;

let intevalWork=true;//воркает ли интервал

let timer = setInterval(()=>{
  clockTime++;
  let m=Math.floor(clockTime/60),
    s=Math.floor(clockTime%60),
    time = document.querySelector('.timer');
  (m<10) ? m=`0${m}` : m=m;
  (s<10) ? s=`0${s}` : s=s;
  time.textContent=`${m}:${s}`;
  if (!intevalWork){
    timer.clearInteval;
  }
},1000)

window.addEventListener('DOMContentLoaded',function(){
  let createField = document.querySelector('.createField'),
    inputSize = document.querySelector('.input_size'),
    inputMine = document.querySelector('.input_mine'),
    btn = document.querySelector('.createField__btn'),
    mineField_mineZone = document.querySelector('.mineField-mineZone');

  

  btn.addEventListener('click', function(e){
    let state = true;
    if ((typeof(parseInt(inputSize.value))!='number') || isNaN(inputSize.value)|| (inputSize.value=='')||(parseInt(inputSize.value)<2)||(parseInt(inputSize.value)%1!=0)){
      inputSize.classList.add('error');
      state = false;
    } else {
      inputSize.classList.remove('error');
    }
    if ((typeof(parseInt(inputMine.value))!='number') ||((parseInt(inputMine.value))<1)||((parseInt(inputMine.value))>=inputSize.value*inputSize.value)|| isNaN(inputMine.value)|| (inputMine.value=='')||(parseInt(inputSize.value)<2)||(parseInt(inputSize.value)%1!=0)){
      inputMine.classList.add('error');
      state = false;
    } else {
      inputMine.classList.remove('error');
    }


    if (state){
      createField.style.display='none'; 
      let mineField_minezone = document.querySelector('.mineField-mineZone'),
        mineField_div_mine_div = document.querySelectorAll('.mineField-div-mine-div__text');
      mineField_minezone.classList.remove('displayNone');
      mineField_div_mine_div[0].classList.remove('displayNone');
      mineField_div_mine_div[1].classList.remove('displayNone');
      size=inputSize.value;
      mine=inputMine.value;
      clockTime=0;
      createMap()
    }

  })

  


})
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function createMap(){
  map=[],
    r=getRandomInt(3);
  for (let i = 0; i<size;i++){
    map.push([]);
    for (let j = 0; j<size; j++){
      map[i].push(['s','0']);
    }
  }

  console.log(map);
  for (let m = mine; m>0; m--){
    neadI=getRandomInt(size)
    neadJ=getRandomInt(size)
    for (let i = 0; i<size;i++){
      if (i==neadI){
        for (let j = 0; j<size; j++){
          if (j==neadJ){
            if (map[i][j][0]=='M'){
              m++;
            }
            map[i][j][0]='M';
          }
        }
        break
      }
    }
  }
  for (let i = 0; i<size;i++){
    for (let j = 0; j<size; j++){
      if (map[i][j][0]=='M'){
        continue
      }

      let colMines=0
      if (j+1<size&&(map[i][j+1][0]=='M')){
        colMines++;
      }
      if (j-1>=0&&(map[i][j-1][0]=='M')){
        colMines++;
      }
      if ((i+1<size)&&(map[i+1][j][0]=='M')){
        colMines++;

      }
      if((i-1>=0)&&(map[i-1][j][0]=='M')){
        colMines++;
      }
      if (i-1>=0&&j+1<size&&(map[i-1][j+1][0]=='M')){
        colMines++;
      }
      if (j-1>=0&&i+1<size&&(map[i+1][j-1][0]=='M')){
        colMines++;
      }
      if (j+1<size&&i+1<size&&(map[i+1][j+1][0]=='M')){
        colMines++;
      }
      if (j-1>=0&&i-1>=0&&(map[i-1][j-1][0]=='M')){
        colMines++;
      }
      map[i][j][0]=colMines;



      if (map[i][j][0]==''){
        map[i][j][0]='0';
      }

    }
  }
  showMap()
  return (map)
}

function showMap(){
  let mineField = document.querySelector('.mineField'),
    MineLast=document.querySelector('.MineLast'),
    mineField_minezone = document.querySelector('.mineField-mineZone');
    mineField_minezone.remove();
    mineField_minezone = document.createElement('div');
    mineField_minezone.classList.add('mineField-mineZone');
    mineField.append(mineField_minezone);
  MineLast.textContent=mine-findMine;
  for (let i = 0; i<size;i++){
    let mzl = document.createElement('div')
    mzl.classList.add('mineField-mineZone-line')
    mineField_minezone.append(mzl)
    for (let j = 0; j<size; j++){
      if (map[i][j][1]=='M'){
        let imgMine = document.createElement('img');
        imgMine.setAttribute('src','data/img/mine.png');
        imgMine.classList.add('mineField-mineZone-line__item');
        mzl.append(imgMine);
      } else {
        let imgMine = document.createElement('img');
        imgMine.setAttribute('src',`data/img/${map[i][j][1]}.png`);
        imgMine.classList.add('mineField-mineZone-line__item');
        mzl.append(imgMine);

      } 
    }
  }
  let mineField_mineZone_line__item = document.querySelectorAll('.mineField-mineZone-line__item')
  mineField_mineZone_line__item.forEach((item,i)=>{
    item.addEventListener('click', function(e){
      clickZone(i)
    })
  })

  mineField_mineZone_line__item.forEach((item,i)=>{
    item.addEventListener('contextmenu', function(e){
      e.preventDefault();
      let neadI = Math.floor(((i)/size)),
        neadJ =Math.floor(i%size);
      if (map[neadI][neadJ][1]=='0'){
        map[neadI][neadJ][1]='F'
        findMine++;
      } else if (map[neadI][neadJ][1]=='F'){
          map[neadI][neadJ][1]='what'
          findMine--;
        } else if (map[neadI][neadJ][1]=='what'){
          map[neadI][neadJ][1]='0'
        }
      
      if (mine-findMine==0){
        let winStatus = true
        for (let i = 0; i<size;i++){
          for (let j = 0; j<size; j++){
            if (map[i][j][0]=='M' && map[i][j][1]!='F'){
              winStatus=false
            }
          }
        }
        console.log(winStatus);

        if (winStatus){
          let win = document.querySelector('.win'),
            winMineCol=document.querySelector('.winMineCol'),
            winTime=document.querySelector('.winTime');
            win.classList.remove('displayNone');
          
          intevalWork=!intevalWork;
  
          let m=Math.floor(clockTime/60),
            s=Math.floor(clockTime%60),
            timer = document.querySelector('.timer');
          (m<10) ? m=`0${m}` : m=m;
          (s<10) ? s=`0${s}` : s=s;
          clockTime=`${m}:${s}`;//clockTime
          winTime.textContent=clockTime;
          winMineCol.textContent= findMine;
  
          if (mine-findMine==0){
            let win = true
            for (let i = 0; i<size;i++){
              for (let j = 0; j<size; j++){
                if (map[i][j][0]=='M' && map[i][j][1]!='F'){
                  win=false
                }
              }
            }
            console.log(win);
          }
  
          mineField_div_mine_div = document.querySelectorAll('.mineField-div-mine-div__text');
          mineField_div_mine_div[0].classList.add('displayNone');
          mineField_div_mine_div[1].classList.add('displayNone');
          showMapAll()

        } else {
          
          showMap()
        }
      } else {
        
        showMap()
      }
    })
  })

}

function clickZone(i){
  if (voidSearvh){
    findMine=0;
    let neadI = Math.floor(((i)/size)),
      neadJ =Math.floor(i%size);
    if (map[neadI][neadJ][0]=='0'){
      if (neadI%size==0){
      }
      console.log(neadI);
      if ((map[neadI][neadJ][1]=='0')||(map[neadI][neadJ][1]=='M')||(map[neadI][neadJ][1]=='F')||(map[neadI][neadJ][1]=='what')){
        if ((map[neadI][neadJ][0]!='M')){
          if (map[neadI][neadJ][0]=='0'){
            map[neadI][neadJ][0]='open'
            clearVoid(neadI,neadJ);
          }
          map[neadI][neadJ][1]=map[neadI][neadJ][0];
        } else {
          map[neadI][neadJ][1]=map[neadI][neadJ][0];//m

        }
        voidSearvh=false
        showMap()
      }
      
    } else {
      createMap();
      clickZone(i);
    }
    
  } else {
    
    let neadI = Math.floor(((i)/size)),
    neadJ =Math.floor(i%size);
    if (neadI%size==0){
    }
    console.log(neadI);
    if ((map[neadI][neadJ][1]=='0')||(map[neadI][neadJ][1]=='M')||(map[neadI][neadJ][1]=='F')){
      if ((map[neadI][neadJ][0]!='M')){
        if (map[neadI][neadJ][0]=='0'){
          map[neadI][neadJ][0]='open'
          clearVoid(neadI,neadJ);
        }
        map[neadI][neadJ][1]=map[neadI][neadJ][0];
        showMap();
      } else {
        map[neadI][neadJ][1]=map[neadI][neadJ][0];//m
        
        let louse = document.querySelector('.louse'),
          loseMineCol=document.querySelector('.loseMineCol'),
          loseTime=document.querySelector('.loseTime');
        louse.classList.remove('displayNone');
        
        intevalWork=!intevalWork;

        let m=Math.floor(clockTime/60),
          s=Math.floor(clockTime%60),
          timer = document.querySelector('.timer');
        (m<10) ? m=`0${m}` : m=m;
        (s<10) ? s=`0${s}` : s=s;
        clockTime=`${m}:${s}`;//clockTime
        loseTime.textContent=clockTime;
        loseMineCol.textContent= findMine;

        if (mine-findMine==0){
          let win = true
          for (let i = 0; i<size;i++){
            for (let j = 0; j<size; j++){
              if (map[i][j][0]=='M' && map[i][j][1]!='F'){
                win=false
              }
            }
          }
          console.log(win);
        }

        mineField_div_mine_div = document.querySelectorAll('.mineField-div-mine-div__text');
        mineField_div_mine_div[0].classList.add('displayNone');
        mineField_div_mine_div[1].classList.add('displayNone');
        showMapAll()
      }
    }
  }
}

function showMapAll(){
  let mineField = document.querySelector('.mineField'),
    mineField_minezone = document.querySelector('.mineField-mineZone');
    mineField_minezone.remove();
    mineField_minezone = document.createElement('div');
    mineField_minezone.classList.add('mineField-mineZone');
    mineField.append(mineField_minezone);
  for (let i = 0; i<size;i++){
    let mzl = document.createElement('div')
    mzl.classList.add('mineField-mineZone-line')
    mineField_minezone.append(mzl)
    for (let j = 0; j<size; j++){
      if (map[i][j][0]=='M'){
        let imgMine = document.createElement('img');
        imgMine.setAttribute('src','data/img/mine.png');
        imgMine.classList.add('mineField-mineZone-line__item');
        mzl.append(imgMine);
      } else {
        let imgMine = document.createElement('img');
        imgMine.setAttribute('src',`data/img/${map[i][j][0]}.png`);
        imgMine.classList.add('mineField-mineZone-line__item');
        mzl.append(imgMine);

      } 
    }
  }
}


function clearVoid(i,j){
  if ((i-1>=0 && map[i-1][j][0]=='0')){
    map[i-1][j][1]='open';
    map[i-1][j][0]='open';
    clearVoid(i-1,j);
  }
  if ((i-1>=0 &&j+1<size&& map[i-1][j+1][0]=='0')){
    map[i-1][j+1][1]='open';
    map[i-1][j+1][0]='open';
    clearVoid(i-1,j+1);
  }
  if ((i &&j+1<size&& map[i][j+1][0]=='0')){
    map[i][j+1][1]='open';
    map[i][j+1][0]='open';
    clearVoid(i,j+1);
  }
  if ((i+1<size&&j+1<size&& map[i+1][j+1][0]=='0')){
    map[i+1][j+1][1]='open';
    map[i+1][j+1][0]='open';
    clearVoid(i+1,j+1);
  }
  if ((i+1<size&&j<size&& map[i+1][j][0]=='0')){
    map[i+1][j][1]='open';
    map[i+1][j][0]='open';
    clearVoid(i+1,j);
  }
  if ((i+1<size&&j-1>=0&& map[i+1][j-1][0]=='0')){
    map[i+1][j-1][1]='open';
    map[i+1][j-1][0]='open';
    clearVoid(i+1,j-1);
  }
  if ((i<size&&j-1>=0&& map[i][j-1][0]=='0')){
    map[i][j-1][1]='open';
    map[i][j-1][0]='open';
    clearVoid(i,j-1);
  }
  if ((i-1>=0&&j-1>=0&& map[i-1][j-1][0]=='0')){
    map[i-1][j-1][1]='open';
    map[i-1][j-1][0]='open';
    clearVoid(i-1,j-1);
  }
  //!!!
  if ((i-1>=0 && map[i-1][j][0]!='0')&&(i-1>=0 && map[i-1][j][0]!='M')&&(i-1>=0 && map[i-1][j][0]!='F')){
    map[i-1][j][1]=map[i-1][j][0];
  }
  if ((i-1>=0 &&j+1<size&& map[i-1][j+1][0]!='0')&&(i-1>=0 &&j+1<size&& map[i-1][j+1][0]!='M')&&(i-1>=0 &&j+1<size&& map[i-1][j+1][0]!='F')){
    map[i-1][j+1][1]=map[i-1][j+1][0];
  }
  if ((i &&j+1<size&& map[i][j+1][0]!='0')&&(i &&j+1<size&& map[i][j+1][0]!='M')&&(i &&j+1<size&& map[i][j+1][0]!='F')){
    map[i][j+1][1]=map[i][j+1][0];
  }
  if ((i+1<size&&j+1<size&& map[i+1][j+1][0]!='0')&&(i+1<size&&j+1<size&& map[i+1][j+1][0]!='M')&&(i+1<size&&j+1<size&& map[i+1][j+1][0]!='F')){
    map[i+1][j+1][1]=map[i+1][j+1][0];
  }
  if ((i+1<size&&j<size&& map[i+1][j][0]!='0')&&(i+1<size&&j<size&& map[i+1][j][0]!='M')&&(i+1<size&&j<size&& map[i+1][j][0]!='F')){
    map[i+1][j][1]=map[i+1][j][0];
  }
  if ((i+1<size&&j-1>=0&& map[i+1][j-1][0]!='0')&&(i+1<size&&j>=0&& map[i+1][j-1][0]!='M')&&(i+1<size&&j>=0&& map[i+1][j-1][0]!='F')){
    map[i+1][j-1][1]=map[i+1][j-1][0];
  }
  if ((i<size&&j-1>=0&& map[i][j-1][0]!='0')&&(i<size&&j>=0&& map[i][j-1][0]!='M')&&(i<size&&j>=0&& map[i][j-1][0]!='F')){
    map[i][j-1][1]=map[i][j-1][0];
  }
  if ((i-1>=0&&j-1>=0&& map[i-1][j-1][0]!='0')&&(i-1>=0&&j-1>=0&& map[i-1][j-1][0]!='M')&&(i-1>=0&&j-1>=0&& map[i-1][j-1][0]!='F')){
    map[i-1][j-1][1]=map[i-1][j-1][0];
  }



}