---
---

@PAGES =
  {% for page in site.pages %}
    {% if page.lang %}
      "{{ page.url }}":
        title: "{{ page.title | default: site.i18n[page.lang].name }}"
        translations:
          {% for tr in page.translations %}
            {% assign lang = tr[0] %}
            {{ lang }}: "{{ site.i18n[lang].prefix }}{{ tr[1] }}/"
          {% endfor %}
    {% endif %}
  {% endfor %}
