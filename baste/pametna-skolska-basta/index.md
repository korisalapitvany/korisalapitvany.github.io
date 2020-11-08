---
layout: page
class: garden

title: &title Pametna školska bašta
last_modified_at: 2019-11-16T00:00:00-02:00

cover_image: 2019/pametna-skolska-basta-cover
cover_position: 80%;

google_charts:
- corechart

school_garden:
  name: *title
  grants:
    - year: 2018
      place: special
      amount: 51.800,00
      link: rezultati-konkursa-za-finansiranje-skolske-baste
  school:
    prefix: OSŠ
    category: Osnovna i srednja škola sa domom učenika
    short_name: Petro Kuzmjak
    full_name: Osnovna i srednja škola sa domom učenika „Petro Kuzmjak”
    address:
      town: Ruski Krstur
      street: Rusinska
      house_number: 63
      maps_link_id: JjaDxY4hazBvzQMp6
  board:
    president: T. Katona
    members:
    - J. Šomođi
    - K. Sabadoš
---

{% assign garden = page.school_garden %}
{% assign school = page.school_garden.school %}

<div markdown="1">
#### {{ school.full_name }}

[{{ school.address.town }}, {{ school.address.street }} {{ school.address.house_number }}](https://goo.gl/maps/{{ school.address.maps_link_id }})

{% for grant in garden.grants %}
Tim **{{ garden.name }}** je {{ grant.year }}. godine
[dobio specijalnu nagradu](/projekti/{{ grant.year }}/{{ grant.link }}/#:~:text={{ garden.name }})
na konkursu. Projekat smo finansirali sa **{{ grant.amount }} dinara**.
{% endfor %}
</div>

Raspodela sredstava po finansijskom planu:

<div class="pie-chart funds-distribution">
  <div id="funds-distribution" class="chart-placeholder"></div>
  <script defer src="/js/charts.js"></script>
  <script defer src="funds-distribution.js"></script>
  <ul class="legend">
    <li>
      <strong>Laptop:</strong> 35.999,00 din.
    </li>
    <li>
      <strong><a href="https://urbigo.me/">UrbiGo</a> pametna bašta:</strong> 8.499,00 din.
    </li>
    <li>
      <strong>Dopuna (na godišnjem nivou):</strong> 4.300,00 din.
    </li>
    <li>
      <strong>Troškovi nabavke i potrošni materijal:</strong> 3.000,00 din.
    </li>
  </ul>
</div>

{% include sr/baste/komisija.html %}
