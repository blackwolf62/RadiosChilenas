let currentAudio = null; // Variable para almacenar el audio actual
let activeItem = null; // Variable para almacenar el elemento activo

async function fetchRadios() {
    try {
        const response = await fetch('https://api.boostr.cl/radios.json');
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        const radioList = document.getElementById('radioList');

        data.data.forEach(radio => {
            const listItem = document.createElement('li');
            listItem.className = 'radio-item';
            listItem.innerHTML = `
                        <img src="${radio.image['200']}" alt="${radio.name}" onclick="toggleRadio(this, '${radio.stream}')">
                        <div class="controls">
                            <button onclick="playRadio('${radio.stream}', this)">Reproducir</button>
                            <button onclick="stopRadio()">Detener</button>
                        </div>
                        <div class="spectrum"></div>
                    `;
            radioList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener las radios:', error);
        alert('No se pudo cargar la lista de radios. Intenta de nuevo más tarde.');
    }
}

function toggleRadio(imgElement, streamUrl) {
    const radioItem = imgElement.closest('.radio-item');
    if (radioItem.classList.contains('active')) {
        stopRadio();
    } else {
        playRadio(streamUrl, imgElement);
    }
}

function playRadio(streamUrl, button) {
    if (currentAudio) {
        currentAudio.pause();
        if (activeItem) {
            activeItem.classList.remove('active');
        }
    }
    currentAudio = new Audio(streamUrl);
    currentAudio.play();
    activeItem = button.closest('.radio-item');
    activeItem.classList.add('active');
}

function stopRadio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        if (activeItem) {
            activeItem.classList.remove('active');
            activeItem = null;
        }
    }
}

fetchRadios();