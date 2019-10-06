"use strict";

CHARTS.calendar({
  id: "calendar",
  data: [
    [[new Date(2018, 4,  3),
      new Date(2018, 5, 12)], -0.25, "Otvoren konkurs"],
    [[new Date(2018, 4, 31)], -1,    "Prijava na konkurs"],
    [[new Date(2018, 6, 2)],  -1,    "Rezultati konkursa"],
    [[new Date(2018, 6, 18)], -1,    "Potpis ugovora"],
    [[new Date(2018, 6, 23)], -1,    "Prenos sredstava"],
    [[new Date(2019, 4, 31)],  1,    "Rok za slanje dnevnika aktivnosti"],
    [[new Date(2018, 8, 1),
      new Date(2019, 4, 15)],  0.75, "Realizacija projekta"],
  ],
});
