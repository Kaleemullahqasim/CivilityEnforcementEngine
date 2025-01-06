from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from detoxify import Detoxify

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

model = Detoxify('original')

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(data):
    text = data['text']
    results = model.predict(text)
    results = {key: float(value) for key, value in results.items()}
    emit('response', {'data': results}, json=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)