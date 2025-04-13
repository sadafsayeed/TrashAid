import time
import json
import serial
import os
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# Configure serial port (adjust 'COM8' or '/dev/ttyACM0' according to your system)
ser = serial.Serial('COM8', 9600, timeout=1)  # Replace 'COM8' with the correct port

# Define a handler for file events
class JSONFileHandler(FileSystemEventHandler):
    def process_file(self, file_path):
        """Process the JSON file and send its content to the Arduino."""
        print(f"Processing file: {file_path}")
        retries = 5
        while retries > 0:
            try:
                with open(file_path, 'r') as f:
                    content = f.read()
                    print(f"File content: {content}")
                    data = json.loads(content)

                # Convert data back to a string format for transmission
                json_data = json.dumps(data)
                print("Sending data to Arduino...")
                ser.write(json_data.encode())  # send the data as bytes
                ser.write(b'\n')  # optional: append a newline character to indicate end-of-message
                print("Data sent successfully.")

                # Wait for 6 seconds and then delete the file
                time.sleep(6)
                os.remove(file_path)
                print(f"File deleted: {file_path}")
                return
            except PermissionError:
                print(f"File is locked, retrying... ({retries} retries left)")
                retries -= 1
                time.sleep(1)
            except json.JSONDecodeError as e:
                print(f"Invalid JSON in file {file_path}: {e}")
                return
            except Exception as e:
                print(f"Error processing file {file_path}: {e}")
                return
        print(f"Failed to process file {file_path} after multiple retries.")

    def on_created(self, event):
        """Handle file creation events."""
        if event.src_path.endswith('.json'):
            print(f"New JSON file detected: {event.src_path}")
            self.process_file(event.src_path)

    def on_modified(self, event):
        """Handle file modification events."""
        if event.src_path.endswith('.json'):
            print(f"Modified JSON file detected: {event.src_path}")
            self.process_file(event.src_path)

if __name__ == "__main__":
    path_to_watch = r"E:\Hackabull\TrashAid\ard_driver\record keeper"  # change to your target directory

    # Ensure the directory exists
    if not os.path.exists(path_to_watch):
        print(f"Error: Directory {path_to_watch} does not exist.")
        exit(1)

    print(f"Watching directory: {path_to_watch}")
    event_handler = JSONFileHandler()
    observer = Observer()
    observer.schedule(event_handler, path=path_to_watch, recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        ser.close()  # Close the serial port
    observer.join()