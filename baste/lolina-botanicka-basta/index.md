---
layout: page
class: garden

title: &title Lolina botanička bašta
last_modified_at: 2019-11-16T00:00:00-02:00

cover_image: 2019/lewis-clarke-vegetable-garden
cover_position: 60%;

google_charts:
- corechart

school_garden:
  name: *title
  grants:
  - year: 2018
    place: 2
    amount: 144.923,00
    link: rezultati-konkursa-za-finansiranje-skolske-baste
  school:
    prefix: OŠ
    category: Osnovna škola
    short_name: Ivo Lola Ribar
    full_name: Osnovna škola „Ivo Lola Ribar”
    address:
      town: Sombor
      street: Monoštorska
      house_number: 6a
      maps_link_id: MLySj7uymxoMienm6
  board:
    president: D. Babić
    members:
    - S. Balać
    - K. Đurđev
    - M. Mudrinić
    - T. Hinić
    - A. Brzaković
    - B. Ostojić
---

{% include sr/baste/rezultat.html %}

Raspodela sredstava po finansijskom planu:

<div class="pie-chart funds-distribution">
  <div id="funds-distribution" class="chart-placeholder"></div>
  <script defer src="/js/charts.js"></script>
  <script defer src="funds-distribution.js"></script>
  <ul class="legend">
    <li>
      <strong>Navodnjavanje:</strong> 35.487,00 din.
    </li>
    <li>
      <strong>Sadni material, biljke, preparati:</strong> 34.657,00 din.
    </li>
    <li>
      <strong>Materijal za leje:</strong> 16.400,00 din.
    </li>
    <li>
      <strong>Prskalice, makaze, rukavice, sitni alat:</strong> 15.980,00 din.
    </li>
    <li>
      <strong>Sto za manipulaciju:</strong> 14.000,00 din.
    </li>
    <li>
      <strong>Kamenje, treset:</strong> 13.199,00 din.
    </li>
    <li>
      <strong>Saksije, kutije za presađivanje:</strong> 9.600,00 din.
    </li>
    <li>
      <strong>Materijal za kompostište:</strong> 5.600,00 din.
    </li>
  </ul>
</div>

{% include sr/baste/komisija.html %}
