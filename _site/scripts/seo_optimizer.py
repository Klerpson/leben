from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def analyze_keywords(keywords):
    prompt = f"Analiza estas palabras clave y su intención de búsqueda: {', '.join(keywords)}. Da un resumen breve."
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Eres un experto en SEO y análisis de palabras clave."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def generate_meta_tags(title, keywords):
    prompt = f"""Actúa como un experto en SEO y Copywriting para una inmobiliaria en Fusagasugá, Colombia. 
    Analiza los primeros resultados de Google para la búsqueda "{title}" y las palabras clave {', '.join(keywords)}.
    Genera 5 Meta Titles y 5 Meta Descriptions que rompan el patrón de los demás resultados y maximicen el CTR.
    
    Reglas:
    - Los Meta Titles deben tener máximo 60 caracteres.
    - Las Meta Descriptions deben tener 160 caracteres COMO MÁXIMO.
    - Ambos textos deben maximizar el CTR en los resultados de búsqueda de Google.
    - Asegúrate de que sean únicos, atractivos y relevantes para una inmobiliaria en Fusagasugá.

    Formato de salida:
    Meta Titles:
    1. [Meta Title 1]
    2. [Meta Title 2]
    3. [Meta Title 3]
    4. [Meta Title 4]
    5. [Meta Title 5]

    Meta Descriptions:
    1. [Meta Description 1]
    2. [Meta Description 2]
    3. [Meta Description 3]
    4. [Meta Description 4]
    5. [Meta Description 5]
    """
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Eres un experto en SEO y Copywriting, especializado en crear meta etiquetas atractivas y efectivas para inmobiliarias en Colombia."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
