"use strict";

(() => {

const FONT_NAME = "'Raleway', 'Verdana', 'Arial', sans-serif";
const FONT_SIZE = 14;

function pieCallback(config) {
  const data = google.visualization.arrayToDataTable(config.data);

  if (!config.hasOwnProperty("colors")) {
    config.colors = [
        "#2196f3",  // blue-500
        "#f44336",  // red-500
        "#ff9800",  // orange-500
        "#4caf50",  // green-500
        "#9c27b0",  // purple-500
        "#00bcd4",  // cyan-500
        "#e91e63",  // pink-500
        "#8bc34a",  // light-green-500
    ].slice(0, config.data.length - 1);
  }
  const slices = config.colors.map((color) => ({color: color}));

  const elem = document.getElementById(config.id)
  const chart = new google.visualization.PieChart(elem);

  google.visualization.events.addListener(chart, "onmouseover", (e) => {
    const legend = elem.parentNode.querySelector(".legend");
    legend.querySelectorAll("li:not(.del)")[e.row].classList.add("active");
    legend.classList.add("hover");
  });
  google.visualization.events.addListener(chart, "onmouseout", (e) => {
    const legend = elem.parentNode.querySelector(".legend");
    legend.querySelectorAll("li:not(.del)")[e.row].classList.remove("active");
    legend.classList.remove("hover");
  });

  chart.draw(data, {
    fontName: FONT_NAME,
    fontSize: FONT_SIZE,
    pieHole: 0.4,
    pieSliceText: "percent",
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

function calendarCallback(config) {
  if (!config.hasOwnProperty("locale")) {
    config.locale = "en";
  }

  const dataTable = new google.visualization.DataTable();
  dataTable.addColumn({type: "date", id: "date" });
  dataTable.addColumn({type: "number", id: "value" });
  dataTable.addColumn({type: "string", role: "tooltip", p: {html: true}});
  dataTable.addRows(makeRows(config.data, config.locale));

  const elem = document.getElementById(config.id);
  const chart = new google.visualization.Calendar(elem);

  google.visualization.events.addListener(chart, "ready", () => {
    const textNodes = elem.querySelectorAll("text");

    // Remove legend: [low, mid, high] values.
    textNodes[0].remove();
    textNodes[1].remove();
    textNodes[2].remove();
    // Remove legend box and gradient:
    elem.querySelectorAll("[fill-opacity='1']").forEach((node) => {
      node.remove();
    });
    elem.querySelectorAll("linearGradient").forEach((node) => {
      node.remove();
    });

    // Translate months and weekdays:
    const d = new Date(2000, 0, 2);
    const month = new Intl.DateTimeFormat(config.locale, {
      month: "short",
    });
    const weekday = new Intl.DateTimeFormat(config.locale, {
      weekday: "narrow",
    });
    textNodes.forEach((node, i) => {
      if (i < 4) {
        return;
      }
      if (i < 16) {
        textNodes[i].innerHTML = month.format(new Date(2000, i - 4, 1)).toUpperCase();
        return;
      }
      if (i % 8 === 0) {
        return;
      }
      node.innerHTML = weekday.format(d).toUpperCase();
      d.setDate(d.getDate() + 1);
    });
  });

  chart.draw(dataTable, {
    legend: "none",
    calendar: {
      cellSize: 16,
      monthLabel: {
        fontName: FONT_NAME,
        fontSize: FONT_SIZE,
      },
    },
    tooltip: {
      isHtml: true,
    },
    height: 320,
    width: 920,
  });
}

function makeRows(data, locale) {
  const fmt = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const map = new Map();
  data.forEach((row) => {
    if (row[0].length === 1) {
      map.set(row[0][0], [
        row[0][0],
        row[1],
        makeTooltip(row[2], fmt.format(row[0][0])),
      ]);
    } else {
      dateRange(row[0][0], row[0][1]).forEach((date) => map.set(date, [
        date,
        row[1],
        makeTooltip(row[2], fmt.format(date)),
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

function makeTooltip(text, subtext) {
  const div = document.createElement("div");
  div.className = "tooltip";

  const strong = document.createElement("strong");
  strong.innerText = text;
  div.appendChild(strong);

  const br = document.createElement("br");
  div.appendChild(br);

  const em = document.createElement("em");
  em.innerText = subtext;
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
