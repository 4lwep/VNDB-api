const userVnChart = (finished, playing, dropped, wishlist) => {
  let ctx = document.getElementById("userStatistics").getContext("2d");

  let myChart = new Chart(ctx, {
    type: "pie", // Tipo de gráfico (bar, line, pie, etc.)
    data: {
      labels: ["Terminadas", "Jugando", "Abandonadas", "Deseadas"], // Etiquetas
      datasets: [
        {
          label: "Cantidaad",
          data: [finished, playing, dropped, wishlist], // Datos
          backgroundColor: [
            "rgba(51, 18, 167, 1)",
            "rgba(120, 255, 86, 1)",
            "rgba(255, 86, 218, 1)",
            "rgba(255, 86, 86, 1)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      // para personalizar el comportamiento y la apariencia del gráfico
      scales: {
        //opción scales configura distintas opciones de las escalas de los ejes
        y: {
          //configuramos la escala del eje y
          beginAtZero: true, //le decimos que empiece en 0
        },
      },
    },
  });
};

const yearlyVnChart = (years, count) => {
  let ctx = document.getElementById("yearlyVnCount").getContext("2d");

  let myChart = new Chart(ctx, {
    type: "bar", // Tipo de gráfico (bar, line, pie, etc.)
    data: {
      labels: years, // Etiquetas
      datasets: [
        {
          label: "Cantidad de juegos",
          data: count, // Datos
          backgroundColor: [
            "rgba(51, 18, 167, 1)",
            "rgba(51, 18, 167, 1)",
            "rgba(51, 18, 167, 1)",
            "rgba(51, 18, 167, 1)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      // para personalizar el comportamiento y la apariencia del gráfico
      scales: {
        //opción scales configura distintas opciones de las escalas de los ejes
        y: {
          //configuramos la escala del eje y
          beginAtZero: true, //le decimos que empiece en 0
        },
      },
    },
  });
};
