## main.py update

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import base64 # Added for image encoding
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Models
text_model = genai.GenerativeModel("models/gemini-1.5-flash")
image_model = genai.GenerativeModel("models/gemini-2.0-flash-exp-image-generation") # Standard Imagen model name

app = FastAPI()

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

@app.post("/chat")
async def chat(req: ChatRequest):
    # Logic to decide if the user wants an image
    # Simple trigger: if message starts with "/imagine"
    if req.message.lower().startswith("/imagine"):
        prompt = req.message.replace("/imagine", "").strip()
        try:
            # Generate image
            response = image_model.generate_content(prompt)
            # Imagen returns images in the 'images' attribute of the response
            # We convert to base64 to send to the frontend easily
            img = response.images[0]
            return {"response": "Here is your picture! 🎨", "image": img._image_bytes} 
        except Exception as e:
            return {"response": f"I couldn't draw that right now! 🖍️ ({str(e)})"}

    # Default Text Logic
    prompt = f"You are KidZie, a fun AI teacher for {req.age} year olds. Explain: {req.message}"
    try:
        result = text_model.generate_content(prompt)
        return {"response": result.text}
    except Exception as e:
        return {"response": "Oops! Something went wrong 🤖💥"}