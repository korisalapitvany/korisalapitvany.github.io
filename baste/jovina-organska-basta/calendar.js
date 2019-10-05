"use strict";

google.charts.setOnLoadCallback(() => {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: "date", id: "date" });
  dataTable.addColumn({type: "number", id: "value" });
  dataTable.addColumn({type: "string", role: "tooltip"});
  dataTable.addRows([
    [new Date(2018, 6, 2), -1, "Rezultati konkursa"],
    [new Date(2018, 6, 18), -1, "Potpis ugovora"],
    [new Date(2018, 6, 23), -1, "Prenos sredstava"],
    [new Date(2019, 4, 31), 1, "Rok za slanje dnevnika aktivnosti"],
  ]);
  const submit = new Date(2018, 4, 31);
  dateRange(new Date(2018, 4, 3), new Date(2018, 5, 12)).forEach((date) => {
    if (date.getTime() === submit.getTime()) {
      dataTable.addRow([date, -1, "Prijava na konkurs"]);
    } else {
      dataTable.addRow([date, -0.25, "Otvoren konkurs"]);
    }
  });
  dateRange(new Date(2018, 8, 1), new Date(2019, 4, 15)).forEach((date) => {
    dataTable.addRow([date, 0.75, "Realizacija projekta"]);
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
     [
       "jan", "feb", "mar", "apr", "maj", "jun",
       "jul", "avg", "sep", "okt", "nov", "dec",
     ].forEach((month, i) => {
       textNodes[i + 4].innerHTML = month;
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
      isHtml: false,
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
