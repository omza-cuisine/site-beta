import json
import os
from pathlib import Path

def add_new_recipe():
    # Demander les informations sur la nouvelle recette
    print("\n=== Ajout d'une nouvelle recette ===")
    title = input("Nom de la recette: ").strip()
    
    # Choix de la catégorie
    print("\nCatégories disponibles:")
    print("1. Casse Croute")
    print("2. Plats")
    print("3. Desserts")
    category_choice = input("Choisissez le numéro de la catégorie (1-3): ").strip()
    
    categories = {
        '1': {'name': 'Casse Croute', 'file': 'casse-croute.html'},
        '2': {'name': 'Plats', 'file': 'plats.html'},
        '3': {'name': 'Desserts', 'file': 'desserts.html'}
    }
    
    if category_choice not in categories:
        print("Choix invalide. Utilisation de 'Plats' par défaut.")
        category_choice = '2'
    
    category = categories[category_choice]
    
    # Demander les ingrédients
    print("\nEntrez les ingrédients (un par ligne, laissez vide pour terminer):")
    ingredients = []
    while True:
        ingredient = input("> ").strip()
        if not ingredient:
            break
        ingredients.append(ingredient)
    
    # Demander les étapes de préparation
    print("\nEntrez les étapes de préparation (une par ligne, laissez vide pour terminer):")
    preparation = []
    while True:
        step = input("> ").strip()
        if not step:
            break
        preparation.append(step)
    
    # Nom du fichier image (sans extension)
    image_name = input("\nNom du fichier image (sans extension, ex: 'macaron'): ").strip()
    if not image_name:
        image_name = "logo"
    
    # ID pour l'ancre HTML (sans espaces et en minuscules)
    recipe_id = title.lower().replace(' ', '').replace("'", "")
    
    # 1. Ajouter la recette au fichier JSON
    add_to_json(title, category['name'], recipe_id, ingredients)
    
    # 2. Ajouter la recette à la page HTML de la catégorie
    add_to_category_html(category['file'], title, recipe_id, ingredients, preparation, image_name)
    
    # 3. Mettre à jour la liste des recettes (liste-recette.html)
    update_recipe_list(title, category['name'], recipe_id, ingredients, image_name)
    
    print(f"\nLa recette '{title}' a été ajoutée avec succès dans la catégorie '{category['name']}'!")

def add_to_json(title, category, recipe_id, ingredients):
    json_path = Path('recettes.json')
    
    # Charger les recettes existantes
    if json_path.exists():
        with open(json_path, 'r', encoding='utf-8') as f:
            recipes = json.load(f)
    else:
        recipes = []
    
    # Créer la nouvelle entrée
    new_recipe = {
        "title": title,
        "category": category,
        "url": f"{category.lower().replace(' ', '-')}.html#{recipe_id}",
        "ingredients": ingredients
    }
    
    # Ajouter la nouvelle recette
    recipes.append(new_recipe)
    
    # Sauvegarder
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(recipes, f, indent=4, ensure_ascii=False)

def add_to_category_html(category_file, title, recipe_id, ingredients, preparation, image_name):
    file_path = Path(category_file)
    
    # Charger le contenu existant ou créer un nouveau template
    if file_path.exists():
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    else:
        # Template de base si le fichier n'existe pas
        content = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{category_file.replace('.html', '')} - OmZa Cuisine</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <header>
        <a href="index.html" class="logo">OmZa Cuisine</a>
        <button class="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <nav>
            <ul class="main-menu">
                <li><a href="index.html">Accueil</a></li>
                <li><a href="liste-recette.html">Liste des recettes</a></li>
                <li class="dropdown">
                    <a href="#">Liste par catégorie <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="casse-croute.html">Casse Croute</a></li>
                        <li><a href="plats.html">Plats</a></li>
                        <li><a href="desserts.html">Desserts</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <form class="search-bar" id="searchForm">
            <input type="text" id="searchInput" placeholder="Rechercher une recette..." required>
            <button type="submit"><i class="fas fa-search"></i></button>
        </form>
    </header>

    <main>
        <section class="recette-template">   
            <!-- Les recettes seront ajoutées ici -->
        </section>
    </main>
    <footer>
        <p>&copy; 2025 OmZa Cuisine. Tous droits réservés.</p>
        <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
        </div>
    </footer>

    <script src="scripts.js"></script>
</body>
</html>"""
    
    # Trouver la section où ajouter la nouvelle recette
    section_start = content.find('<section class="recette-template">')
    section_end = content.find('</section>', section_start) + len('</section>')
    section_content = content[section_start:section_end]
    
    # Créer le HTML pour la nouvelle recette
    new_recipe_html = f"""
            <div class="recette-category">
                <h2 id="{recipe_id}">{title}</h2>
                <div class="recette-grid">
                    <div class="recette-photo">
                        <img src="images/{image_name}.jpeg" alt="{title.lower().replace(' ', '')}" onerror="this.src='images/logo.jpeg'">
                    </div>
                    <div class="recette-ingredients">
                        <h3>Ingrédients</h3>
                        <ul>
                            {''.join([f'<li>{ing}</li>' for ing in ingredients])}
                        </ul>
                    </div>
                    <div class="recette-preparation">
                        <h3>Préparation</h3>
                        <ol>
                            {''.join([f'<li>{step}</li>' for step in preparation])}
                        </ol>
                    </div>
                </div>
            </div>
    """
    
    # Insérer la nouvelle recette dans la section
    if '<div class="recette-category">' in section_content:
        # Ajouter après la dernière recette
        insert_pos = section_content.rfind('</div>') + len('</div>')
        updated_section = (
            section_content[:insert_pos] + 
            '\n' + new_recipe_html + 
            section_content[insert_pos:]
        )
    else:
        # Première recette de la catégorie
        updated_section = section_content.replace(
            '<!-- Les recettes seront ajoutées ici -->', 
            new_recipe_html
        )
    
    # Mettre à jour le contenu complet
    updated_content = content[:section_start] + updated_section + content[section_end:]
    
    # Sauvegarder
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)

def update_recipe_list(title, category, recipe_id, ingredients, image_name):
    file_path = Path('liste-recette.html')
    
    if not file_path.exists():
        print("Fichier liste-recette.html non trouvé.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Trouver l'emplacement d'insertion exact
    insertion_marker = '<!-- FIN DES RECETTES EXISTANTES -->'
    
    if insertion_marker not in content:
        # Créer le marqueur si absent
        content = content.replace('</div>', f'{insertion_marker}\n</div>', 1)
    
    # Générer le HTML de la nouvelle carte
    new_card = f"""
        <div class="recette-card">
            <div class="recette-photo">
                <img src="images/{image_name}.jpeg" alt="{title}" onerror="this.src='images/logo.jpeg'">
            </div>
            <div class="recette-ingredients">
                <h3><a href="{category.lower().replace(' ', '-')}.html#{recipe_id}">{title}</a></h3>
                <p>Catégorie: {category}</p>
                <ul>
                    {''.join(f'<li>{ing}</li>' for ing in ingredients[:2])}
                    {'<li>...</li>' if len(ingredients) > 2 else ''}
                </ul>
            </div>
        </div>
    """.strip()

    # Insérer avant le marqueur
    updated_content = content.replace(insertion_marker, f"{new_card}\n{insertion_marker}")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)

if __name__ == "__main__":
    add_new_recipe()