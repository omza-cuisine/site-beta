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
                if (dropdown.classList.contains('has-submenu')) {
                    e.preventDefault(); // Empêche la navigation pour les éléments avec sous-menu
                }
                
                dropdowns.forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                
                dropdown.classList.toggle('active');
            });
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

// Au chargement et au redimensionnement
document.addEventListener('DOMContentLoaded', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

    // Gestion de la récupération des recettes
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if(category) {
        console.log(`Catégorie sélectionnée : ${category}`);
    }
});
// Ajouter cette fonction existante
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
