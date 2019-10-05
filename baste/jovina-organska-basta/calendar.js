"use strict";

(() => {

const longMonths = [
  "januar", "februar", "mart", "april", "maj", "jun",
  "jul", "avgust", "septembar", "oktobar", "novembar", "decembar",
];

const shortMonths = longMonths.map((month) => month.substr(0, 3));

google.charts.setOnLoadCallback(() => {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: "date", id: "date" });
  dataTable.addColumn({type: "number", id: "value" });
  dataTable.addColumn({type: "string", role: "tooltip", p: {html: true}});
  dataTable.addRows([
    [new Date(2018, 6, 2), -1, "Rezultati konkursa"],
    [new Date(2018, 6, 18), -1, "Potpis ugovora"],
    [new Date(2018, 6, 23), -1, "Prenos sredstava"],
    [new Date(2019, 4, 31), 1, "Rok za slanje dnevnika aktivnosti"],
  ].map((row) => [
    row[0],
    row[1],
    tooltip(row[0], row[2]),
  ]));
  const submit = new Date(2018, 4, 31);
  dateRange(new Date(2018, 4, 3), new Date(2018, 5, 12)).forEach((date) => {
    if (date.getTime() === submit.getTime()) {
      dataTable.addRow([date, -1, tooltip(date, "Prijava na konkurs")]);
    } else {
      dataTable.addRow([date, -0.25, tooltip(date, "Otvoren konkurs")]);
    }
  });
  dateRange(new Date(2018, 8, 1), new Date(2019, 4, 15)).forEach((date) => {
    dataTable.addRow([date, 0.75, tooltip(date, "Realizacija projekta")]);
  });

  const div = document.getElementById("calendar");
  const chart = new google.visualization.Calendar(div);

   google.visualization.events.addListener(chart, "ready", () => {
     const textNodes = div.querySelectorAll("text");
     // Remove legend: [low, mid, high] values.
     textNodes[0].remove();
     textNodes[1].remove();
     textNodes[2].remove();
     // Remove legend box and gradient:
     div.querySelectorAll("[fill-opacity='1']").forEach((node) => {
       node.remove();
     });
     div.querySelectorAll("linearGradient").forEach((node) => {
       node.remove();
     });
     // Translate months:
     shortMonths.forEach((month, i) => {
       textNodes[i + 4].innerHTML = month.toUpperCase();
     });
  });

  chart.draw(dataTable, {
    legend: "none",
    calendar: {
      cellSize: 16,
      daysOfWeek: "NPUSČPS",
      monthLabel: {
        fontName: "'Raleway', 'Verdana', 'Arial', sans-serif",
        fontSize: 14,
      },
    },
    tooltip: {
      isHtml: true,
    },
    height: 320,
    width: 920,
  });
});

function dateRange(start, stop) {
  const result = [new Date(start)];
  while (start < stop) {
    start.setDate(start.getDate() + 1);
    result.push(new Date(start));
  }
  return result;
}

function tooltip(date, text) {
  const div = document.createElement("div");
  div.className = "tooltip";

  const strong = document.createElement("strong");
  strong.innerText = text;
  div.appendChild(strong);

  const br = document.createElement("br");
  div.appendChild(br);

  const em = document.createElement("em");
  em.innerText = `${
    date.getDate()
  }. ${
    longMonths[date.getMonth()]
  } ${
    date.getFullYear()
  }.`;
  div.appendChild(em);

  return div.outerHTML;
}

})();
