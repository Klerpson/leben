import schedule
import time
from generate_content import create_post

def job():
    title = "Propiedades en venta en Fusagasugá"
    keywords = ["inmobiliaria Fusagasugá", "casas en venta", "apartamentos Fusagasugá"]
    categories = ["Ventas", "Propiedades"]
    create_post(title, keywords, categories)

# Programa la publicación diaria a las 10:00 AM
schedule.every().day.at("10:00").do(job)

if __name__ == "__main__":
    print("Programador de publicaciones iniciado. Presiona Ctrl+C para detener.")
    try:
        while True:
            schedule.run_pending()
            time.sleep(1)
    except KeyboardInterrupt:
        print("Programador detenido.")