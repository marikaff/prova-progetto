// Riferimenti agli elementi HTML
const uploadButton = document.querySelector('.upload-btn');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupForm = document.getElementById('popupForm');

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

        // Mostra il popup
        popup.classList.remove('hidden');
        popup.classList.add('visible');
    } else {
        fileList.textContent = 'Nessun file selezionato.';
    }
});

// Gestisce la chiusura del popup
closePopup.addEventListener('click', () => {
    popup.classList.remove('visible');
    popup.classList.add('hidden');
});

// Gestisce il salvataggio dei dati dal popup
popupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita il comportamento di submit predefinito

    // Ottieni i valori inseriti
    const docName = document.getElementById('docName').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    // Log dei dati (puoi inviarli a un server se necessario)
    console.log({
        nome: docName,
        materia: subject,
        descrizione: description,
    });

    // Nascondi il popup
    popup.classList.remove('visible');
    popup.classList.add('hidden');

    // Reset del form
    popupForm.reset();
});