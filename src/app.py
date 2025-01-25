from flask import Flask, render_template, request, send_from_directory
from flask_socketio import SocketIO, emit

PORT = 5001

app = Flask(__name__, static_folder='assets')
socketio = SocketIO(app)
app.template_folder = "views"

@app.route("/")
def index():
    return render_template("index.njk")

@app.route("/chatroom")
def chatroom():
    uname = request.args.get('uname', '')
    return render_template("chatroom.njk", uname=uname)

@socketio.on("message")
def handle_message(msg):
    print(f"{msg['user']}: {msg['message']}")
    # Broadcast the message to all connected clients
    emit("message_another", msg)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=PORT)
