document.addEventListener('DOMContentLoaded', function() {
    // Gestion mobile - remplacer la gestion existante des dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    function setupMobileMenu() {
        if (window.innerWidth <= 768) {
            // Mode mobile
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Fermer les autres menus ouverts
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                            const submenu = d.querySelector('.dropdown-menu');
                            if (submenu) submenu.style.display = 'none';
                        }
                    });
                    
                    // Basculer l'état du menu actuel
                    dropdown.classList.toggle('active');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        if (dropdown.classList.contains('active')) {
                            menu.style.display = 'block';
                        } else {
                            menu.style.display = 'none';
                        }
                    }
                });
            });

            // Gestion des sous-menus
            hasSubmenus.forEach(item => {
                const link = item.querySelector('a');
                
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    item.classList.toggle('active');
                    const submenu = item.querySelector('.submenu');
                    if (submenu) {
                        if (item.classList.contains('active')) {
                            submenu.style.display = 'block';
                        } else {
                            submenu.style.display = 'none';
                        }
                    }
                });
            });
        } else {
            // Mode desktop
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'block';
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                    const menu = this.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'none';
                });
            });
        }
    }

    // Au chargement et au redimensionnement
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    // Gestion de la récupération des recettes
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if(category) {
        console.log(`Catégorie sélectionnée : ${category}`);
    }

    // Gestion du scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
