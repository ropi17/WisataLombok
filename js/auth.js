document.addEventListener('DOMContentLoaded', () => {
    // Set Language for Login Page
    let currentLang = localStorage.getItem('lang') || 'en';
    const langSelect = document.getElementById('language-select');

    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('lang', currentLang);
            updateLanguage(currentLang);
        });
        updateLanguage(currentLang);
    }

    // Check form type
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            // Get users from LocalStorage
            const users = JSON.parse(localStorage.getItem('users_db')) || [];

            // Find user
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                // Set Active Session
                localStorage.setItem('user', JSON.stringify({ username: user.username }));
                alert("Login Success!");
                window.location.href = 'index.html';
            } else {
                alert("Invalid Username or Password!");
            }
        });
    }

    // --- REGISTER LOGIC ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = registerForm.username.value;
            const password = registerForm.password.value;
            const country = registerForm.country.value;

            // Get existing users
            const users = JSON.parse(localStorage.getItem('users_db')) || [];

            // Check if username exists
            if (users.some(u => u.username === username)) {
                alert("Username already taken!");
                return;
            }

            // Add new user
            users.push({ username, password, country });
            localStorage.setItem('users_db', JSON.stringify(users));

            alert("Registration Successful! Please Login.");
            window.location.href = 'login.html';
        });
    }
});

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) element.innerText = t[key];
    });
}
