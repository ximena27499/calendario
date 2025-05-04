document.addEventListener("DOMContentLoaded", () => {
    const daysContainer = document.getElementById("days");
    const monthYearDisplay = document.getElementById("monthYear");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const reservationPanel = document.getElementById("reservationPanel");
    const reservationForm = document.getElementById("reservationForm");
    const cancelButton = document.getElementById("cancelButton");
    const salonButtons = document.querySelectorAll("#salonButtons button");
    const reservationSalonInput = document.getElementById("reservationSalon");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const addEventBtn = document.getElementById("addEventBtn");

    let currentDate = new Date();
    let isSelecting = false; // Controla si el usuario está seleccionando fechas
    let startDate = null; // Fecha de inicio seleccionada
    let endDate = null; // Fecha final seleccionada

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Mostrar mes y año
        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        // Obtener el primer día del mes y el número de días en el mes
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Limpiar días anteriores
        daysContainer.innerHTML = "";

        // Agregar días vacíos al inicio
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("day", "empty");
            daysContainer.appendChild(emptyDiv);
        }

        // Agregar días del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = day;

            // Agregar atributo data-date para identificar la fecha
            const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            dayDiv.dataset.date = dateString;

            // Eventos para seleccionar fechas con el cursor
            dayDiv.addEventListener("mousedown", () => {
                isSelecting = true;
                startDate = dateString;
                endDate = dateString;
                updateSelection();
            });

            dayDiv.addEventListener("mouseenter", () => {
                if (isSelecting) {
                    endDate = dateString;
                    updateSelection();
                }
            });

            dayDiv.addEventListener("mouseup", () => {
                isSelecting = false;
                showReservationPanel(startDate, endDate); // Mostrar el panel de reserva
            });

            daysContainer.appendChild(dayDiv);
        }
    }

    function updateSelection() {
        const dayElements = document.querySelectorAll(".day");
        let inRange = false;

        dayElements.forEach(day => {
            const date = day.dataset.date;

            if (date === startDate) {
                inRange = true;
            }

            if (inRange) {
                day.style.background = "#d1e7dd"; // Resaltar las fechas seleccionadas
            } else {
                day.style.background = ""; // Restablecer el fondo
            }

            if (date === endDate) {
                inRange = false;
            }
        });

        // Actualizar los campos de fecha en el formulario
        startDateInput.value = startDate;
        endDateInput.value = endDate;
    }

    // Mostrar el panel de reserva
    function showReservationPanel(startDate, endDate = null) {
        reservationPanel.style.display = 'block';
        document.getElementById('start-date').value = startDate;
        if (endDate) {
            document.getElementById('end-date').value = endDate;
        }
    }

    // Navegar al mes anterior
    prevButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // Navegar al mes siguiente
    nextButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Cerrar el panel de reserva al hacer clic en "Cancelar"
    cancelButton.addEventListener("click", () => {
        reservationPanel.style.display = "none";
    });

    // Agregar funcionalidad para seleccionar un salón
    salonButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Establecer el valor del salón seleccionado
            reservationSalonInput.value = button.dataset.salon;

            // Resaltar el botón seleccionado
            salonButtons.forEach(btn => btn.style.background = "#f9f9f9");
            button.style.background = "#d0d0d0";
        });
    });

    // Mostrar/ocultar el panel de reserva al hacer clic en el botón
    addEventBtn.addEventListener("click", () => {
        if (reservationPanel.style.display === "block") {
            reservationPanel.style.display = "none";
        } else {
            reservationPanel.style.display = "block";
        }
    });

    // Ocultar el panel de reserva si se hace clic fuera de él
    document.addEventListener("click", (e) => {
        if (!reservationPanel.contains(e.target) && e.target !== addEventBtn) {
            reservationPanel.style.display = "none";
        }
    });

    // Renderizar el calendario inicial
    renderCalendar(currentDate);
});
