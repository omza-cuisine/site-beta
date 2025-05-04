document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger (uniquement sur mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    // Vérifie si les éléments existent avant d'ajouter les écouteurs
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Gestion des dropdowns existante
    const dropdowns = document.querySelectorAll('.dropdown');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    function setupMobileMenu() {
        if (window.innerWidth <= 768) {
            // Mode mobile
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                if (link) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        dropdowns.forEach(d => {
                            if (d !== dropdown) {
                                d.classList.remove('active');
                                const submenu = d.querySelector('.dropdown-menu');
                                if (submenu) submenu.style.display = 'none';
                            }
                        });
                        
                        dropdown.classList.toggle('active');
                        const menu = dropdown.querySelector('.dropdown-menu');
                        if (menu) {
                            menu.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                        }
                    });
                }
            });

            // Gestion des sous-menus
            hasSubmenus.forEach(item => {
                const link = item.querySelector('a');
                
                if (link) {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        item.classList.toggle('active');
                        const submenu = item.querySelector('.submenu');
                        if (submenu) {
                            submenu.style.display = item.classList.contains('active') ? 'block' : 'none';
                        }
                    });
                }
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

    // Initialisation
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    // Gestion du scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Gestion de la récupération des recettes
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (category) {
        console.log(`Catégorie sélectionnée : ${category}`);
    }
});
