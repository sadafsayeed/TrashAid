#include <ArduinoJson.h>
#include <Servo.h>

// Define LED pins – adjust these pin numbers as needed
const int LED_RECYCLABLE = 2;  // LED for recyclable items
const int LED_COMPOST    = 3;  // LED for compost items
const int LED_LANDFILL   = 4;  // LED for landfill items

// Define servo pin and create a Servo object
const int SERVO_PIN = 9;
Servo myservo;

void setup() {
  // Start serial communication
  Serial.begin(9600);
  while (!Serial) {
    ; // Wait for the serial port to connect if needed
  }
  
  // Attach the servo and set its initial position (0 degrees)
  myservo.attach(SERVO_PIN);
  myservo.write(0);
  
  // Set LED pins as outputs
  pinMode(LED_RECYCLABLE, OUTPUT);
  pinMode(LED_COMPOST, OUTPUT);
  pinMode(LED_LANDFILL, OUTPUT);

  // Ensure all LEDs are initially turned off
  digitalWrite(LED_RECYCLABLE, LOW);
  digitalWrite(LED_COMPOST, LOW);
  digitalWrite(LED_LANDFILL, LOW);

  Serial.println("Arduino ready to receive JSON data...");
}

void loop() {
  // Check if data is available from the serial port
  if (Serial.available() > 0) {
    // Read the incoming JSON string until a newline character is encountered
    String jsonString = Serial.readStringUntil('\n');
    jsonString.trim(); // Remove any extra whitespace

    if (jsonString.length() > 0) {
      Serial.print("Received JSON: ");
      Serial.println(jsonString);

      // Allocate a DynamicJsonDocument.
      // Adjust capacity based on your JSON structure
      const size_t capacity = JSON_OBJECT_SIZE(1) + 60;
      DynamicJsonDocument doc(capacity);

      // Deserialize the JSON data
      DeserializationError error = deserializeJson(doc, jsonString);
      if (error) {
        Serial.print("JSON parsing failed: ");
        Serial.println(error.f_str());
        return;
      }

      // Retrieve the classification field from the parsed JSON
      const char* classification = doc["classification"];
      if (classification == NULL) {
        Serial.println("No classification found in JSON!");
        return;
      }

      Serial.print("Classification: ");
      Serial.println(classification);

      // Turn off all LEDs before processing a new command
      digitalWrite(LED_RECYCLABLE, LOW);
      digitalWrite(LED_COMPOST, LOW);
      digitalWrite(LED_LANDFILL, LOW);

      // Convert the classification string to lowercase for easier comparison
      String classStr = String(classification);
      classStr.toLowerCase();

      // Check for keywords and light up the corresponding LED. After turning off the LED,
      // rotate the servo 90 degrees for 3 seconds, then return to 0 degrees.
      if (classStr.indexOf("recyclable") != -1) {
        Serial.println("Category detected: Recyclable");
        digitalWrite(LED_RECYCLABLE, HIGH);
        delay(4500);  // LED on for 4.5 seconds
        digitalWrite(LED_RECYCLABLE, LOW);
        
        // Servo movement: rotate 90° for 3 seconds then return back to 0°
        myservo.write(90);
        delay(3000);  // Hold position for 3 seconds
        myservo.write(0);
      } else if (classStr.indexOf("compost") != -1) {
        Serial.println("Category detected: Compost");
        digitalWrite(LED_COMPOST, HIGH);
        delay(4500);  // LED on for 4.5 seconds
        digitalWrite(LED_COMPOST, LOW);
        
        // Servo movement
        myservo.write(90);
        delay(3000);
        myservo.write(0);
      } else if (classStr.indexOf("landfill") != -1) {
        Serial.println("Category detected: Landfill");
        digitalWrite(LED_LANDFILL, HIGH);
        delay(4500);  // LED on for 4.5 seconds
        digitalWrite(LED_LANDFILL, LOW);
        
        // Servo movement
        myservo.write(90);
        delay(3000);
        myservo.write(0);
      } else {
        Serial.println("Unknown category detected.");
      }
    }
  }
}
