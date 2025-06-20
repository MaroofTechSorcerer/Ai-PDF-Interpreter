# ai_utils.py
# AI and translation utility functions will go here. 

import openai
from deep_translator import GoogleTranslator
import os

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))

def summarize_text(text: str, language: str = "en") -> str:
    prompt = f"Summarize the following text in {language}:\n{text}"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

def translate_text(text: str, target_lang: str) -> str:
    return GoogleTranslator(source='auto', target=target_lang).translate(text)

def bullet_points(text: str, language: str = "en") -> str:
    prompt = f"Convert the following text into concise bullet points in {language}:\n{text}"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300
    )
    return response.choices[0].message.content.strip() 