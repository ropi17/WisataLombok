// Check if logged in
const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
    window.location.href = 'login.html';
}

// STATIC DATA (Refactored to use Keys)

const PLACES_DATA = [
    {
        id: "kuta",
        image_url: "images/pantai mandalika.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Kuta+Lombok"
    },
    {
        id: "selong",
        image_url: "images/pantai selong belanak.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Selong+Belanak"
    },
    {
        id: "pink",
        image_url: "images/pantai pink.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Tangsi+Pink+Beach"
    },
    {
        id: "aan",
        image_url: "images/pantai Aan.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Tanjung+Aan"
    },
    {
        id: "senggigi",
        image_url: "images/pantai sengigi.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Senggigi"
    },
    {
        id: "mawun",
        image_url: "images/pantai Mawun.jpg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Mawun"
    },
    {
        id: "trawangan",
        image_url: "images/gili terawangan.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Gili+Trawangan"
    },
    {
        id: "seger",
        image_url: "images/pantai seger.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Seger"
    },
    {
        id: "nanggu",
        image_url: "images/pantai gili nanggu.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Gili+Nanggu+Lombok"
    },
    {
        id: "bangko",
        image_url: "images/pantai bangko bangko.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Bangko+Bangko+Lombok"
    },
    {
        id: "sekotong",
        image_url: "images/pantai sekotong.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Sekotong"
    },
    {
        id: "nambung",
        image_url: "images/pantai nambung.webp",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Nambung"
    },
    {
        id: "batu",
        image_url: "images/pantai batu payung.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Batu+Payung"
    },
    {
        id: "bloam",
        image_url: "images/pantai tanjung bloam.jpeg",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Tanjung+Bloam"
    },
    {
        id: "gerupuk",
        image_url: "images/pantai gerupuk.webp",
        link: "https://www.google.com/maps/search/?api=1&query=Pantai+Gerupuk"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Determine language (default to 'en' or saved pref)
    let currentLang = localStorage.getItem('lang') || 'en';

    // Set Selector Value
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('lang', currentLang);
            updateLanguage(currentLang);
        });
    }

    // Initial Translation via updateLanguage which will calls renderPlaces
    updateLanguage(currentLang);

    // --- NEW FEATURE: User Display ---
    const userDisplay = document.getElementById('user-display');
    if (userDisplay && user) {
        // Show "Hi, [Username]"
        // We need to wait for translation update to prefix "Hi, " correctly, 
        // but for now let's set a simple text and let updateLanguage handle the prefix if possible, 
        // or just set it here directly.
        userDisplay.innerText = `Hi, ${user.username}`;
    }

    // Logout Handler
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    // 1. Update Static UI Elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.innerText = t[key];
        }
    });

    // 2. Re-render Dynamic Content (The Beaches)
    renderPlaces(PLACES_DATA, lang);
}

function renderPlaces(places, lang) {
    const grid = document.getElementById('places-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Get translations for current language
    const t = translations[lang];
    const btnText = t ? t.view_location : "View Location";

    places.forEach((place, index) => {
        // Look up translated name and desc using keys
        // key format: p_{id}_name, p_{id}_desc
        const nameKey = `p_${place.id}_name`;
        const descKey = `p_${place.id}_desc`;

        const displayName = t[nameKey] || place.id;
        const displayDesc = t[descKey] || "";

        const card = document.createElement('div');
        card.className = 'place-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="card-image" style="background-image: url('${place.image_url}')"></div>
            <div class="card-content">
                <h3>${displayName}</h3>
                <p>${displayDesc}</p>
                <button class="btn-location" onclick="openMap('${place.link}')" data-i18n="view_location">${btnText}</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function openMap(url) {
    window.open(url, '_blank');
}
