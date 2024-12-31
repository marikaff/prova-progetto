// Riferimenti agli elementi HTML
const uploadButton = document.querySelector('.upload-btn');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Quando si clicca il pulsante, viene aperto il selettore di file
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

// Quando il file viene selezionato
fileInput.addEventListener('change', () => {
    // Svuota la lista dei file caricati
    fileList.innerHTML = '';

    // Ottieni il file selezionato (solo uno, visto che non c'è 'multiple')
    const file = fileInput.files[0];

    // Verifica se è stato selezionato un file
    if (file) {
        // Crea un elemento per il file
        const fileItem = document.createElement('div');
        fileItem.innerHTML = `📄 ${file.name} <span>(${(file.size / 1024).toFixed(2)} KB)</span>`;
        fileList.appendChild(fileItem);
    } else {
        fileList.textContent = 'Nessun file selezionato.';
    }
});