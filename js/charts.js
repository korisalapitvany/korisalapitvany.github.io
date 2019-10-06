"use strict";

(() => {

function pieCallback(config) {
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
}

const i18n = {
  sr: {
    months: [
      "januar", "februar", "mart", "april", "maj", "jun",
      "jul", "avgust", "septembar", "oktobar", "novembar", "decembar",
    ],
  },
};
i18n.sr.shortMonths = i18n.sr.months.map((month) => month.substr(0, 3));

function calendarCallback(config) {
  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: "date", id: "date" });
  dataTable.addColumn({type: "number", id: "value" });
  dataTable.addColumn({type: "string", role: "tooltip", p: {html: true}});
  dataTable.addRows(makeRows(config.data));

  const div = document.getElementById(config.id);
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
     i18n.sr.shortMonths.forEach((month, i) => {
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
}

function makeRows(data) {
  const map = new Map();
  data.forEach((row) => {
    if (row[0].length === 1) {
      map.set(row[0][0], [
        row[0][0],
        row[1],
        makeTooltip(row[0][0], row[2]),
      ]);
    } else {
      dateRange(row[0][0], row[0][1]).forEach((date) => map.set(date, [
        date,
        row[1],
        makeTooltip(date, row[2]),
      ]));
    }
  });

  // IE does not support map.values().
  const rows = [];
  map.forEach((value) => rows.push(value));
  rows.sort((a, b) => {
    if (a[0].getTime() > b[0].getTime()) {
      return 1;
    }
    if (a[0].getTime() < b[0].getTime()) {
      return -1;
    }
    return 0;
  });
  return rows;
}

function dateRange(start, stop) {
  const result = [new Date(start)];
  while (start < stop) {
    start.setDate(start.getDate() + 1);
    result.push(new Date(start));
  }
  return result;
}

function makeTooltip(date, text) {
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
    i18n.sr.months[date.getMonth()]
  } ${
    date.getFullYear()
  }.`;
  div.appendChild(em);

  return div.outerHTML;
}

window.CHARTS = {
  pie(config) {
    google.charts.setOnLoadCallback(() => {
      pieCallback(config);
    });
  },

  calendar(config) {
    google.charts.setOnLoadCallback(() => {
      calendarCallback(config);
    });
  },
};

})();
