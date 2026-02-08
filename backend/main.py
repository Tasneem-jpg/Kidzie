from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Using gemini-1.5-flash for maximum stability/availability
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

# --- Request/Response Models ---

class ChatRequest(BaseModel):
    message: str
    age: int

class ChatResponse(BaseModel):
    response: str

class ScheduleRequest(BaseModel):
    age: int
    subjects: List[str]
    goals: Optional[str] = "General learning"

# --- Endpoints ---

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

@app.post("/generate-schedule")
async def generate_schedule(req: ScheduleRequest):
    # Define the color rules clearly for the AI
    color_rules = """
    Assign colors strictly based on the subject:
    - Math: bg-kidzie-coral
    - Science: bg-kidzie-green
    - Reading/English: bg-kidzie-purple
    - History/Social Studies: bg-kidzie-yellow
    - Art/Music: bg-kidzie-pink
    - Physical Education/Break: bg-kidzie-blue
    - Technology/Other: bg-kidzie-teal
    """

    prompt = f"""
    Create a daily study schedule for a {req.age} year old child for ALL 7 days of the week.
    Focus on: {', '.join(req.subjects)}. 
    Goals: {req.goals}.
    
    {color_rules}
    
    Return the response as a JSON object where each key is a day of the week.
    Each day must be a list of items with: "time", "subject", "topic", "duration", and "color".
    
    Format example:
    {{
      "Monday": [
        {{"time": "4:00 PM", "subject": "Math", "topic": "Addition", "duration": "20 min", "color": "bg-kidzie-coral"}}
      ]
    }}
    """
    try:
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Schedule Error: {e}")
        return {"error": str(e)}

@app.get("/health")
def health():
    return {"status": "ok"}