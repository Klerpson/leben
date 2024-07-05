from openai import OpenAI
import frontmatter
from datetime import datetime
import os
from config import OPENAI_API_KEY, POSTS_FOLDER
from seo_optimizer import analyze_keywords, generate_meta_tags
import re

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_content(prompt):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Eres Julio Sánchez Cristo, un periodista colombiano. Escribe contenido claro, directo y natural que resuelva la intención de búsqueda del usuario y con técnicas avanzadas de SEO. No inventes nada. Siempre utiliza información verificada."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def sanitize_filename(filename):
    return re.sub(r'[\\/*?:"<>|]', "", filename)

def create_post(title, keywords, categories):
    keyword_analysis = analyze_keywords(keywords)
    print("\nAnálisis de palabras clave:")
    print(keyword_analysis)

    meta_tags = generate_meta_tags(title, keywords)
    print("\nMeta Tags generados:")
    print(meta_tags)

    meta_title = meta_tags.split('\n')[1].split('. ')[1]
    meta_description = meta_tags.split('\n')[8].split('. ')[1]

    prompt = f"""Escribe un artículo sobre '{title}' para una inmobiliaria en Fusagasugá, Cundinamarca, Colombia. 
    Usa estas palabras clave: {', '.join(keywords)}. 
    El artículo debe ser informativo y resolver la intención de búsqueda del usuario. Redacta en markdown destacando con negrita las palabras o frases importantes. Además, tu redacción debe tener una buena calificación en facilidad de lectura. Debes generar mínimo 3 subtítulos. Genera más si es posible y necesario para resolver la intención de búsqueda de la mejor manera. También, debes generar mínimo 1 lista. Genera más si es posible y necesario para resolver la intención de búsqueda de la mejor manera. Utiliza lo mejor posible y de forma directa las palabras clave y sus variaciones semánticas.
    Considera el siguiente análisis de palabras clave: {keyword_analysis}
    
    Además, genera:
    1. Un 'h1' atractivo y relevante para el artículo y que invite a seguir leyendo sin decirlo directamente.
    2. Un 'excerpt' de aproximadamente 20 palabras que resuma el contenido.
    3. Sugiere un nombre de archivo para una imagen hero relevante (terminado en .webp).
    4. Sugiere un texto alternativo (alt) para la imagen hero teniendo en cuenta las palabras clave para el seo.
    
    Presenta estos elementos antes del contenido principal del artículo en el mismo orden."""

    response = generate_content(prompt)
    
    lines = response.split('\n')
    
    h1 = next((line.split(': ')[1] for line in lines if line.startswith('h1:')), '')
    excerpt = next((line.split(': ')[1] for line in lines if line.startswith('excerpt:')), '')
    hero = next((line.split(': ')[1] for line in lines if line.startswith('hero:')), '')
    alt = next((line.split(': ')[1] for line in lines if line.startswith('alt:')), '')

    content = "\n".join(lines[4:])

    post = frontmatter.Post(content)
    post.metadata['layout'] = 'post'
    post.metadata['title'] = meta_title
    post.metadata['description'] = meta_description
    post.metadata['h1'] = h1
    post.metadata['hero'] = hero
    post.metadata['alt'] = alt
    post.metadata['category'] = categories[0] if categories else ''
    post.metadata['excerpt'] = excerpt
    post.metadata['autor'] = 'Sebastián Rincón'
    post.metadata['foto'] = 'sebastian-rincon-leben.webp'
    post.metadata['bio'] = 'Co-director de LEBEN Inmobiliaria, con más de 5 años de experiencia en el mercado de propiedades de Fusagasugá. Disfruta compartiendo lo que lo enamora de vivir en esta floreciente ciudad.'
    post.metadata['instagram'] = 'https://instagram.com/sebastianrincon'

    filename = f"{datetime.now().strftime('%Y-%m-%d')}-{'-'.join(title.lower().split())}.md"
    filename = sanitize_filename(filename)
    filepath = os.path.join(POSTS_FOLDER, filename)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter.dumps(post))

    print(f"\nPost creado: {filepath}")

if __name__ == "__main__":
    title = input("Ingresa el título del artículo: ")
    keywords = input("Ingresa las palabras clave (separadas por comas): ").split(',')
    categories = input("Ingresa las categorías (separadas por comas): ").split(',')
    create_post(title, keywords, categories)
