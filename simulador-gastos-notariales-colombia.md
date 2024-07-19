---
layout: page-basic
title: Simulador de Gastos Notariales para Comprar o Vender Casa
description: Programamos una calculadora de gastos notariales para la compra o venta de tu casa en Colombia. Usa nuestro simulador y prepara tu presupuesto.
h1: "Calculadora de Gastos Notariales: Averigua el costo aproximado"
---
{% include simulador-gastos-notariales.html %}
<aside class="relacionados flow">
  <h2>Conoce las casas en venta de Leben Inmobiliaria</h2>
  <div class="posts">
    {% for item in site.ventas limit: 3 %}
    <div class="post" data-name="{{ item.clase }}">
      <a href="{{item.url|relative_url}}" title="Inmobiliaria LEBEN Fusagasugá">
        <img src="{{site.baseurl}}/assets/images/portfolio/{{item.img}}" class="img-fluid" alt="{{item.alt}}"
          loading="lazy">
        <h3>{{item.title}}</h3>
      </a>
    </div>
    {% endfor %}
  </div>
  <a href="{{'ventas' | relative_url}}" class="cta-btn" title="Más casas en venta en Fusagasugá">Ver más</a>
</aside>

{% include testimonios.html %}