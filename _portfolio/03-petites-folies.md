---
title: "Petites Folies"
subtitle: "Other Landscapes over Douro, 2021"
image: portfolio/petites_folies/P2_Capa.jpg
featured_home: true
type: event
date: 2021-10-28
published: true
---

<!-- TEXT ABOVE -->
<div class="justify-text mb-4">
  <p>
    Participated in the Biennale by documenting and researching the event’s impact. Contributed to the <em>Petites Folies Project</em>, which aimed to encourage people to explore the city and its events through installations designed by architects and designers.
  </p>
  <p>
    Assisted in the design of an installation at the Faculty of Architecture, encouraging visitors to walk and shift their attention toward key infrastructures in the city—such as the Arrábida Bridge and the faculty building—drawing inspiration from the work of architect Álvaro Siza.
  </p>
</div>

<!-- PORTFOLIO IMAGES -->
<div class="portfolio-images my-5">
  {% assign imgs = "P2_01,P2_02,P2_03,P2_04,P2_05,P2_06,P2_07,P2_08,P2_09,P2_10,P2_11,P2_12,P2_13,P2_14,P2_15,P2_16,P2_17,P2_18" | split: "," %}
  {% for img in imgs %}
  <div class="mb-4">
    <img src="{{ '/assets/images/portfolio/petites_folies/' | append: img | append: '.jpg' | relative_url }}"
         class="img-fluid w-100"
         alt="Petites Folies {{ img }}">
  </div>
  {% endfor %}
</div>







