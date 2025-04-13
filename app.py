from flask import Flask, request, jsonify

app = Flask(__name__)

# 1) Optional: Hook into Flask’s request cycle before requests hit your routes
@app.before_request
def before_request_logging():
    print("=== BEFORE REQUEST LOGGING ===")
    print(f"Method: {request.method}")
    print(f"Path: {request.path}")
    print(f"Content Length: {request.content_length}")
    # If you want to see the raw request body (not always recommended for large files):
    # if request.method == 'POST':
    #     raw_data = request.get_data()
    #     print(f"Raw POST data (first 500 bytes): {raw_data[:500]}")

# @app.route('/')
# def hello():
#     return "Flask is working"

@app.route('/classify', methods=['POST'])
def classify():
    print("=== INSIDE /classify ROUTE ===")

    # 2) Dump out the Headers
    print("=== HEADERS ===")
    print(request.headers)

    # 3) Dump out the POST form fields (if any)
    print("=== FORM FIELDS ===")
    print(request.form)

    # 4) Dump out the uploaded files
    print("=== FILES ===")
    print(request.files)

    # 5) Specifically check if we have 'file'
    if 'file' not in request.files:
        print("No file in request.files")
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['file']
    print(f"✅ Received image: {image_file.filename}")

    # 6) Just send something back in JSON so your frontend can parse it
    return jsonify({"message": "Image received!"})

if __name__ == '__main__':
    # If you want Flask to log more verbosely, you can set debug=True
    app.run(debug=True, host="0.0.0.0", port=5050)