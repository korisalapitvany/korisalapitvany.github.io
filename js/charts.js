"use strict";

const CHARTS = {
  pie(config) {
    google.charts.setOnLoadCallback(() => {
      const data = google.visualization.arrayToDataTable(config.data);

      if (!config.hasOwnProperty("colors")) {
        config.colors = [
            "#2196f3",  // blue-500
            "#f44336",  // red-500
            "#ff9800",  // orange-500
            "#4caf50",  // green-500
        ].slice(0, config.data.length - 1);
      }
      const slices = config.colors.map((color) => ({color: color}));

      const chart = new google.visualization.PieChart(
        document.getElementById(config.id)
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
        slices: slices,
        height: 320,
        width: 320,
      });
    });
  }
};
