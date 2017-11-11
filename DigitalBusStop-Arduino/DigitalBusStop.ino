
void setup() {
Serial.begin(9600); // initialize serial communication
pinMode(12, OUTPUT); // initialize the blue LED pin as an output
pinMode(11, OUTPUT); // initialize the red LED pin as an output
pinMode(10, OUTPUT); // initialize the green LED pin as an output

}


void loop() {
if (Serial.available() > 0) { // see if there's incoming serial data
 int inByte = Serial.read();   // read it
 
Serial.write(inByte);
if (inByte == 82) { // if bus is 5 minutes away, should be RED
digitalWrite(11, HIGH); // turn on the red LED by the amount of increase
} else {digitalWrite(11, LOW);};

if ( inByte == 71) { // if bus is 10 minutes away, should be GREEN
digitalWrite(10, HIGH); // 
} else {digitalWrite(10, LOW);};

if (inByte == 66 ) { // if bus is 15 minutes away, should be BLUE
 digitalWrite(12, HIGH); // turn on the red LED by the amount of increase
} else {digitalWrite(12, LOW);};}

}
