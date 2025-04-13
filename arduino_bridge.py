from flask import Flask, request
import json
# import serial  # Commented out for testing without Arduino

app = Flask(__name__)

# Replace this with the correct port for your Arduino
# SERIAL_PORT = '/dev/ttyUSB0'  # Linux/Mac
# SERIAL_PORT = 'COM3'  # Windows
# BAUD_RATE = 9600

# Try to connect to serial (commented out for now)
# try:
#     ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
#     print(f"✅ Connected to Arduino on {SERIAL_PORT}")
# except Exception as e:
#     print(f" Could not open serial port: {e}")
#     ser = None

@app.route('/receive', methods=['POST'])
def receive_data():
    try:
        data = request.get_json()
        print("Received data:", data)

        # Convert to JSON string (simulating what we'd send to Arduino)
        json_str = json.dumps(data) + "\n"

        # Simulated serial send
        # if ser and ser.is_open:
        #     ser.write(json_str.encode())
        #     print("📨 Sent to Arduino:", json_str)
        # else:
        #     print("⚠️ Serial port not open!")

        print("Simulated sending to Arduino!!!! IT WORKS YAUSYDUSAYYAYAYAYAY", json_str)

        return {"status": "OK"}, 200

    except Exception as e:
        print("ERROR while processing data:", e)
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=6000)
