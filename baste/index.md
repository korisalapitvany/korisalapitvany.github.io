---
layout: page
class: gardens

title: Školske bašte
last_modified_at: 2019-10-05T00:00:00-02:00

cover_image: 2019/lewis-clarke-vegetable-garden
cover_position: 60%;

google_charts:
- corechart

garden_ids:
- staklenik-u-tehnickoj-skoli-9-maj
- lolina-botanicka-basta
- jovina-organska-basta
- pametna-skolska-basta
- mini-bio-basta
- skolska-basta-pavle
- organska-basta-cenejci
- mala-skolska-basta
- banatska-oaza-mirisa-i-zdravlja
- nasa-basta-hrtkovci
- basta-vrtica-radost
- basta-vrtica-zeka
- bubamarina-oaza
- za-zeleniji-vrtic-kolibri
- basta-vrtica-marjai-maria
- na-krilima-maste-do-edukativne-baste
- zacinska-basta
- nasa-basta-bocar
- bio-basta-kanjiza
- nasa-prica
- dositejac
- basta-vrtica-palcica
- eko-basta
- stonogicina-bio-basta

applications:
  in_2018:
    schools: 38
  in_2019:
    schools: 44
    preschools: 8
  in_2020:
    schools: 9
    preschools: 3

translations:
  en: /gardens
---

{% include gardens/vars.html %}

#### Inicijativa

{% capture text %}
U okviru inicijative „Školske bašte” Fondacija „Jasen” već od 2018. godine
uspešno sarađuje sa školama i vrtićima u Vojvodini. Tokom postojanja programa
sponzorisali smo **:projects projekata** sa ukupnim budžetom od :budget dinara.
{% endcapture %}

{{- text | markdownify
    | replace: ":projects", garden_ids.size
    | replace: ":budget", total_budget }}

{% include gardens/stats.html
    schools="škola"
    preschools="vrtića"
    total_budget="ukupan budžet" %}

<div class="row">
  <div class="col s12 l6 xl8">

{% capture text %}
[Prvi konkurs za škole](/projekti/2018/konkurs-za-finansiranje-skolske-baste/)
smo raspisali u maju 2018. godine. Primili smo :applications prijava, od kojih
smo izabrali
[:winners najboljih projekata](/projekti/2018/rezultati-konkursa-za-finansiranje-skolske-baste/)
i podelili :budget dinara.
{% endcapture %}

{{- text | markdownify
    | replace: ":applications", applications.in_2018.schools
    | replace: ":winners", school_garden_ids_2018.size
    | replace: ":budget", total_budget_2018 }}

{% capture text %}
U februaru 2019. godine smo raspisali dva konkursa:
[drugi konkurs za škole](/projekti/2019/konkurs-za-finansiranje-skolske-baste/)
i
[prvi konkurs za vrtiće](/projekti/2019/konkurs-za-finansiranje-baste-u-vrticima/).
Prijavile su se :schools škola i :preschools vrtića, od kojih smo izabrali
[:winner\_schools najboljih škola](/projekti/2019/rezultati-konkursa-za-finansiranje-skolske-baste/)
i
[:winner\_preschools najboljih vrtića](/projekti/2019/rezultati-konkursa-za-finansiranje-baste-u-vrticima/)
i podelili :budget dinara.
{% endcapture %}

{{- text | markdownify
    | replace: ":schools", applications.in_2019.schools
    | replace: ":preschools", applications.in_2019.preschools
    | replace: ":winner_schools", school_garden_ids_2019.size
    | replace: ":winner_preschools", preschool_garden_ids_2019.size
    | replace: ":budget", total_budget_2019 }}

{% capture text %}
Treći krug konkursa smo raspitali 2020. godine. Kao i prethodne godine, i sada
smo raspisali poseban
[konkurs za škole](/projekti/konkurs-za-finansiranje-skolske-baste/)
i
[konkurs za vrtiće](/projekti/konkurs-za-finansiranje-baste-u-vrticima/). Tokom
vanrednog stanja zbog COVID-19 pandemije dobili smo manji broj prijava, od samo
:schools škola i :preschools vrtića. Odabrali smo
[:winner\_schools najboljih škola](/projekti/rezultati-konkursa-za-finansiranje-skolske-baste/),
a
[sva :winner\_preschools vrtića](/projekti/rezultati-konkursa-za-finansiranje-baste-u-vrticima/)
koja su predala prijavu su dobila novčanu podršku. Podelili smo :budget dinara.
{% endcapture %}

{{- text | markdownify
    | replace: ":schools", applications.in_2020.schools
    | replace: ":preschools", applications.in_2020.preschools
    | replace: ":winner_schools", school_garden_ids_2020.size
    | replace: ":winner_preschools", preschool_garden_ids_2020.size
    | replace: ":budget", total_budget_2020 }}

{% capture text %}
Četvrti krug konkursa planiramo raspisati početkom 2021. godine.
{% endcapture %}

{{- text | markdownify }}

  </div>
  <div class="video-col col s12 l6 xl4">
    <div class="video">
      <iframe
        src="https://www.youtube.com/embed/w2Wo-_1OxcU?controls=0"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <em>Pannon RTV izveštaj</em>
  </div>
</div>

#### Raspodela sredstava

Većinu sredstava (oko 90%) dobile su škole, dok smo vrtićima podelili oko 10%
budžeta.

{% include gardens/funds_allocation.html
    schools="Škole"
    preschools="Vrtići" %}

Kompletna lista škola i predškolskih ustanova:

{% include gardens/table.html
    school="Škola/vrtić"
    place="Mesto"
    amount="Iznos (din)"
    year="God." %}

#### Naše bašte

{% include sr/baste/nase-baste.html %}
