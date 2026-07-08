async function cargarDashboard() {
  try {
    // API 1: ESTUDIANTES - Composición por nivel

    const resEstudiantes = await fetch(
      // Llama a la API
      "https://apidemo.geoeducacion.com.ar/api/testing/estudiantes/1",
    );
    const jsonEstudiantes = await resEstudiantes.json(); // Convierte la respuesta a un objeto Javascript
    const estudiantes = jsonEstudiantes.data; // Accede al array de datos dentro del objeto

    const porNivel = {};
    estudiantes.forEach((e) => {
      porNivel[e.nivel] = (porNivel[e.nivel] || 0) + 1;
    }); // Recorre y suma + 1 a cada nivel segun corresponda

    new Chart(document.getElementById("estudiantes"), {
      type: "doughnut", // Tipo de grafico
      data: {
        // Los datos
        labels: Object.keys(porNivel), // Los textos que aparecen que aparecen
        datasets: [
          {
            label: "Alumnos",
            data: Object.values(porNivel),
            backgroundColor: [
              "#4e79a7",
              "#f28e2b",
              "#59a14f",
            ],
          },
        ],
      },
      options: {
        // Opciones visuales
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Composición del alumnado por nivel",
          },
        },
      },
    });

    // API 2: ASISTENCIA

    const resAsistencia = await fetch(
      "https://apidemo.geoeducacion.com.ar/api/testing/asistencia/1",
    );
    const jsonAsistencia = await resAsistencia.json();
    const asistencia = jsonAsistencia.data;

    // Gráfico 2: Nivel de asistencia GENERAL (presentes vs ausentes totales)
    const totalPresentes = asistencia.reduce(
      (acc, a) => acc + a.presentes,
      0,
    );
    const totalAusentes = asistencia.reduce(
      // Recorre array y va acumulando ausentes
      (acc, a) => acc + a.ausentes,
      0, // Valor inicial
    );

    new Chart(
      document.getElementById("asistenciasGeneral"),
      {
        type: "pie",
        data: {
          labels: ["Presentes", "Ausentes"],
          datasets: [
            {
              data: [totalPresentes, totalAusentes],
              backgroundColor: ["#59a14f", "#e15759"],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Nivel de asistencia general",
            },
          },
        },
      },
    );

    // Gráfico 3: Comparación de asistencia POR CURSO
    const cursos = asistencia.map((a) => a.curso); // Extrae los cursos
    const presentes = asistencia.map((a) => a.presentes); // Extrae presentes
    const ausentes = asistencia.map((a) => a.ausentes); // Extrae ausentes

    new Chart(document.getElementById("asistencias"), {
      type: "bar",
      data: {
        labels: cursos,
        datasets: [
          {
            label: "Presentes",
            data: presentes,
            backgroundColor: "#59a14f",
          },
          {
            label: "Ausentes",
            data: ausentes,
            backgroundColor: "#e15759",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Comparación de asistencia por curso",
          },
        },
        scales: { y: { beginAtZero: true } },
      },
    });

    // API 3: HISTORIAL ASISTENCIA - Evolución anual

    const resHistorial = await fetch(
      "https://apidemo.geoeducacion.com.ar/api/testing/historial_asistencia/1",
    );
    const jsonHistorial = await resHistorial.json();
    const historial = jsonHistorial.data;

    // Ordenar por nro_mes por las dudas
    historial.sort((a, b) => a.nro_mes - b.nro_mes); // Ordena el array de menor a mayor

    const meses = historial.map((h) => h.mes); // Extrae meses
    const porcentajes = historial.map((h) =>
      (h.asistencia * 100).toFixed(1),
    );

    new Chart(
      document.getElementById("asistenciasPorMes"),
      {
        type: "line",
        data: {
          labels: meses,
          datasets: [
            {
              label: "Asistencia (%)",
              data: porcentajes,
              borderColor: "#4e79a7",
              backgroundColor: "rgba(78,121,167,0.15)",
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Evolución anual de asistencia por mes",
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { callback: (v) => v + "%" },
            },
          },
        },
      },
    );

    // API 4: CALIFICACIONES
    const resCalif = await fetch(
      "https://apidemo.geoeducacion.com.ar/api/testing/calificaciones/1",
    );
    const jsonCalif = await resCalif.json();
    const calificaciones = jsonCalif.data;

    // Gráfico 5: Nivel GENERAL de calificaciones (promedio aprobados/desaprobados)
    const totalAprobados = calificaciones.reduce(
      (acc, c) => acc + c.aprobados,
      0,
    );
    const totalDesaprobados = calificaciones.reduce(
      (acc, c) => acc + c.desaprobados,
      0,
    );
    const cantCursos = calificaciones.length;

    new Chart(document.getElementById("calificaciones"), {
      type: "doughnut",
      data: {
        labels: ["Aprobados", "Desaprobados"],
        datasets: [
          {
            data: [
              ((totalAprobados / cantCursos) * 100).toFixed(
                1,
              ),
              (
                (totalDesaprobados / cantCursos) *
                100
              ).toFixed(1),
            ],
            backgroundColor: ["#59a14f", "#e15759"],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Nivel general de calificaciones (promedio institucional)",
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ctx.label + ": " + ctx.raw + "%",
            },
          },
        },
      },
    });

    // Gráfico 6: Calificaciones POR CURSO
    const cursosCalif = calificaciones.map((c) => c.curso);
    const aprobadosPct = calificaciones.map((c) =>
      (c.aprobados * 100).toFixed(1),
    );
    const desaprobadosPct = calificaciones.map((c) =>
      (c.desaprobados * 100).toFixed(1),
    );

    new Chart(
      document.getElementById("calificacionPorNivel"),
      {
        type: "bar",
        data: {
          labels: cursosCalif,
          datasets: [
            {
              label: "Aprobados (%)",
              data: aprobadosPct,
              backgroundColor: "#59a14f",
            },
            {
              label: "Desaprobados (%)",
              data: desaprobadosPct,
              backgroundColor: "#e15759",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Comparativa de calificaciones por curso",
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { callback: (v) => v + "%" },
            },
          },
        },
      },
    );

    // API 5: COMUNICADOS

    const resComunicados = await fetch(
      "https://apidemo.geoeducacion.com.ar/api/testing/comunicados/1",
    );
    const jsonComunicados = await resComunicados.json();
    const com = jsonComunicados.data[0];

    new Chart(
      document.getElementById("envioDeComunicados"),
      {
        type: "bar",
        data: {
          labels: ["Entregados", "Pendientes", "Con error"],
          datasets: [
            {
              label: "Comunicados",
              data: [
                com.entregados,
                com.pendientes,
                com.error,
              ],
              backgroundColor: [
                "#59a14f",
                "#f28e2b",
                "#e15759",
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `Estado de comunicados (Total: ${com.total})`,
            },
            legend: { display: false },
          },
          scales: { y: { beginAtZero: true } },
        },
      },
    );
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

cargarDashboard();
