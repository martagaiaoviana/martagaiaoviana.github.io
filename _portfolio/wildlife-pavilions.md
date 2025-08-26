---
title: "Wildlife Pavilions"
subtitle: "Honorable Mention in the International Competition TerraViva"
image: portfolio/wildlife_pavilions/P1_Capa.png
featured_home: true
type: drawing
date: 2023
published: true
---

The project of the three structures for the **Riserva Naturale delle Torbiere del Sebino** is an essay of the reunion between human action and natural spaces.  

The reserve has an aura of pristine nature, although it has been extensively modified by human activities, in this case, peat extraction. Despite the intense human activity in previous decades, the reserve has recovered some of its biodiversity and environment that characterized it, renewing itself with another expression.  

The Sebino Reserve is marked by the sublime, revealing multiple layers of intervention and time that are perceived as marks of the territory, representing both imbalance and conflict, as well as reconciliation and reunion. Thus, *Torbiere del Sebino* assumes the metaphor of the palimpsest as a basis for designing new layers, always keeping records of the previous ones.  

With this premise in mind, the three pavilions are embedded under the existing human marks, serving as a testimony to the reconciliation between humans and nature. The structures seek a dialogue, being sensitive with all forms of life in nature.  

Regarding the architectural experience, the structures value a serene and coexisting system between humans and non-humans. Therefore, to stress this coexistence system we developed the **"ARE" concept – AttraverARE, OsservARE, PotenziARE** – as a strategy for a gradual approach to nature, raising awareness of the reserve, promoting complete integration with the natural surroundings.  

<small>This project was developed in collaboration with <strong>José Pedro Cerdeira</strong> and <strong>Luís Caleiro</strong>.</small>  

**2023**

<!-- Portfolio Carousel -->
<div id="portfolioCarousel" class="carousel slide my-5" data-bs-ride="carousel">
  <div class="carousel-inner">
    {% assign images = "P1_000,P1_00A,P1_00B" | split: "," %}
    {% for image in images %}
    <div class="carousel-item {% if forloop.first %}active{% endif %}">
      <img src="{{ '/assets/images/portfolio/wildlife_pavilions/' | append: image | append: '.png' | relative_url }}"
           class="d-block w-100 img-fluid"
           alt="Portfolio image {{ image }}">
    </div>
    {% endfor %}
  </div>

  <!-- Grey Carousel controls -->
  <button class="carousel-control-prev" type="button" data-bs-target="#portfolioCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon custom-arrow" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#portfolioCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon custom-arrow" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<style>
  /* Grey arrows */
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(50%) grayscale(100%);
    width: 3rem;
    height: 3rem;
  }
</style>

















