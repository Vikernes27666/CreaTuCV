// Función para generar y descargar el PDF
function generarYDescargarPDF() {
    // Ocultar los botones y las secciones que no queremos incluir en el PDF
    document.querySelectorAll('button').forEach(function(button) {
        button.style.display = 'none';
    });
    document.querySelectorAll('.form-section').forEach(function(section) {
        section.style.display = 'none';
    });

    var doc = new jsPDF();
    var lineHeight = 6; // Espaciado entre líneas
    var boldFontSize = 16; // Tamaño de fuente para los títulos en negrita
    var normalFontSize = 12; // Tamaño de fuente normal

    // Agregar la información personal
    doc.setFont("courier"); // Cambiar la fuente a courier (monoespaciada)
    doc.setFontSize(boldFontSize);
    doc.setFontStyle("bold");
    doc.text(20, 20, 'Información Personal');
    doc.setFontSize(normalFontSize);
    doc.setFontStyle("normal");
    doc.text(20, 30, 'Nombre: ' + document.getElementById('nombre').value);
    doc.text(20, 30 + lineHeight, 'Correo electrónico: ' + document.getElementById('email').value);
    doc.text(20, 30 + lineHeight * 2, 'Teléfono: ' + document.getElementById('telefono').value);

    var linkedinLines = doc.splitTextToSize('Perfil de LinkedIn: ' + document.getElementById('linkedin').value, 170);
    if (linkedinLines.length > 1) {
        linkedinLines.forEach(function(line, index) {
            doc.text(20, 30 + lineHeight * (3 + index), line);
        });
    } else {
        doc.text(20, 30 + lineHeight * 3, 'Perfil de LinkedIn: ' + document.getElementById('linkedin').value);
    }

    // Agregar la experiencia laboral
    doc.setFontSize(boldFontSize);
    doc.text(20, 30 + lineHeight * (5 + linkedinLines.length), 'Experiencia Laboral');
    var experienciaItems = document.querySelectorAll('.experiencia-item');
    var yPosition = 30 + lineHeight * (7 + linkedinLines.length);
    experienciaItems.forEach(function (item) {
        doc.setFontSize(normalFontSize);
        var cargo = 'Cargo: ' + item.querySelector('[name="cargo1"]').value;
        var empresa = 'Empresa: ' + item.querySelector('[name="empresa1"]').value;
        var fechas = 'Fechas: ' + item.querySelector('[name="fecha1"]').value;
        var responsabilidades = 'Responsabilidades: ' + item.querySelector('[name="responsabilidades1"]').value;
        var lines = doc.splitTextToSize([cargo, empresa, fechas, responsabilidades], 170);
        doc.text(20, yPosition, lines);
        yPosition += lineHeight * (lines.length + 1);
    });

    // Agregar la educación
    doc.setFontSize(boldFontSize);
    doc.text(20, yPosition, 'Educación');
    var educacionItems = document.querySelectorAll('.educacion-item');
    yPosition += lineHeight * 2;
    educacionItems.forEach(function (item) {
        doc.setFontSize(normalFontSize);
        var titulo = 'Título: ' + item.querySelector('[name="titulo1"]').value;
        var institucion = 'Institución: ' + item.querySelector('[name="institucion1"]').value;
        var fechasEducacion = 'Fechas: ' + item.querySelector('[name="fechaEducacion1"]').value;
        var lines = doc.splitTextToSize([titulo, institucion, fechasEducacion], 170);
        doc.text(20, yPosition, lines);
        yPosition += lineHeight * (lines.length + 1);
    });

    // Agregar las aptitudes
    doc.setFontSize(boldFontSize);
    doc.text(20, yPosition, 'Aptitudes');
    var aptitudesItems = document.querySelectorAll('[name="aptitudes"]');
    yPosition += lineHeight * 2;
    aptitudesItems.forEach(function (item) {
        doc.setFontSize(normalFontSize);
        var lines = doc.splitTextToSize('Aptitud: ' + item.value, 170);
        doc.text(20, yPosition, lines);
        yPosition += lineHeight * (lines.length + 1);
    });

    // Guardar el PDF
    doc.save('cv.pdf');

    // Mostrar los botones y las secciones nuevamente
    document.querySelectorAll('button').forEach(function(button) {
        button.style.display = 'block';
    });
    document.querySelectorAll('.form-section').forEach(function(section) {
        section.style.display = 'block';
    });
}






// Función para agregar una nueva experiencia laboral
function agregarExperiencia() {
    var experienciaSection = document.getElementById('experiencia-section');
    var nuevaExperienciaItem = document.createElement('div');
    nuevaExperienciaItem.className = 'experiencia-item';
    nuevaExperienciaItem.innerHTML = `
        <div class="form-group">
            <label for="cargo1">Cargo:</label>
            <input type="text" id="cargo1" name="cargo1" required>
        </div>
        <div class="form-group">
            <label for="empresa1">Empresa:</label>
            <input type="text" id="empresa1" name="empresa1" required>
        </div>
        <div class="form-group">
            <label for="fecha1">Fechas:</label>
            <input type="text" id="fecha1" name="fecha1" placeholder="Enero de 20xx - Actualmente" required>
        </div>
        <div class="form-group">
            <label for="responsabilidades1">Responsabilidades:</label>
            <textarea id="responsabilidades1" name="responsabilidades1" rows="4" required></textarea>
        </div>
    `;
    experienciaSection.appendChild(nuevaExperienciaItem);
}

// Función para agregar nueva educación
function agregarEducacion() {
    var educacionSection = document.getElementById('educacion-section');
    var nuevaEducacionItem = document.createElement('div');
    nuevaEducacionItem.className = 'educacion-item';
    nuevaEducacionItem.innerHTML = `
        <div class="form-group">
            <label for="titulo1">Título:</label>
            <input type="text" id="titulo1" name="titulo1" required>
        </div>
        <div class="form-group">
            <label for="institucion1">Institución:</label>
            <input type="text" id="institucion1" name="institucion1" required>
        </div>
        <div class="form-group">
            <label for="fechaEducacion1">Fechas:</label>
            <input type="text" id="fechaEducacion1" name="fechaEducacion1" placeholder="Septiembre de 20xx - Mayo de 20xx" required>
        </div>
    `;
    educacionSection.appendChild(nuevaEducacionItem);
}

// Función para agregar nueva aptitud
function agregarAptitud() {
    var aptitudesSection = document.getElementById('aptitudes-section');
    var nuevaAptitudItem = document.createElement('div');
    nuevaAptitudItem.className = 'form-group';
    nuevaAptitudItem.innerHTML = `
        <label for="aptitudes">Aptitudes (separadas por comas):</label>
        <input type="text" id="aptitudes" name="aptitudes" required>
    `;
    aptitudesSection.appendChild(nuevaAptitudItem);
}

