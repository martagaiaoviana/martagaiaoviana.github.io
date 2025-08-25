---
title: "Petites Folies"
subtitle: "Other Landscapes over Douro"
image: portfolio/1.png
featured_home: true
type: drawing
date: 2003-01-01
published: true
---

<!-- Carousel -->
<div id="petitesFoliesCarousel" class="carousel slide my-5" data-bs-ride="carousel">
  <div class="carousel-inner">
    {% assign images = (1..18) %}
    {% for i in images %}
      {% capture filename %}P2_{{ i | prepend: '0' | slice: -2, 2 }}{% endcapture %}
      <div class="carousel-item {% if forloop.first %}active{% endif %}">
        <img src="{{ '/assets/images/portfolio/' | append: filename | append: '.png' | relative_url }}"
             class="d-block w-100 img-fluid"
             alt="Petites Folies {{ i }}">
      </div>
    {% endfor %}
  </div>

  <!-- Controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#petitesFoliesCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon custom-arrow" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#petitesFoliesCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon custom-arrow" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<style>
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(50%) grayscale(100%);
    width: 3rem;
    height: 3rem;
  }
</style>

<!-- Project Description -->
<div class="mt-4 justify-text">
  <p>
    Participated in the Biennale by covering and researching the event's impact. Contributed to the <em>Petites Folies Project</em>, which aimed to help people discover the city and its events through installations created by architects and designers.
  </p>
  <p>
    Assisted in designing an installation at the Faculty of Architecture, encouraging visitors to walk and direct their attention to key infrastructures in the city, such as the Arrábida Bridge and the faculty building, drawing inspiration from the ideas of architect Álvaro Siza.
  </p>
  <p><strong>(2021 – 2021)</strong></p>
</div>
