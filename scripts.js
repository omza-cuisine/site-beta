document.addEventListener('DOMContentLoaded', function() {
    // Gestion des menus déroulants
    const dropdowns = document.querySelectorAll('.dropdown');
    const hasSubmenus = document.querySelectorAll('.has-submenu');
    
    function setupMenuInteractions() {
        if (window.innerWidth <= 768) {
            // Mode mobile
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                
                // Supprimer les anciens écouteurs pour éviter les doublons
                link.removeEventListener('click', handleMobileClick);
                link.addEventListener('click', handleMobileClick);
            });
            
            hasSubmenus.forEach(item => {
                const link = item.querySelector('a');
                
                // Supprimer les anciens écouteurs pour éviter les doublons
                link.removeEventListener('click', handleSubmenuClick);
                link.addEventListener('click', handleSubmenuClick);
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
            
            hasSubmenus.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                
                item.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                });
            });
        }
    }
    
    function handleMobileClick(e) {
        e.preventDefault();
        const parent = this.parentElement;
        
        // Fermer les autres menus ouverts
        dropdowns.forEach(dropdown => {
            if (dropdown !== parent) {
                dropdown.classList.remove('active');
            }
        });
        
        parent.classList.toggle('active');
    }
    
    function handleSubmenuClick(e) {
        e.preventDefault();
        const parent = this.parentElement;
        
        // Fermer les autres sous-menus ouverts
        hasSubmenus.forEach(item => {
            if (item !== parent) {
                item.classList.remove('active');
            }
        });
        
        parent.classList.toggle('active');
    }
    
    // Initialisation
    setupMenuInteractions();
    
    // Réinitialiser lors du redimensionnement
    window.addEventListener('resize', function() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        hasSubmenus.forEach(item => {
            item.classList.remove('active');
        });
        setupMenuInteractions();
    });
    
    // Gestion de la récupération des recettes
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if(category) {
        console.log(`Catégorie sélectionnée : ${category}`);
    }
});

// Gestion du header scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
