from flask import Flask, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json

from torchvision import models, transforms
from torch.autograd import Variable
import torchvision.models as models

import matplotlib.pyplot as plt
from PIL import Image

from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg

import os
os.environ['KMP_DUPLICATE_LIB_OK']='True'


import requests

# All the 1000 imagenet classes
class_labels = 'imagenet_classes.json'

# Read the json
with open('imagenet_classes.json', 'r') as fr:
	json_classes = json.loads(fr.read())

app = Flask(__name__)

# Allow 
CORS(app)

# Path for uploaded images
UPLOAD_FOLDER = 'data/'

# Allowed file extransions
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def hello():
	return "Hello World!"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		print("request data", request.data)
		print("request files", request.files)

		# check if the post request has the file part
		if 'file' not in request.files:
			return "No file part"
		file = request.files['file']

		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			
			# Send uploaded image for prediction
			predicted_image_class = predict_img(UPLOAD_FOLDER+filename)
			print("predicted_image_class", predicted_image_class)

	return json.dumps(predicted_image_class)

def predict_img(img_path):
	config = Cfg.load_config_from_name('vgg_transformer')

	# config['weights'] = './weights/transformerocr.pth'
	config['weights'] = 'https://drive.google.com/uc?id=13327Y1tz1ohsm5YZMyXVMPIOjoOA0OaA'
	config['cnn']['pretrained']=False
	config['device'] = 'cpu'
	config['predictor']['beamsearch']=False

	detector = Predictor(config)


	# img = './sample/test2.jpg'
	img = Image.open(img_path)
	# img = Image.open('./test/test1.jpg')
	# plt.imshow(img)
	s = detector.predict(img)

	print("Predict text", s)


	return s


if __name__ == "__main__":
	app.run(debug=True)