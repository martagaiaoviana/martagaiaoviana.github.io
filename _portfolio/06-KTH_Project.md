---
title: "KTH Project"
subtitle: "Fifth-year project – Bike Sharing Conceptual Project, 2020"
image: portfolio/KTH_Project/P6_Capa.jpg
featured_home: true
type: event
date: 2020-11-11
published: true
---

<!-- TEXT ABOVE -->
<div class="justify-text mb-4">
  <p>
    Developed in the <span class="fw-bold">fifth year of the Integrated Master’s in Architecture at KTH – Royal Institute of Technology, Stockholm (late 2020)</span>, this project began as a conceptual exploration of <span class="fw-bold">absence, conflict, and void</span>. Through graphic analysis, these abstract notions gradually transformed into a spatial narrative.
  </p>
  <p>
    This process laid the foundation for a <span class="fw-bold">bike-sharing hub</span> program, merging ideas of mobility, temporality, and collective experience in the public realm. The project culminated in the construction of a <span class="fw-bold">1:1 scale prototype</span>, reinforcing the role of full-scale building in architectural experimentation and critical engagement.
  </p>
</div>

<!-- Portfolio Images -->
<div class="portfolio-images my-5">
  {% assign imgs = "P6_01,P6_02,P6_03,P6_04,P6_05,P6_06,P6_07,P6_08,P6_09,P6_10" | split: "," %}
  {% assign base = '/assets/images/portfolio/KTH_Project/' %}
  {% for img in imgs %}
  <div class="mb-4">
    <img src="{{ base | append: img | append: '.jpg' | relative_url }}"
         class="img-fluid w-100"
         alt="KTH Project {{ img }}">
  </div>
  {% endfor %}
</div>


