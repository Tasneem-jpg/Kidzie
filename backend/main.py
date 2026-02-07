from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("models/gemini-2.5-flash")

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    age: int

class ChatResponse(BaseModel):
    response: str


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    prompt = f"""
    You are KidZie, a fun, friendly AI teacher for children.
    Explain concepts in simple, exciting language.
    Use emojis.
    The child is {req.age} years old.

    Question: {req.message}
    """

    try:
        result = model.generate_content(prompt)
        return {"response": result.text}
    except Exception as e:
        return {"response": f"Oops! Something went wrong 🤖💥 ({str(e)})"}


@app.get("/health")
def health():
    return {"status": "ok"}
