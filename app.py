from flask import Flask, request, jsonify
import base64
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify():
    try:
        print("=== INSIDE /classify ROUTE ===")
        if 'file' not in request.files:
            print("No file in request.files")
            return jsonify({"error": "No image uploaded"}), 400

        image_file = request.files['file']
        print(f"✅ Received image: {image_file.filename}")

        # 1. Save to a temp path
        temp_path = "temp_upload.jpg"
        image_file.save(temp_path)

        # 2. Encode the image
        with open(temp_path, "rb") as f:
            base64_image = base64.b64encode(f.read()).decode("utf-8")

        # 3. Send to OpenAI
        response = client.responses.create(
            model="gpt-4o-mini",
            input=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "The following image is an image of a object that was thrown in the trashcan. Can you identify which of the following classes it belongs to? The classes: recyclable, compost, landfill. Your respond should ONLY be the object detected and the class it belongs to. Nothing else and no formatting. Example: 'banana peel, compost'. Thank you"
                        },
                        {
                            "type": "input_image",
                            "image_url": f"data:image/jpeg;base64,{base64_image}"
                        },
                    ]
                }
            ]
        )

        result_text = response.output_text
        print("🧠 LLM Output:", result_text)

        # 4. Return to frontend
        return jsonify({"classification": result_text})

    except Exception as e:
        print("🔥 ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5050)
