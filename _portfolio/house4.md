---
title: "Sea House"
subtitle: "Renovation of a house, 2024"
image: portfolio/Beach_House/P5_Capa.jpg
featured_home: true
type: contest
date: 2024-09-26
published: true
---

<!-- Project Text -->
<div class="my-5">
  <p>
    This apartment, located in <span class="fw-bold">Apúlia, Esposende, Portugal</span>, was designed with the sea as its primary inspiration. Drawing from the surrounding coastal environment, the concept embraces nature, calmness, and spatial balance.
  </p>
  <p>
    The project highlights a harmonious relationship between interior and exterior through natural materials, soft tones, and an open layout that reflects the fluidity of the sea and the tranquillity of the landscape.
  </p>
</div>


<!-- Portfolio Carousel -->
<div id="portfolioCarousel" class="carousel slide my-5" data-bs-ride="carousel">
  <div class="carousel-inner">
    {% assign images = "P5_01,P5_02,P5_03,P5_04,P5_05,P5_06,P5_07,P5_08,P5_09,P5_10,P5_11,P5_12" | split: "," %}
    {% for image in images %}
    <div class="carousel-item {% if forloop.first %}active{% endif %}">
      <img src="{{ '/assets/images/portfolio/Beach_House/' | append: image | append: '.jpg' | relative_url }}"
           class="d-block w-100 img-fluid"
           alt="Beach House image {{ image }}"
           loading="lazy">
    </div>
    {% endfor %}
  </div>

  <!-- Carousel controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#portfolioCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon custom-arrow" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#portfolioCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon custom-arrow" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
