from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import datetime
import os
import requests
from dotenv import load_dotenv

# Always load .env from the same directory as main.py
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))
print("Loaded GROQ_API_KEY:", os.getenv("GROQ_API_KEY"))

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "FeelAI Backend is Live!"}


# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class ChatRequest(BaseModel):
    message: str

class TTSRequest(BaseModel):
    text: str

class LetterRequest(BaseModel):
    email: str = ""
    message: str

# --- Would You Rather Data ---
would_you_rather_questions = [
    ("Have the ability to fly 🦅", "Be invisible 🫥"),
    ("Only eat pizza forever 🍕", "Only eat ice cream forever 🍦"),
    ("Live in the past ⏳", "Live in the future 🚀"),
    ("Be super strong 💪", "Be super smart 🧠"),
    ("Talk to animals 🐶", "Speak all languages 🌏"),
    ("Always be 10 minutes late ⏰", "Always be 20 minutes early ⏳"),
    ("Sing everything you say 🎤", "Dance everywhere you go 💃"),
    ("Never use social media again 📵", "Never watch TV again 📺"),
    ("Be able to teleport 🌀", "Be able to time travel ⏰"),
    ("Have a pet dragon 🐉", "Have a pet unicorn 🦄")
]

# --- Emoji Guess Data ---
emoji_puzzles = [
    ("🦁👑", "The Lion King"),
    ("🚢💔🌊", "Titanic"),
    ("🧙‍♂️⚡", "Harry Potter"),
    ("👨‍🚀🌕", "First Man on the Moon"),
    ("🦖🏝️", "Jurassic Park"),
    ("👸❄️⛄", "Frozen"),
    ("🦸‍♂️🕷️", "Spider-Man"),
    ("🐟🔍", "Finding Nemo"),
    ("👨‍💻🔍", "The Matrix"),
    ("👨‍🚀🤖🌌", "Interstellar")
]

# --- Endpoints ---
@app.post("/chat")
def chat(req: ChatRequest):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return {"response": "Error: GROQ_API_KEY not set in backend .env file."}
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "user", "content": req.message}
        ],
        "max_tokens": 200,
        "temperature": 0.7
    }
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        ai_reply = response.json()["choices"][0]["message"]["content"].strip()
        return {"response": ai_reply}
    except Exception as e:
        return {"response": f"Error: {str(e)}"}

@app.post("/tts")
def tts(req: TTSRequest):
    # TODO: Integrate ElevenLabs API
    return {"audio_url": "https://example.com/audio.mp3"}

@app.post("/save-letter")
def save_letter(req: LetterRequest):
    fname = f"future_letter_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(fname, "w", encoding="utf-8") as f:
        f.write(f"Email: {req.email}\nMessage: {req.message}\nTimestamp: {datetime.datetime.now()}\n")
    return {"status": "saved", "filename": fname}

@app.get("/would-you-rather")
def get_would_you_rather():
    q = random.choice(would_you_rather_questions)
    return {"optionA": q[0], "optionB": q[1]}

@app.get("/emoji-guess")
def get_emoji_guess():
    puzzle = random.choice(emoji_puzzles)
    return {"emoji": puzzle[0], "answer": puzzle[1]} 
