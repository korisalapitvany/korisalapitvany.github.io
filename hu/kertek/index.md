---
layout: page
class: gardens

title: Iskolakertek
last_modified_at: 2019-11-20T00:00:00-02:00

cover_image: 2019/lewis-clarke-vegetable-garden
cover_position: 60%;

google_charts:
- corechart

translations:
  en: /gardens
  sr: /baste
---

{% include gardens/vars.html %}

#### Kezdeményezés

{% capture text %}
Az "Iskolakertek" kezdeményezés részeként a Kőris Alapítvány 2018 óta sikeresen
együttműködik vajdasági iskolákkal és óvodákkal. A program fennállása óta
**:projects projektet** támogattunk, összesen :budget dinárral.
{% endcapture %}

{{- text | markdownify
    | replace: ":projects", garden_ids.size
    | replace: ":budget", total_budget }}

{% include gardens/stats.html
    schools="iskola"
    preschools="óvoda"
    total_budget="teljes költségvetés" %}

<div class="row">
  <div class="col s12 l6 xl8">

{% capture text %}
2018 májusában hirdettük meg [az első iskolai versenyt](/projekti/2018/konkurs-za-finansiranje-skolske-baste/).
38 pályázatot kaptunk, amelyek közül kiválasztottuk
[a :winners legjobb projektet](/projekti/2018/rezultati-konkursa-za-finansiranje-skolske-baste/).
A támogatás teljes összege :budget dinár volt.
{% endcapture %}

{{- text | markdownify
    | replace: ":applications", applications.in_2018.schools
    | replace: ":winners", school_garden_ids_2018.size
    | replace: ":budget", total_budget_2018 }}

{% capture text %}
2019 februárjában két pályázatot hirdettünk meg:
[a második iskolák közötti versenyt](/projekti/2019/konkurs-za-finansiranje-skolske-baste/)
és
[az első az óvodák közöttit](/projekti/2019/konkurs-za-finansiranje-baste-u-vrticima/).
:schools iskola és :preschools óvoda jelentkezett, amelyek közül
[a :winner\_schools legjobb iskolát](/projekti/2019/rezultati-konkursa-za-finansiranje-skolske-baste/)
és
[az :winner\_preschools legjobb óvodát](/projekti/2019/rezultati-konkursa-za-finansiranje-baste-u-vrticima/)
támogattuk. A támogatás teljes összege :budget dinár volt.
{% endcapture %}

{{- text | markdownify
    | replace: ":schools", applications.in_2019.schools
    | replace: ":preschools", applications.in_2019.preschools
    | replace: ":winner_schools", school_garden_ids_2019.size
    | replace: ":winner_preschools", preschool_garden_ids_2019.size
    | replace: ":budget", total_budget_2019 }}

{% capture text %}
A verseny harmadik fordulóját 2020-ban írtuk ki. A korábbi évekhez hasonlóan
most is meghirdettünk egy-egy versenyt
[az iskolák](/projekti/konkurs-za-finansiranje-skolske-baste/) és
[az óvodák számára](/projekti/konkurs-za-finansiranje-baste-u-vrticima/). A
COVID-19 járvány miatti rendkívüli állapot idején kisebb számú jelentkezést
kaptunk, csupán :schools iskolától és :preschools óvodától. Kiválasztottuk
[a :winner\_schools legjobb iskolát](/projekti/rezultati-konkursa-za-finansiranje-skolske-baste/),
illetve
[mindhárom pályázatot benyújtó óvoda](/projekti/rezultati-konkursa-za-finansiranje-baste-u-vrticima/)
anyagi támogatást kapott. A támogatás teljes összege :budget dinár volt.
{% endcapture %}

{{- text | markdownify
    | replace: ":schools", applications.in_2020.schools
    | replace: ":preschools", applications.in_2020.preschools
    | replace: ":winner_schools", school_garden_ids_2020.size
    | replace: ":budget", total_budget_2020 }}

{% capture text %}
A verseny negyedik fordulóját 2021 elején tervezzük meghirdetni.
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
    <em>Pannon RTV riport</em>
  </div>
</div>

#### A támogatás eloszlása

Az összeg nagy része (kb. 90%) az iskolákhoz került, míg a költségvetés mintegy
10%-át az óvodák kapták.

{% include gardens/funds_allocation.html
    schools="Iskolák"
    preschools="Óvodák" %}

Az iskolák és az óvodák teljes listája:

{% include gardens/table.html
    school="Iskola/óvoda"
    place="Helység"
    amount="Összeg (din)"
    year="Év" %}
