var serial;                                 // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // the name of the port that is connected to the arduino
var inData;                                 // for incoming serial data

var sendURL = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=504&s=6593';//URL of the API
var tSize = 500; 

//trying out some API calls here
var minutesTilNext;

//var greenLED;
//var redLED;
//var blueLED;
//Didn't end up needing these

var pollingRate = 2500;//how often it checks the API? I think that's what this is
var lastCheck = 0;

var myFont;

function preload() {
myFont = loadFont('BarlowCondensed-Thin.ttf');
}
//The font I want to use!

function setup() {
    createCanvas(windowWidth, windowHeight);
	 loadJSON(sendURL,ttcData); //run the ttc function on the following JSON data
    serial = new p5.SerialPort();    // make a new instance of the serialport library
    serial.on('data', serialEvent);  // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.open(portName);           // open a serial port
}

function ttcData(ttcInfo)
{
    minutesTilNext = ttcInfo.predictions.direction.prediction[0].minutes;//calling on the minutes in this structure of the API

    fill('#fffef9');
    noStroke();
    textAlign(CENTER);
    textFont(myFont);
    textSize(tSize);
    text(minutesTilNext,windowWidth/2,(windowHeight/2)+(tSize/4));

}


function draw()
{


    console.log(serial.write);

 if(millis()-lastCheck>=pollingRate)
 {
	 loadJSON(sendURL,ttcData); //run the ttc function on the following JSON data
 	lastCheck=millis();
 }



 //if the bus is close, red LED TURNS ON
 if (minutesTilNext<=5)
{
serial.write('R');//This is sent to Arduino as 82, because R gets translated to its number equivalent in ASCII 
background('#db3d3b');//red background on screen

fill('#fffef9');
    noStroke();
    textAlign(CENTER);
    textFont(myFont);
    textSize(tSize);
    text(minutesTilNext,windowWidth/2,(windowHeight/2)+(tSize/4));
}


//if the bus is around 10 minutes away, green LED TURNS ON
else if ((minutesTilNext > 5) && (minutesTilNext < 10))
{
    serial.write('G');//This is sent to Arduino as 71 in ASCII
    background('#40e598');

    fill('#fffef9');
    noStroke();
    textAlign(CENTER);
    textFont(myFont);
    textSize(tSize);
    text(minutesTilNext,windowWidth/2,(windowHeight/2)+(tSize/4));

}

//if the bus is around 15 minutes away, blue LED TURNS ON
else if ((minutesTilNext > 10) && (minutesTilNext < 15))
{
    serial.write('B');//This is sent to Arduino as 66 in ASCII
    background('#177dd6');

    fill('#fffef9');
    noStroke();
    textAlign(CENTER);
   textFont(myFont);
    textSize(tSize);
    text(minutesTilNext,windowWidth/2,(windowHeight/2)+(tSize/4));
}


//LEDs OFF if the bus is more than 15 minutes away, or the API stops sending data
else
{
serial.write(0);

 background('#e2e2e2');

    fill(255);
    noStroke();
    textAlign(CENTER);
    textFont(myFont);
    textSize(70);
    text("Bus is more than 15 minutes away",windowWidth/2,(windowHeight/2)+(tSize/8));

}
minutesTilNext>=15;
       fill(255);
    noStroke();
    textSize(50);
   //  textFont(myFont);
    textAlign(CENTER);
    text("Minutes to next 504 bus:",windowWidth/2,(windowHeight/80)+(tSize/4));
}


//functions to see information regarding the arduino connection 
function serialEvent() {
    // read a byte from the serial port:
    var inByte = serial.read();
    // store it in a global variable:
    inData = inByte;
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}





