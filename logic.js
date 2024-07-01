window.addEventListener('load',bindevent);

var buttons;

function bindevent(){
     buttons = document.getElementsByTagName('button');
    //  console.log(buttons);

for(var i = 0; i<buttons.length; i++){
    var currentbutton = buttons[i];
    currentbutton.addEventListener('click',printxorzero);
    }
}

function isnotblank(currentbutton){
    return currentbutton.innerText.trim().length>0
}

function isthreesame(first,second,third){
    if(isnotblank(first) && isnotblank(second) && isnotblank(third)){
        return first.innerText == second.innerText && first.innerText == third.innerText;
    }
    else{
        return false;
    }
}

function isgameover(){
     return isthreesame(buttons[0],buttons[1],buttons[2])
    ||  isthreesame(buttons[0],buttons[3],buttons[6])
    ||  isthreesame(buttons[3],buttons[4],buttons[5])
    ||  isthreesame(buttons[6],buttons[7],buttons[8])
    ||  isthreesame(buttons[1],buttons[4],buttons[7])
    ||  isthreesame(buttons[2],buttons[5],buttons[8])
    ||  isthreesame(buttons[0],buttons[4],buttons[8])
    ||  isthreesame(buttons[2],buttons[4],buttons[6])
}

function reset(){
    clearInterval(interval); //to stop interval after 5 sec
    blocked = false;
    count = 0;
    flag =  true;
    countdownvalue = 5;
    for(var i = 0; i<buttons.length; i++){
        buttons[i].innerText = '';
    }
    document.getElementById('output').innerText = '';
}

var countdownvalue = 5;
var interval;
function countdown(){
    interval = setInterval(function() {
        countdownvalue--;
        document.getElementById('Output').innerText = `Game Over and Reset After ${countdownvalue} sec`;
    }, 1000);
}

function resetafter5sec(){
    countdown();
    // clearInterval(interval); //to stop interval aftr 5 sec
    setTimeout(function(){
        reset();
    },5000);
    console.log("Doing something else");
    //new thread open for set time and main thread continues
}

var flag = true;
var count = 0;
var blocked = false;
function printxorzero(){
    if(!blocked && this.innerText.trim().length==0){
        count++;

        var buttonvalue = flag?"X":"0";
        this.innerText = buttonvalue;
        flag = !flag;

        
        if (count >= 5){
            if(isgameover()){
                blocked = true;
                document.getElementById('Output').innerText = `Player ${buttonvalue} wins! 
                Game Over and Reset After 5 sec`;
                resetafter5sec();
                //  alert("Game Over and Reset after 5 second")
            }
        }
    }
} 

//maintain a count, to check id count goes 
//>4 then check game over condition
// if(count>4){
//     function isgameover(){

        // game over conditions
        // 1. row values are same
        // 2. col values are same 
        // 3. diagonal values are same
    // }
    // }



