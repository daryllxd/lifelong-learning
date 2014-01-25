## Light ‘Em Up

	int ledPin = 10;
	void setup() {
	         pinMode(ledPin, OUTPUT);
	}
	void loop() {
	        digitalWrite(ledPin, HIGH);
	        delay(1000);
	        digitalWrite(ledPin, LOW);
	        delay(1000);
	}

An Arduino sketch must have a setup() and loop() function, otherwise it will not work. The setup() function runs once and once only at the start of the program and is where you will issue general instructions to prepare the program before the main loop runs, such as setting up pin modes, setting serial baud rates, etc. Basically, a function is a block of code assembled into one convenient block.

Our setup function only has one statement and that is pinMode. Here we are telling the Arduino that we want to set the mode of one of our digital pins to be output mode, rather than input. Within the parenthesis, we put the pin number and the mode (OUTPUT or INPUT). Our pin number is ledPin, which has been previously set to the value 10 in our program. Therefore, this statement is simply telling the Arduino that the digital pin 10 is to be set to OUTPUT mode.

The loop() function is the main program function and is called continuously as long as our Arduino is turned on. Every statement within the loop() function (within the curly braces) is carried out, one by one, step by step, until the bottom of the function is reached; then, the Arduino starts the loop again at the top of the function, and so on forever, or until you turn the Arduino off or press the Reset switch.

In this project, we want the LED to turn on, stay on for one second, turn off and remain off for one second, and then repeat.

	digitalWrite(ledPin, HIGH);

This writes a HIGH or a LOW value to the digital pin within the statement (in this case ledPin, which is digital pin 10). When you set a digital pin to HIGH, you are sending out 5 volts to that pin. When you set it to LOW, the pin becomes 0 volts, or ground. This statement therefore sends out 5v to digital pin 10 and turns the LED on.


























