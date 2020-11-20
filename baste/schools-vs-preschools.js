(function() {
  "use strict";

  const id = "schools-vs-preschools";
  const div = document.getElementById(id);

  const totalSchools = totalGrants("school");
  const totalPreschools = totalGrants("preschool");

  fillTotal(div, "school", totalSchools);
  fillTotal(div, "preschool", totalPreschools);

  CHARTS.pie({
    id: "schools-vs-preschools",
    data: [
      ["Vrsta ustanove", "Iznos"],
      ["Škole", totalSchools],
      ["Vrtići", totalPreschools],
    ],
    colors: [
        "#673ab7",  // deep-purple
        "#ff5722",  // deep-orange
    ],
  });

  function totalGrants(cls) {
    return [...document.querySelectorAll(`#grants .${cls} .amount`)]
      .map((td) => parseFloat(td.innerText.replace(/\./, "").replace(/,/, ".")))
      .reduce((a, b) => a + b);
  }

  function fillTotal(div, cls, amount) {
    const span = div.parentElement.querySelector(`.legend .${cls} .amount`);
    span.innerText = amount.toLocaleString("sr-RS", {
      minimumFractionDigits: 2,
    });
  }

}());
