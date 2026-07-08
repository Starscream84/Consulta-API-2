# Dashboard de Estadísticas Educativas

**Autores:** Matias Rosa, Camila Larsen & Matias Nerli

---

## Descripción

Dashboard web que consume datos de una API educativa y los visualiza en gráficos interactivos usando Chart.js.

---

## APIs utilizadas

### 1. Estudiantes

**URL:** `GET /api/testing/estudiantes/1`  
Devuelve el listado completo de alumnos con su nivel educativo (Primario, Secundario, etc.).  
Se usa para mostrar la **composición del alumnado por nivel**.

---

### 2. Asistencia

**URL:** `GET /api/testing/asistencia/1`  
Devuelve la cantidad de presentes y ausentes del día, agrupados por curso.  
Se usa para dos gráficos:

- **Nivel de asistencia general** — total de presentes vs ausentes en toda la institución
- **Comparación de asistencia por curso** — presentes y ausentes desglosados por cada curso

---

### 3. Historial de asistencia

**URL:** `GET /api/testing/historial_asistencia/1`  
Devuelve el porcentaje de asistencia mensual a lo largo del año.  
Se usa para mostrar la **evolución anual de asistencia por mes**.

---

### 4. Calificaciones

**URL:** `GET /api/testing/calificaciones/1`  
Devuelve la proporción de aprobados y desaprobados por curso.  
Se usa para dos gráficos:

- **Nivel general de calificaciones** — promedio institucional de aprobados vs desaprobados
- **Comparativa de calificaciones por curso** — aprobados y desaprobados desglosados por cada curso

---

### 5. Comunicados

**URL:** `GET /api/testing/comunicados/1`  
Devuelve el estado de envío de comunicados: entregados, pendientes y con error.  
Se usa para mostrar el **estado de situación de envío de comunicados**.

---

## Gráficos

| Gráfico                                 | Tipo     | API                  |
| --------------------------------------- | -------- | -------------------- |
| Composición del alumnado por nivel      | Circular | Estudiantes          |
| Nivel de asistencia general             | Circular | Asistencia           |
| Comparación de asistencia por curso     | Barras   | Asistencia           |
| Evolución anual de asistencia por mes   | Lineas   | Historial asistencia |
| Nivel general de calificaciones         | Circular | Calificaciones       |
| Comparativa de calificaciones por curso | Barras   | Calificaciones       |
| Estado de envío de comunicados          | Barras   | Comunicados          |

---

## Tecnologías

- HTML5
- CSS3
- JavaScript
- [Chart.js 4.4.1](https://www.chartjs.org/)
