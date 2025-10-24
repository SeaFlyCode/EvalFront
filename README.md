# 🧑‍💼 EvalFront - Application de Gestion d'Utilisateurs

Une application React moderne et performante pour gérer et visualiser des utilisateurs, avec une interface élégante et de nombreuses fonctionnalités avancées.

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?logo=vite)

## ✨ Fonctionnalités

### 🎨 Interface Utilisateur
- **Thème Clair/Sombre** : Système de thème complet avec détection automatique des préférences système et persistance localStorage
- **Design Moderne** : Interface élégante avec animations fluides et transitions CSS
- **Responsive** : Optimisé pour mobile, tablette et desktop
- **Animations** : 
  - Fade-in échelonné pour les cartes
  - Effets hover sophistiqués
  - Transitions douces sur tous les éléments
  - Skeleton loaders pendant le chargement

### 👥 Gestion des Utilisateurs
- **Liste d'utilisateurs** : Affichage en grille avec cartes élégantes
- **Page de détails** : Informations complètes pour chaque utilisateur
  - Informations personnelles
  - Caractéristiques physiques
  - Entreprise
  - Adresse
  - Autres informations
- **Navigation fluide** : React Router pour une navigation SPA

### 🔍 Recherche et Filtrage
- **Barre de recherche** : Recherche en temps réel par nom, prénom ou email
- **Tri dynamique** : Menu déroulant avec 5 options
  - Aucun tri
  - Nom (A → Z)
  - Nom (Z → A)
  - Âge (croissant)
  - Âge (décroissant)
- **Optimisé avec useMemo** : Performances optimales même avec beaucoup de données

### 📄 Pagination
- **10 utilisateurs par page** : Navigation facile
- **Compteur de résultats** : Affichage du nombre total et de la plage actuelle
- **Boutons de navigation** : Précédent/Suivant avec états désactivés

### ⭐ Système de Favoris
- **Bouton étoile** sur chaque carte
- **Persistance localStorage** : Les favoris sont sauvegardés même après fermeture du navigateur
- **Animation** : Effet de pulsation lors de l'ajout aux favoris
- **Gestion globale** : Context API React pour l'état partagé

### 🎯 Chargement et Erreurs
- **Spinner élégant** : Animation à 4 anneaux concentriques pour les chargements
- **Skeleton Loaders** : Cartes "squelettes" avec effet shimmer pendant le chargement
- **Délai minimum** : 1 seconde de chargement pour une expérience cohérente
- **Messages d'erreur stylisés** : 
  - Animation shake de l'icône
  - Bouton "Réessayer" pour relancer les requêtes
  - Design moderne avec dégradés

### 🛡️ Gestion d'Erreur
- **Error Boundary** : Capture les erreurs React au niveau global
- **Try-Catch** : Gestion d'erreur complète dans tous les composants
- **Gestionnaires globaux** : Capture des promesses rejetées et erreurs non gérées
- **Validation** : Validation avec Zod pour les données de l'API

## 🚀 Technologies Utilisées

### Core
- **React 19.1.1** - Bibliothèque UI avec les dernières fonctionnalités
- **TypeScript 5.9.3** - Typage statique pour plus de sécurité
- **Vite 7.1.7** - Build tool ultra-rapide
- **React Router DOM 7.9.4** - Routing côté client

### UI & Styling
- **CSS Variables** - Système de thème dynamique
- **Lucide React** - Bibliothèque d'icônes modernes
- **CSS Animations** - Transitions et animations personnalisées

### Validation & Qualité
- **Zod 4.1.12** - Validation de schémas TypeScript
- **ESLint** - Linting du code
- **TypeScript ESLint** - Règles ESLint pour TypeScript

## 📦 Installation

```bash
# Cloner le repository
git clone <votre-repo>
cd EvalFront

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter le code
npm run lint
```

## 🏗️ Structure du Projet

```
EvalFront/
├── src/
│   ├── api/
│   │   └── dummy.ts              # Appels API et validation Zod
│   ├── components/
│   │   ├── ErrorMessage.tsx      # Message d'erreur stylisé
│   │   ├── LoadingSpinner.tsx    # Spinner de chargement
│   │   ├── SkeletonCard.tsx      # Skeleton loader pour les cartes
│   │   ├── ThemeToggle.tsx       # Bouton de changement de thème
│   │   ├── UserCard.tsx          # Carte utilisateur dans la liste
│   │   ├── UserDetail.tsx        # Page de détails utilisateur
│   │   └── UserList.tsx          # Page liste des utilisateurs
│   ├── context/
│   │   ├── FavoritesContext.tsx  # Context pour les favoris
│   │   └── ThemeContext.tsx      # Context pour le thème
│   ├── styles/
│   │   ├── App.css
│   │   ├── ErrorMessage.css
│   │   ├── index.css             # Variables CSS globales
│   │   ├── LoadingSpinner.css
│   │   ├── SkeletonCard.css
│   │   ├── ThemeToggle.css
│   │   ├── UserCard.css
│   │   ├── UserDetail.css
│   │   └── UserList.css
│   ├── type/
│   │   └── user.ts               # Types TypeScript
│   ├── App.tsx                   # Composant racine avec Error Boundary
│   └── main.tsx                  # Point d'entrée avec gestion d'erreur globale
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## 🎨 Fonctionnalités de l'Interface

### Mode Clair/Sombre
Le système de thème utilise des variables CSS qui changent automatiquement :
- Détection automatique de la préférence système au premier lancement
- Bouton fixe en haut à droite (Lune ☾ / Soleil ☀)
- Sauvegarde automatique du choix dans localStorage
- Transition fluide de 300ms sur tous les éléments

### Animations
- **Fade-in échelonné** : Les cartes apparaissent une par une avec un délai de 0.05s
- **Hover effects** : Les cartes "flottent" au survol avec transformation et ombre
- **Skeleton shimmer** : Effet de vague lumineuse sur les loaders
- **Shake** : Animation de tremblement pour les erreurs

### Optimisations Performances
- **useMemo** : Évite les recalculs de filtrage et tri inutiles
- **useCallback** : Mémoïse les fonctions pour éviter les re-rendus
- **Lazy loading** : Chargement optimisé des composants
- **Code splitting** : Grâce à Vite

## 🔌 API

L'application utilise l'API [DummyJSON](https://dummyjson.com/users) pour récupérer les données utilisateurs.

### Endpoints utilisés :
- `GET /users?limit=30` - Liste des utilisateurs
- `GET /users/{id}` - Détails d'un utilisateur

## 🎯 Fonctionnalités Avancées

### Context API
Deux contextes globaux pour gérer l'état de l'application :
- **ThemeContext** : Gestion du thème clair/sombre
- **FavoritesContext** : Gestion des utilisateurs favoris

### localStorage
Persistance des données côté client :
- **Thème** : Clé `app-theme`
- **Favoris** : Clé `user-favorites`

### Error Handling
Gestion d'erreur à plusieurs niveaux :
1. **Niveau API** : Try-catch dans toutes les fonctions réseau
2. **Niveau Composant** : Try-catch dans les opérations de données
3. **Niveau React** : Error Boundary pour capturer les erreurs de rendu
4. **Niveau Global** : Gestionnaires pour les erreurs non capturées

## 🎨 Palette de Couleurs

### Mode Clair
- Background primaire : `#f8fafc`
- Background secondaire : `#ffffff`
- Texte primaire : `#0f172a`
- Texte secondaire : `#334155`
- Accent : `#6366f1`

### Mode Sombre
- Background primaire : `#0f172a`
- Background secondaire : `#1e293b`
- Texte primaire : `#f1f5f9`
- Texte secondaire : `#e2e8f0`
- Accent : `#6366f1`

## 📝 Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Créer le build de production
- `npm run preview` - Prévisualiser le build de production
- `npm run lint` - Vérifier la qualité du code

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 License

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ en utilisant React, TypeScript et Vite.

---

**Note** : Ce projet a été créé à des fins éducatives et de démonstration.

