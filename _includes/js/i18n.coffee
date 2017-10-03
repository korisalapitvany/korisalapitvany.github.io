preferredLanguages = navigator.languages or []

pageLanguage = document.documentElement.lang
pageLanguageScore = preferredLanguages.indexOf pageLanguage

detectTranslations = =>
  unless "PAGES" of @
    setTimeout detectTranslations, 200
    return

  path = location.pathname
  page = PAGES[path]
  return unless page

  score = pageLanguageScore
  preferredLanguage = pageLanguage
  for tr, p of page.translations
    currentScore = preferredLanguages.indexOf tr
    if currentScore < score
      path = p
      score = currentScore
      preferredLanguage = tr

  if score < pageLanguageScore
    link = document.querySelector ".languages .#{preferredLanguage}"
    link?.classList.add "hint"

detectTranslations()
