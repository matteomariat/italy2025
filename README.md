# Ombrie & Marches Guide - Application Web

Une application web simple et efficace pour votre guide de voyage en Ombrie et dans les Marches du 8 au 22 août 2025.

## 🚀 Fonctionnalités

### ✨ Interface Utilisateur
- **Design mobile-first** : Optimisé pour tous les appareils
- **Navigation intuitive** : Boutons pour naviguer entre les jours
- **Interface moderne** : Design épuré avec animations fluides
- **Responsive** : S'adapte parfaitement aux écrans mobiles et desktop

### 📱 Fonctionnalités Interactives
- **Marquage des activités** : Cases à cocher pour marquer les activités comme terminées
- **Détails des activités** : Modal avec informations complètes (tarifs, horaires, descriptions)
- **Carte interactive** : Intégration Leaflet pour visualiser les lieux
- **Sauvegarde automatique** : Progression sauvegardée localement
- **Navigation clavier** : Raccourcis (Échap pour fermer les modals)

### 🗺️ Cartographie
- **Carte interactive** : Basée sur OpenStreetMap via Leaflet
- **Marqueurs** : Points d'intérêt sur la carte
- **Modal dédié** : Affichage en plein écran

### 📊 Organisation des Données
- **Structure par jour** : Chaque jour a sa propre page
- **Sections matin/après-midi** : Organisation claire des activités
- **Restaurants et hébergements** : Informations détaillées
- **Détails pratiques** : Tarifs, horaires, durées

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec Flexbox et Grid
- **JavaScript ES6+** : Fonctionnalités interactives
- **Leaflet.js** : Cartographie interactive
- **OpenStreetMap** : Données cartographiques
- **Inter Font** : Typographie moderne

## 📁 Structure du Projet

```
italy2025/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript
├── italy.json          # Données du voyage
├── instruction.md      # Spécifications
└── README.md           # Documentation
```

## 🚀 Installation et Utilisation

### Installation Locale
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. L'application se charge automatiquement

### Serveur Local (Recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve .

# Avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## 📱 Utilisation

### Navigation
- **Boutons de navigation** : Cliquez sur les jours pour naviguer
- **Défilement horizontal** : Navigation tactile sur mobile
- **Indicateur actif** : Le jour actuel est mis en évidence

### Activités
- **Cases à cocher** : Marquez les activités comme terminées
- **Bouton "Détails"** : Voir les informations complètes
- **Bouton "Carte"** : Localiser sur la carte interactive

### Carte
- **Modal plein écran** : Affichage optimisé
- **Marqueurs** : Points d'intérêt cliquables
- **Fermeture** : Clic en dehors ou bouton X

### Sauvegarde
- **Automatique** : Toutes les 5 secondes
- **LocalStorage** : Données persistantes
- **Pas de serveur requis** : Fonctionne hors ligne

## 🎨 Design et UX

### Principes de Design
- **Mobile-first** : Optimisé pour les petits écrans
- **Accessibilité** : Contraste et navigation clavier
- **Performance** : Chargement rapide et animations fluides
- **Simplicité** : Interface épurée et intuitive

### Palette de Couleurs
- **Primaire** : Dégradé bleu-violet (#667eea → #764ba2)
- **Secondaire** : Gris neutres (#f8f9fa, #6c757d)
- **Accent** : Orange pour restaurants (#ff9800)
- **Succès** : Bleu pour activités (#1976d2)

## 🔧 Personnalisation

### Modifier les Données
Éditez `italy.json` pour :
- Ajouter/modifier des activités
- Changer les restaurants
- Mettre à jour les hébergements
- Ajouter des coordonnées GPS

### Personnaliser le Style
Modifiez `styles.css` pour :
- Changer les couleurs
- Ajuster la typographie
- Modifier les animations
- Adapter le layout

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Chrome (recommandé)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### Fonctionnalités Requises
- JavaScript ES6+
- CSS Grid/Flexbox
- LocalStorage
- Fetch API

## 🚀 Déploiement

### Hébergement Statique
L'application peut être déployée sur :
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Tout hébergeur web statique

### Configuration
Aucune configuration serveur requise - l'application fonctionne entièrement côté client.

## 📞 Support

Pour toute question ou suggestion d'amélioration, n'hésitez pas à :
- Vérifier la console du navigateur pour les erreurs
- Tester sur différents appareils
- Adapter les données selon vos besoins

---

**Bon voyage en Ombrie et dans les Marches ! 🇮🇹** 