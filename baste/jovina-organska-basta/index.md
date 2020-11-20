---
layout: page
class: garden

title: &title Jovina organska bašta
last_modified_at: 2019-10-05T00:00:00-02:00

cover_image: 2019/lewis-clarke-vegetable-garden
cover_position: 60%;

google_charts:
- corechart
- calendar

school_garden:
  name: *title
  grants:
  - year: 2018
    place: 3
    amount: 128.127,50
    link: rezultati-konkursa-za-finansiranje-skolske-baste
  school:
    prefix: OŠ
    category: Osnovna škola
    short_name: Jovan Popović
    full_name: Osnovna škola „Jovan Popović”
    address:
      town: Kikinda
      street: Kralja Petra I
      house_number: 63
      maps_link_id: FdyAQ3idZuA2a6kG7
  board:
    president: J. Krvopić
    members:
    - I. Aškić
    - K. Tornjanski
    - D. Vunjak
    - N. Đurić Kun
    - S. Iličin
---

{% assign garden = page.school_garden %}
{% assign school = page.school_garden.school %}

<div markdown="1">
#### {{ school.full_name }}

[{{ school.address.town }}, {{ school.address.street }} {{ school.address.house_number }}](https://goo.gl/maps/{{ school.address.maps_link_id }})

{% for grant in garden.grants %}
Tim **{{ garden.name }}** je {{ grant.year }}. godine
[osvojio {{ grant.place }}. mesto](/projekti/{{ grant.year }}/{{ grant.link }}/#:~:text={{ garden.name }})
na konkursu. Projekat smo finansirali sa **{{ grant.amount }} dinara**, s tim da smo
finansirali samo 85% traženog iznosa. Razlog je što smo se odlučili da ne
finansiramo marketing materijal.
{% endfor %}
</div>

Raspodela sredstava po finansijskom planu:

<div class="pie-chart funds-distribution">
  <div id="funds-distribution" class="chart-placeholder"></div>
  <script defer src="/js/charts.js"></script>
  <script defer src="funds-distribution.js"></script>
  <ul class="legend">
    <li>
      <strong>Materijal i oprema za nadogradnju bašte:</strong> 75.820,00 din.
    </li>
    <li>
      <strong>Alati i oprema za baštu:</strong> 20,957,50 din.
    </li>
    <li>
      <strong>Setveni i sadni materijal:</strong> 16.950,00 din.
    </li>
    <li>
      <strong>Ambalaža za pakovanje i deklaracija:</strong> 14.400,00 din.
    </li>
    <li class="del">
      <strong>Marketinški materijal:</strong> 21.500,00 din.
    </li>
  </ul>
</div>

{% include sr/baste/komisija.html %}

#### Kalendar aktivnosti

Pregled planiranih aktivnosti za 2018. i 2019. godinu:

<div id="calendar" class="calendar-chart"></div>
<script defer src="calendar.js"></script>

Izvod iz dnevnika aktivnosti:

<div class="timeline" markdown="1">

**jul 2018.**

- **Nadogradnja bašte.**

- Postavljanje „zasene”  preko bašte, zaštita od prejakog
  sunčevog zračenja i vremenskih nepogoda (led, vetar…)

- Svakodnevno zalivanje (paprika, paradajz), u 6 i 19 časova.

**avgust 2018.**

- Paprika „napadnuta” vašima i plemenjačom. Prehranjivanje svakih 15 dana
  SLAVOL (preko lista). Svakih 7 dana prskati rastvorom od belog luka protiv
  plemenjače.

- Tretirana paprika rastvorom od ljute paprike. _— 9. avgust._

- Nema vaši na paprikama. _— 13. avgust._

**Priprema površina za ozelenjavanje.** _— 20. avgust._

- Površina zemlje van bašte tretirana glifosanom (uništavanje postojećeg
  korova, priprema za ozelenjavanje. Farbanje stubova (ograde oko organske
  bašte).

**septembar 2018.**

- Branje paprika, ukrasnih tikvica. Humanitarna prodaja na manifestaciji „Dani
  ludaje”. _— 20. septembar._

**oktobar 2018.**

- **Spremanje turšije od naših proizvoda** (paprika, šargarepa, paradajz).

- Turšija se koristi za ishranu dece koja borave u produženom boravku škole.
  Koordinator aktivnosti je nastavnica biologije.

- Spremanje bašte za zimu.

- **Sađenje ozimnog povrća** (bebi spanać, beli i crni luk, salata). _— 12.
  oktobar._

**novembar, decembar 2018.**

- Priprema novih „sanduka” za prolećno sađenje.

- Na sekciji „Ruke moje vešte” učenici članovi sekcije prave sanduke koje ćemo
  postaviti u baštu, nasuti ih organskom zemljom i saditi povrće u njima. Vođa
  sekcije je profesor tehničkog i informatičkog obrazovanja.

**januar 2019.**

- Nastavljaju se aktivnosti iz prethodna dva meseca.

**februar 2019.**

- Kupovina trave za sađenje i ruža stablašica. _— 20. februar._

**mart 2019.**

- **Branje ozimnog povrća** (bebi spanać, luk i salata).

- Proizvode spremali u „Jovine eko kesice” — poklon mami, baki, povodom 8.
  marta.

- Sađenje ruža stablašica.

- Freziranje zemljišta, nasipanje zemlje, priprema za sađenje trave.

**april 2019.**

- **Nadogradnja bašte.**

- Varenje dodatnih cevi, postavljanje sajli, ojačavanje građe, priprema za
  postavljanje zasene u letnjem periodu.

- Ruže ne napreduju. Konsultovali S. Stojanović, vlasnica gazdinstva organske
  hrane. Napravljen rastvor od helatnog gvožđa i organskog đubriva. Svakih 7
  dana prehranjivati ruže. _— 24. april_

- **Sađenje salate, luka i rotkvica** u organskoj bašti.

**maj 2019.**

- Stanje ruža nepromenjeno. Nastaviti sa prehranom. _— 1. maj._

- Stanje ruža nepromenjeno. Nastaviti sa prehranom. _— 8. maj._

- Stanje ruža nepromenjeno. Konsultovana S. Stojanović. Koren mrtav. Odluka da
  se izvade ruže. Odnete dobavljaču na uvid. Prihvaćena reklamacija, sadnice
  nisu bile ispravne (nije do održavanja). Sledeće godine dobavljač o svom
  trošku donosi ruže. _— 15. maj._

- Nabavka cveća iz rasadnika, sađenje ukrasnog cveća na zelenim površinama mimo
  organske bašte (portulake, gazanije). _— 22. maj._

- **Branje salate, rotkvica, luka, nane, matičnjaka.**

- Prodaja na gradskoj pijaci. Sredstva usmerena na štampanje eko kesica za
  pakovanje, nabavka flaširane vode za učenike osmog razreda prilikom polaganja
  završnog ispita. _— 24. maj._

- **Sađenje paradajza, paprike.** U 16:30 nevreme, zasađene sadnice (paprika i
  paradajz) pretrpele štetu. Pratiti oporavak narednih 7 dana. _— 29. maj._

- Nabavka viseće žardinjere za ukršavanje bašte. _— 30. maj._

- Sadnice paradajz i paprika deluju zdravo. _—31. maj._

**jun 2019.**

- **NAPOMENA:** Aktivnosti se nastavljaju, kontinuirano tokom letnjeg raspusta.

- Određivanje timova za zalivanje, određivanje timova za održavanje zelenih
  površina.

- Nabavka supstrata, žardinjera za cveće.

</div>
