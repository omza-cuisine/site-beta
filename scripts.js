document.addEventListener('DOMContentLoaded', function() {
    // Gestion des menus
    const dropdowns = document.querySelectorAll('.dropdown');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    function setupMobileMenu() {
        // Mode mobile
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });

        hasSubmenus.forEach(item => {
            const link = item.querySelector('a');
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // Empêche le déclenchement du parent
                    item.classList.toggle('active');
                }
            });
        });
    }

    // Mode desktop (survol)
    function setupDesktopMenu() {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => dropdown.classList.add('active'));
            dropdown.addEventListener('mouseleave', () => dropdown.classList.remove('active'));
        });
    }

    // Détection initiale
    if (window.innerWidth <= 768) setupMobileMenu();
    else setupDesktopMenu();

    // Redimensionnement
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) setupMobileMenu();
        else setupDesktopMenu();
    });
});

// Header scroll (garder cette partie)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});
