"use strict";

CHARTS.pie({
  id: "schools-vs-preschools",
  data: [
    ["", {
      sr: "Iznos",
      hu: "Összeg",
    }[document.head.parentElement.lang || "sr"] || "Amount"],
    [document.querySelector("[data-i18n=schools]").innerText, BUDGET.schools],
    [document.querySelector("[data-i18n=preschools]").innerText, BUDGET.preschools],
  ],
  colors: [
    "#673ab7",  // deep-purple
    "#ff5722",  // deep-orange
  ],
});
