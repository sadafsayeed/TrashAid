import base64
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Function to encode the image
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


# Path to your image
image_path = "images/3.jpg"

# Getting the Base64 string
base64_image = encode_image(image_path)


response = client.responses.create(
    model="gpt-4o-mini",
    input=[
        {
            "role": "user",
            "content": [
                { "type": "input_text", "text": """The following image shows an object (or multiple objects) that was thrown into a trashcan. Identify each object and classify it into one of the following classes: recyclable, compost, or landfill. Your response should ONLY be a JSON array where each object has two fields: "object" (the name of the item) and "class" (its classification). No explanations, no formatting, and no extra text. Example: [{"object": "half eaten apple", "class": "compost"}, {"object": "candy wrapper", "class": "recyclable"}]""" },
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpeg;base64,{base64_image}",
                },
            ],
        }
    ],
)

print(response.output_text)
