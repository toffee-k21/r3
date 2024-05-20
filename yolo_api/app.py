from flask import Flask, request, jsonify
from flask_cors import CORS
import torch

app = Flask(__name__)
CORS(app)

# Load the YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

@app.route('/detect', methods=['POST'])
def detect():
    data = request.get_json()
    image_urls = data.get('image_urls')
    
    if not image_urls:
        return jsonify({'error': 'No image URLs provided'}), 400

    # Inference
    results = model(image_urls)

    # Convert results to pandas dataframe
    detections = [results.pandas().xyxy[i].to_dict(orient='records') for i in range(len(image_urls))]
    
    return jsonify(detections), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
