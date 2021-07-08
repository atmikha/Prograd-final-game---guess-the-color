//list of colors
var colorsList = ["blue", "orange", "yellow", "green", "red"];

var MasterGameColoer=[];


//creating variable 
//for button clicked
//last button on row to determine the hints for each line set to zero so +4
//can be used to determine the last box
//is success is false also created into a variable 
var buttoncliked = 1;
var lastbuttonOnRow=0;
var loopStart=1;
var isSuccess=false;
setMasterColorCode();

//Random colors in the final answer 
//randomly pulls any 4 colors from the list of colors
function setMasterColorCode()
{
  MasterGameColoer[0] =  randomNumber(0,4);
  MasterGameColoer[1] =  randomNumber(0,4);
  MasterGameColoer[2] =  randomNumber(0,4);
  MasterGameColoer[3] =  randomNumber(0,4);
}

//function to reset master button 
//make it all white 
function resetMasterButton() {
  setMasterColorCode();
  setProperty("btnMaster1", "background-color", "white");
  setProperty("btnMaster2", "background-color", "white");
  setProperty("btnMaster3", "background-color", "white");
  setProperty("btnMaster4", "background-color", "white");
}

//function for on success colors to be displayed 
function onSuccess() {
  setProperty("btnMaster1", "background-color", colorsList[MasterGameColoer[0]]);
  setProperty("btnMaster2", "background-color", colorsList[MasterGameColoer[1]]);
  setProperty("btnMaster3", "background-color", colorsList[MasterGameColoer[2]]);
  setProperty("btnMaster4", "background-color", colorsList[MasterGameColoer[3]]);
}

//function for result analysis for the hint
//takes what the user inputs (colors)
//displays what colors are correct and which once arent
function resultAnalysis(btnName)
{
  var res="button"+ (lastbuttonOnRow + 4);
      
  if(btnName == res)
  {
    var isAllMatch=[];
    var colorCod=0;
      for(var i = loopStart; i <= (lastbuttonOnRow + 4); i++)
        {
          
          var btnColor=getProperty("button"+i, "background-color");
          var pos=colorsList.indexOf(btnColor);   
          if(btnColor == colorsList[MasterGameColoer[colorCod]])
            {
              setProperty("bv" + i, "background-color", "black");
              appendItem(isAllMatch, "T");
            }
            else
            {
              appendItem(isAllMatch, "F");
              if(MasterGameColoer.indexOf(pos) != -1)
              {
                setProperty("bv" + i, "background-color", "gray");
              }
            }
         colorCod +=1;   
      }
      //display answers on console just to check  
      lastbuttonOnRow = buttoncliked;
      loopStart=lastbuttonOnRow+1;
      console.log(isAllMatch);
      
      //diaplay if yhe user won or lost
      
      if(isAllMatch.indexOf("F")==-1)
        {
          isSuccess=true;
          onSuccess();
          setProperty("label2", "hidden", false);
          setText("label2","you won");
        }
        else{
          if(btnName=="button24" & isSuccess==false)
          {
            setProperty("label2", "hidden", false);
            setText("label2","you have failed");
            onSuccess();
          }
        }
   }
}

//trigger buttton upon clicking 
function mysteryColors(btnName,btntrigger) {
  if(buttoncliked<25){
      setProperty(btnName, "background-color", getProperty(btntrigger, "background-color"));
  }
}

//function to reset the entire game
function reset() {
   for (var i = 1; i <= 24; i++) {
    setProperty("button"+i, "background-color","white");
    setProperty("bv"+i, "background-color","white");
  }
  buttoncliked=1;
  lastbuttonOnRow=0;
  loopStart=1;
  setProperty("label1", "hidden", true);
  isSuccess=false;
}

//green color to be displayed where it is supposed to upon clicking
//and conneceting to other function that reads the users value to display the hints
onEvent("btnGreen", "click", function( ) {
  if(buttoncliked<25 && isSuccess==false){
    mysteryColors("button"+buttoncliked,"btnGreen");
    resultAnalysis("button"+buttoncliked);
    buttoncliked+=1;
  }
});


//blue color to be displayed where it is supposed to upon clicking 
//and conneceting to other function that reads the users value to display the hints
onEvent("btnBlue", "click", function( ) {
  if(buttoncliked<25 && isSuccess==false){
    mysteryColors("button"+buttoncliked,"btnBlue");
    resultAnalysis("button"+buttoncliked);
    buttoncliked+=1;
  }
});


//yellow color to be displayed where it is supposed to upon clicking
//and conneceting to other function that reads the users value to display the hints
onEvent("btnYellow", "click", function( ) {
  if(buttoncliked<25 && isSuccess==false){
    mysteryColors("button"+buttoncliked,"btnYellow");
    resultAnalysis("button"+buttoncliked);
   buttoncliked+=1;
}
});


//red color to be displayed where it is supposed to upon clicking
//and conneceting to other function that reads the users value to display the hints
onEvent("btnRed", "click", function( ) {
  if(buttoncliked<25 && isSuccess==false){
    mysteryColors("button"+buttoncliked,"btnRed");
    resultAnalysis("button"+buttoncliked);
    buttoncliked+=1;
  }
});


//orange color to be displayed where it is supposed to upon clicking
//and conneceting to other function that reads the users value to display the hints
onEvent("btnOrange", "click", function() {
  if(buttoncliked<25 && isSuccess==false){
    mysteryColors("button"+buttoncliked,"btnOrange");
    resultAnalysis("button"+buttoncliked);
    buttoncliked+=1;
  }
});


//change screen from screen 1 to screen 2 
onEvent("start", "click", function( ) {
setScreen("screen2");
    
});


//on clicking the reset button, reset game
onEvent("btnReset", "click", function( ) {
  reset();
  resetMasterButton();
});