---
layout: page
class: garden

title: Jovina organska bašta
last_modified_at: 2019-10-05T00:00:00-02:00

cover_image: 2019/lewis-clarke-vegetable-garden
cover_position: 60%;

google_charts:
- calendar
---

{%- assign google_cloud_api_key = site.data.dev_apis.google_cloud_api_key | default: site.data.apis.google_cloud_api_key -%}

<picture style="display: none;">
  <img
    src="https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=640x320&maptype=map&center=45.83495278,20.47263056&language=sr&key={{ google_cloud_api_key }}&scale=2"
    srcset="https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=640x320&maptype=map&center=45.83495278,20.47263056&language=sr&key={{ google_cloud_api_key }}&scale=2, https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=640x320&maptype=map&center=45.83495278,20.47263056&language=sr&key={{ google_cloud_api_key }}&scale=4 2x"
    class="top-map"
    alt="Mapa">
</picture>

#### Osnovna škola „Jovan Popović”

[Kikinda, Kralja Petra I 63](https://www.google.rs/maps/place/Kralja+Petra+I+63,+Kikinda,+Srbija)

Tim **„Jovina organska bašta”** je 2018. godine
[osvojio 3. mesto](/projekti/2018/rezultati-konkursa-za-finansiranje-skolske-baste/)
na konkursu. Projekat smo finansirali sa **128.127,50 dinara**, s tim da smo
finansirali samo 85% traženog iznosa. Razlog je što smo se odlučili da ne
finansiramo marketing materijal.

Raspodela sredstava po finansijskom planu:

- Materijal i oprema za nadogradnju bašte: 75.820,00 din.
- Alati i oprema za baštu: 20,957,50 din.
- Setveni i sadni materijal: 16.950,00 din.
- Ambalaža za pakovanje i deklaracija: 14.400,00 din.
- <del>Marketinški materijal: 21.500,00 din.</del>

Komisija za izradu školske bašte:

1. **J. Krvopić**, predsednik komisije
2. I. Aškić
3. K. Tornjanski
4. D. Vunjak
5. N. Đurić Kun
6. S. Iličin

#### Kalendar aktivnosti

<div id="calendar" class="chart-placeholder"></div>
<script async src="/baste/jovina-organska-basta/calendar.js"></script>
