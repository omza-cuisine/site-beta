document.addEventListener('DOMContentLoaded', function() {
    // Gestion des menus déroulants pour desktop et mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    const hasSubmenus = document.querySelectorAll('.has-submenu');
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        // Comportement pour mobile (clics)
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                menu.style.opacity = menu.style.display === 'block' ? '1' : '0';
                menu.style.visibility = menu.style.display === 'block' ? 'visible' : 'hidden';
            });
        });

        hasSubmenus.forEach(item => {
            const toggle = item.querySelector('a');
            const submenu = item.querySelector('.submenu');
            
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                submenu.style.opacity = submenu.style.display === 'block' ? '1' : '0';
                submenu.style.visibility = submenu.style.display === 'block' ? 'visible' : 'hidden';
            });
        });
    } else {
        // Comportement pour desktop (hover)
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-menu').style.opacity = '1';
                this.querySelector('.dropdown-menu').style.visibility = 'visible';
                this.querySelector('.dropdown-menu').style.display = 'block';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-menu').style.opacity = '0';
                this.querySelector('.dropdown-menu').style.visibility = 'hidden';
            });
        });

        hasSubmenus.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('.submenu').style.opacity = '1';
                this.querySelector('.submenu').style.visibility = 'visible';
                this.querySelector('.submenu').style.display = 'block';
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('.submenu').style.opacity = '0';
                this.querySelector('.submenu').style.visibility = 'hidden';
            });
        });
    }

    // Gestion de la récupération des recettes
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if(category) {
        console.log(`Catégorie sélectionnée : ${category}`);
    }
});