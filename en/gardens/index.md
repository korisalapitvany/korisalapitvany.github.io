---
layout: page
class: gardens

title: School Gardens
last_modified_at: 2019-10-05T00:00:00-02:00

cover_image: 2019/lewis-clarke-vegetable-garden
cover_position: 60%;

google_charts:
- corechart

translations:
  sr: /baste
---

{% include gardens/vars.html %}

#### Initiative

{% capture text %}
As part of the "School Gardens" initiative, "Ash" Foundation has been
successfully cooperating with schools and kindergartens in Vojvodina since
2018\. During the existence of the program, we sponsored **:projects projects**
with a total budget of :budget dinars.
{% endcapture %}

{{- text | markdownify
    | replace: ":projects", garden_ids.size
    | replace: ":budget", total_budget }}

{% include gardens/stats.html %}

<div class="row">
  <div class="col s12 l6 xl8">

{% capture text %}
We announced
[the first competition for schools](/projekti/2018/konkurs-za-finansiranje-skolske-baste/)
in May 2018. We received :applications applications, from which we selected
[the :winners best projects](/projekti/2018/rezultati-konkursa-za-finansiranje-skolske-baste/)
and distributed :budget dinars.
{% endcapture %}

{{- text | markdownify
    | replace: ":applications", applications.in_2018.schools
    | replace: ":winners", school_garden_ids_2018.size
    | replace: ":budget", total_budget_2018 }}

{% capture text %}
In February 2019, we announced two competitions:
[a second competition for schools](/projekti/2019/konkurs-za-finansiranje-skolske-baste/)
and
[the first competition for kindergartens](/projekti/2019/konkurs-za-finansiranje-baste-u-vrticima/).
:schools schools and :preschools kindergartens applied, from which we chose
[the :winner\_schools best schools](/projekti/2019/rezultati-konkursa-za-finansiranje-skolske-baste/)
and
[the :winner\_preschools best kindergartens](/projekti/2019/rezultati-konkursa-za-finansiranje-baste-u-vrticima/)
and distributed :budget dinars.
{% endcapture %}

{{- text | markdownify
    | replace: ":schools", applications.in_2019.schools
    | replace: ":preschools", applications.in_2019.preschools
    | replace: ":winner_schools", school_garden_ids_2019.size
    | replace: ":winner_preschools", preschool_garden_ids_2019.size
    | replace: ":budget", total_budget_2019 }}

{% capture text %}
We announced the third round of the competition in 2020. As in the previous
year, we would have
[a competition for schools](/projekti/konkurs-za-finansiranje-skolske-baste/)
and
[a competition for kindergartens](/projekti/konkurs-za-finansiranje-baste-u-vrticima/).
During the state of emergency due to the COVID-19 pandemic, we
received a smaller number of applications. Only :schools schools and :preshools kindergartens
sent in their plans. We selected
[the :winner\_schools best schools](/projekti/rezultati-konkursa-za-finansiranje-skolske-baste/),
and
[all :winner\_preschools kindergartens](/projekti/rezultati-konkursa-za-finansiranje-baste-u-vrticima/)
that submitted applications received financial support. We distributed :budget
dinars.
{% endcapture %}

{{- text | markdownify
    | replace: ":schools", applications.in_2020.schools
    | replace: ":preschools", applications.in_2020.preschools
    | replace: ":winner_schools", school_garden_ids_2020.size
    | replace: ":winner_preschools", preschool_garden_ids_2020.size
    | replace: ":budget", total_budget_2020 }}

{% capture text %}
We plan to announce the fourth round of the competition at the beginning of
2021.
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
    <em>Pannon RTV report</em>
  </div>
</div>

#### Allocation of funds

Most of the funds (about 90%) went to schools, while we distributed about 10%
of the budget to kindergartens.

{% include gardens/funds_allocation.html %}

Complete list of schools and kindergartens:

{% include gardens/table.html %}
