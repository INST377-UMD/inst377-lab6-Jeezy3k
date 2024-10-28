function initializeMap() {
    var map = L.map('map').setView([39.5, -98.35], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marks = [
        { latitude: getRandomInRange(30, 35, 3), longitude: getRandomInRange(-90, -100, 3) },
        { latitude: getRandomInRange(30, 35, 3), longitude: getRandomInRange(-90, -100, 3) },
        { latitude: getRandomInRange(30, 35, 3), longitude: getRandomInRange(-90, -100, 3) }
    ];

    marks.forEach((coords, index) => {
        const marker = L.marker([coords.latitude, coords.longitude]).addTo(map);

        fetchLocality(coords.latitude, coords.longitude, index + 1);
    });
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

async function fetchLocality(latitude, longitude, markerNum) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    const data = await response.json();
    const locality = data.locality || 'Locality not available';
    document.getElementById(`marker${markerNum}`).textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    document.getElementById(`locality${markerNum}`).textContent = `Locality: ${locality}`;
}

window.onload = initializeMap;
