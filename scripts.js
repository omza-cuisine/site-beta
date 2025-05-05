document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger (version corrigée)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    function toggleMenu() {
        const isActive = mainMenu.classList.contains('active');
        menuToggle.classList.toggle('active', !isActive);
        mainMenu.classList.toggle('active', !isActive);
        document.body.style.overflow = isActive ? '' : 'hidden';
        
        if (!isActive) {
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
                document.body.style.overflow = '';
            }
        });
    }

    // Gestion des dropdowns (identique)
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

    // Gestion du scroll (identique)
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Nouveau code pour la recherche (version corrigée)
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                try {
                    const response = await fetch('recettes.json');
                    if (!response.ok) throw new Error('Erreur de chargement des recettes');
                    
                    const allRecettes = await response.json();
                    
                    const results = allRecettes.filter(recette => 
                        recette.title.toLowerCase().includes(searchTerm) ||
                        (recette.ingredients && recette.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)))
                    );
                    
                    if (results.length > 0) {
                        sessionStorage.setItem('searchResults', JSON.stringify(results));
                        window.location.href = 'liste-recette.html?search=' + encodeURIComponent(searchTerm);
                    } else {
                        alert('Aucune recette trouvée pour : ' + searchTerm);
                    }
                } catch (error) {
                    console.error('Erreur:', error);
                    alert('Une erreur est survenue lors de la recherche');
                }
            }
        });
    }

    // Afficher les résultats SI recherche, sinon garder l'affichage initial
    if (window.location.pathname.includes('liste-recette.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');
        
        if (searchTerm) {
            displaySearchResults();
        }
        // Sinon, on laisse le contenu HTML initial tel quel
    }
});

function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        const results = JSON.parse(sessionStorage.getItem('searchResults') || []);
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
    }
}