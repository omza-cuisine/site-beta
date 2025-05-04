document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêche la propagation de l'événement
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
        
        // Fermer le menu quand on clique à l'extérieur
        document.addEventListener('click', function(e) {
            if (!mainMenu.contains(e.target) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });
    }

    // Gestion des dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    function setupMobileMenu() {
        if (window.innerWidth <= 768) {
            // Mode mobile
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                if (link) {
                    link.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            dropdowns.forEach(d => {
                                if (d !== dropdown) {
                                    d.classList.remove('active');
                                }
                            });
                            
                            dropdown.classList.toggle('active');
                        }
                    });
                }
            });

            // Gestion des sous-menus
            hasSubmenus.forEach(item => {
                const link = item.querySelector('a');
                
                if (link) {
                    link.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            e.stopPropagation();
                            item.classList.toggle('active');
                        }
                    });
                }
            });
        } else {
            // Mode desktop
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
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
