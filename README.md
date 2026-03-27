# Portfolio

## Structure du projet

```
portfolio/
├── index.html              ← Page principale (ne pas modifier sauf besoin spécifique)
├── css/
│   └── style.css           ← Styles (typographie, grille, fondus, hover)
├── js/
│   └── script.js           ← ⭐ C'EST ICI QUE TU AJOUTES TES CONTENUS
└── assets/
    ├── images/             ← Place tes images ici
    └── videos/             ← Place tes vidéos ici
```

## Comment ajouter tes contenus

### 1. Place tes fichiers dans `assets/`

- Images → `assets/images/`
- Vidéos → `assets/videos/`

### 2. Ouvre `js/script.js` et modifie le tableau `PORTFOLIO_DATA`

Chaque item est une ligne du type :

```js
{ type: "image", src: "assets/images/photo1.jpg", caption: "Ma légende, 2024", ratio: "16:9" },
```

### Propriétés

| Propriété | Description | Exemples |
|-----------|-------------|----------|
| `type` | Type de média | `"image"` ou `"video"` |
| `src` | Chemin vers le fichier | `"assets/images/photo.jpg"` |
| `caption` | Légende affichée en bas | `"Sans titre, 2024"` |
| `ratio` | Ratio d'aspect | `"4:5"`, `"2:3"`, `"9:16"`, `"16:9"` |

### Ratios disponibles

| Ratio | Orientation | Exemple |
|-------|-------------|---------|
| `"16:9"` | Paysage large | Vidéos, photos panoramiques |
| `"4:5"` | Portrait léger | Instagram portrait |
| `"2:3"` | Portrait | Photo classique |
| `"9:16"` | Portrait étroit | Stories, reels |

### 3. Ouvre `index.html` dans ton navigateur

Pour prévisualiser en local, utilise l'extension **Live Server** dans VS Code (clic droit sur `index.html` → Open with Live Server).

## Personnalisation rapide

- **Espacement grille** : dans `style.css` cherche `gap: 5px` et dans `script.js` cherche `const GAP = 5`
- **Marges page** : dans `style.css` cherche `padding: 5px` et dans `script.js` cherche `const PADDING = 5`
- **Nombre de lignes visibles** : dans `script.js` cherche `/ 2.5` dans `getRowHeight()`
- **Taille typo** : dans `style.css` cherche `font-size: 16px`
- **Interligne** : dans `style.css` cherche `line-height: 18px`
- **Hauteur fondu** : dans `style.css` cherche `height: 15px` dans `.fade-overlay`
