"use strict";

google.charts.setOnLoadCallback(() => {
  const data = google.visualization.arrayToDataTable([
    ["Vrsta ustanove", "Iznos"],
    ["Škole", 862285],
    ["Vrtići", 83937],
  ]);

  const chart = new google.visualization.PieChart(
    document.getElementById("schools-vs-preschools")
  );
  chart.draw(data, {
    pieHole: 0.4,
    fontName: "'Raleway', 'Verdana', 'Arial', sans-serif",
    pieSliceText: "percent",
    fontSize: 14,
    legend: {
      position: "none",
    },
    tooltip: {
      trigger: "none",
    },
    chartArea: {
      top: 16,
      left: 16,
      bottom: 16,
      right: 16,
    },
    slices: [
      {color: "#673ab7"},  // deep-purple
      {color: "#ff5722"},  // deep-orange
    ],
    height: 320,
    width: 320,
  });
});
