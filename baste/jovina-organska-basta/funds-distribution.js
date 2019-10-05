"use strict";

google.charts.setOnLoadCallback(() => {
  const data = google.visualization.arrayToDataTable([
    ["Vrsta ustanove", "Iznos"],
    ["Materijal i oprema za nadogradnju bašte", 75820],
    ["Alati i oprema za baštu", 20957.5],
    ["Setveni i sadni materijal", 16950],
    ["Ambalaža za pakovanje i deklaracija", 14400],
  ]);

  const chart = new google.visualization.PieChart(
    document.getElementById("funds-distribution")
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
      {color: "#2196f3"},  // blue-500
      {color: "#f44336"},  // red-500
      {color: "#ff9800"},  // orange-500
      {color: "#4caf50"},  // green-500
    ],
    height: 320,
    width: 320,
  });
});
