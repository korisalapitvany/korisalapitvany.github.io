"use strict";

google.charts.load("current", {
  packages: ["calendar"],
});

google.charts.setOnLoadCallback(() => {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: "date", id: "date" });
  dataTable.addColumn({type: "number", id: "value" });
  dataTable.addColumn({type: "string", role: "tooltip"});
  dataTable.addRows([
    [new Date(2018, 6, 2), -1, "Rezultati konkursa"],
    [new Date(2018, 6, 18), -1, "Potpis ugovora"],
    [new Date(2018, 6, 23), -1, "Prenos sredstava"],
    [new Date(2019, 4, 31), -1, "Rok za slanje dnevnika aktivnosti"],
  ]);
  const submit = new Date(2018, 4, 31);
  dateRange(new Date(2018, 4, 3), new Date(2018, 5, 12)).forEach((date) => {
    if (date.getTime() === submit.getTime()) {
      dataTable.addRow([date, -1, "Prijava na konkurs"]);
    } else {
      dataTable.addRow([date, 0, "Otvoren konkurs"]);
    }
  });
  dateRange(new Date(2018, 8, 1), new Date(2019, 4, 15)).forEach((date) => {
    dataTable.addRow([date, 1, "Realizacija projekta"]);
  });

  const chart = new google.visualization.Calendar(
    document.getElementById("calendar")
  );

  chart.draw(dataTable, {
    legend: "none",
    calendar: {
      cellSize: 16,
      daysOfWeek: "NPUČSPS",
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
