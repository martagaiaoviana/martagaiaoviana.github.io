---
title: "Petites Folies"
subtitle: "Other Landscapes over Douro"
image: portfolio/petites_folies/P2_Capa.png
featured_home: true
type: drawing
date: 2021-10-28
published: true
---

<!-- TEXT ABOVE -->
<div class="justify-text mb-4">
  <p>
    Participated in the Biennale by covering and researching the event's impact. Contributed to the <em>Petites Folies Project</em>, which aimed to help people discover the city and its events through installations created by architects and designers.
  </p>
  <p>
    Assisted in designing an installation at the Faculty of Architecture, encouraging visitors to walk and direct their attention to key infrastructures in the city, such as the Arrábida Bridge and the faculty building, drawing inspiration from the ideas of architect Álvaro Siza.
  </p>
  <p><strong>2021</strong></p>
</div>

<!-- CAROUSEL -->
<div id="petitesFoliesCarousel" class="carousel slide my-5" data-bs-ride="carousel">
  <div class="carousel-indicators">
    {% assign imgs = "P2_01,P2_02,P2_03,P2_04,P2_05,P2_06,P2_07,P2_08,P2_09,P2_10,P2_11,P2_12,P2_13,P2_14,P2_15,P2_16,P2_17,P2_18" | split: "," %}
    {% for img in imgs %}
      <button type="button"
              data-bs-target="#petitesFoliesCarousel"
              data-bs-slide-to="{{ forloop.index0 }}"
              class="{% if forloop.first %}active{% endif %}"
              aria-current="{% if forloop.first %}true{% endif %}"
              aria-label="Slide {{ forloop.index }}"></button>
    {% endfor %}
  </div>

  <div class="carousel-inner">
    {% for img in imgs %}
      <div class="carousel-item {% if forloop.first %}active{% endif %}">
        <img src="{{ '/assets/images/portfolio/petites_folies/' | append: img | append: '.png' | relative_url }}"
             class="d-block w-100 img-fluid"
             alt="Petites Folies {{ img }}">
      </div>
    {% endfor %}
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#petitesFoliesCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#petitesFoliesCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<style>
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(50%) grayscale(100%);
    width: 2.5rem;
    height: 2.5rem;
  }
</style>






