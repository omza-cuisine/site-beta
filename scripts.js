document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger (votre code existant)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    function toggleMenu() {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
    
    // Ajoute cette condition pour fermer les dropdowns quand le menu se ferme
    if (!mainMenu.classList.contains('active')) {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        }
    }
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        document.addEventListener('click', function(e) {
            if (!mainMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });
    }

    // Gestion des dropdowns (votre code existant)
    function setupDropdowns() {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        dropdowns.forEach(d => {
                            if (d !== dropdown) d.classList.remove('active');
                        });
                        
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }

    setupDropdowns();
    window.addEventListener('resize', setupDropdowns);

    // Gestion du scroll (votre code existant)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Nouveau code pour la recherche
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Simulation de recherche (remplacez par votre vrai code JSON plus tard)
                const mockRecettes = [
                    {
                        title: "Mille Trous",
                        category: "Casse Croute",
                        url: "recette.html?cat=Mille Trous",
                        ingredients: ["farine", "semoule fine", "eau tiède", "levure boulangère", "levure chimique"]
                    },
                    {
                        title: "Tajine",
                        category: "Plats",
                        url: "recette.html?cat=Plats",
                        ingredients: ["viande", "légumes", "épices"]
                    }
                ];
                
                const results = mockRecettes.filter(recette => 
                    recette.title.toLowerCase().includes(searchTerm) ||
                    recette.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
                );
                
                if (results.length > 0) {
                    sessionStorage.setItem('searchResults', JSON.stringify(results));
                    window.location.href = 'liste-recette.html?search=' + encodeURIComponent(searchTerm);
                } else {
                    alert('Aucune recette trouvée pour : ' + searchTerm);
                }
            }
        });
    }

    // Afficher les résultats si on est sur la page liste-recette.html
    if (window.location.pathname.includes('liste-recette.html')) {
        displaySearchResults();
    }
});

function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        const results = JSON.parse(sessionStorage.getItem('searchResults') || [];
        const section = document.querySelector('.recette-template');
        
        if (section) {
            if (results.length > 0) {
                section.innerHTML = `
                    <h2>Résultats pour "${searchTerm}"</h2>
                    <div class="recette-grid">
                        ${results.map(recette => `
                            <div class="recette-card">
                                <div class="recette-photo">
                                    <img src="images/${recette.title.replace(/\s+/g, '_')}.jpeg" 
                                         alt="${recette.title}" 
                                         onerror="this.src='images/logo.jpeg'">
                                </div>
                                <div class="recette-ingredients">
                                    <h3><a href="${recette.url}">${recette.title}</a></h3>
                                    <p>Catégorie: ${recette.category}</p>
                                    ${recette.ingredients ? `<ul>
                                        ${recette.ingredients.slice(0, 3).map(ing => `<li>${ing}</li>`).join('')}
                                        ${recette.ingredients.length > 3 ? '<li>...</li>' : ''}
                                    </ul>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                section.innerHTML = `
                    <div class="no-results">
                        <h2>Aucun résultat trouvé pour "${searchTerm}"</h2>
                        <p>Suggestions :</p>
                        <ul>
                            <li>Vérifiez l'orthographe</li>
                            <li>Utilisez des termes plus généraux</li>
                            <li>Essayez d'autres mots-clés</li>
                        </ul>
                        <a href="liste-recette.html" class="btn">Voir toutes les recettes</a>
                    </div>
                `;
            }
        }
    } else {
        // Afficher toutes les recettes si pas de terme de recherche
        const section = document.querySelector('.recette-template');
        if (section) {
            section.innerHTML = `
                <h2>Toutes nos recettes</h2>
                <div class="category-links">
                    <a href="casse-croute.html" class="btn">Casse-croûte</a>
                    <a href="plats.html" class="btn">Plats principaux</a>
                    <a href="desserts.html" class="btn">Desserts</a>
                </div>
            `;
        }
    }
}