![image](https://github.com/MarcOutt/OC_p6/assets/112987151/a6efb1da-f2b7-41bf-9579-151ad808317b)
![image](https://github.com/MarcOutt/OC_p6/assets/112987151/4960ec1a-d5d8-4504-91d0-a56fa45e5122)
![image](https://github.com/MarcOutt/OC_p6/assets/112987151/91e3d929-a890-485c-b923-0822b16189a0)


# JustStreamIt - Projet Web de Classement de Films

## Table des matières
1. [Introduction](#introduction)
2. [Technologies utilisées](#technologies-utilisées)
3. [Installation](#installation)
4. [Utilisation](#utilisation)
5. [Fonctionnalités](#fonctionnalités)
6. [Contraintes Techniques](#contraintes-techniques)
7. [Cahier des charges](#cahier-des-charges)

## Introduction

JustStreamIt est une application web développée pour une association cinématographique. Elle permet à ses abonnés de visualiser en temps réel un classement de films intéressants, en se basant sur les données provenant de l'API OCMovies.

## Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- [OCMovies-API]([lien_vers_le_repo_github_ocmovies_api](http://localhost:8000/api/v1/titles/ )) - L'API maison pour les données de films

### Informations complémentaires sur l'API:
- https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git

## Installation

### 1. Télécharger le projet sur votre répertoire local : 
```
git clone https://github.com/MarcOutt/OC_p6.git
```
### 2. Mettre en place un environnement virtuel :
* Créer l'environnement virtuel: `python -m venv venv`
* Activer l'environnement virtuel :
    * Windows : `venv\Scripts\activate.bat`
    * Unix/MacOS : `source venv/bin/activate`
    
### 3. Installer les dépendances du projet
```
pip install -r requirements.txt
```

## Utilisation

1. Lancez l'application en ouvrant le fichier `index.html` dans votre navigateur.

## Fonctionnalités

- Affichage du film ayant la meilleure note IMDb dans la section "Meilleur film".
- Affichage des 7 films les mieux notés toutes catégories confondues dans la section "Films les mieux notés".
- Affichage des 7 films les mieux notés d'une catégorie donnée dans les sections "Catégorie 1", "Catégorie 2" et "Catégorie 3".
- Possibilité de faire défiler les films dans la section "Films les mieux notés" avec des flèches de navigation.
- Ouverture d'une fenêtre modale avec les informations détaillées d'un film en cliquant sur le bouton "Play" du meilleur film ou sur l'image d'un film.

## Contraintes Techniques

- Le site doit être compatible avec les trois navigateurs les plus utilisés : Chrome, Firefox et Safari.
- Les requêtes AJAX doivent être utilisées pour récupérer les données des films depuis l'API OCMovies et les afficher sur l'interface web.
- La mise à jour des données doit se faire automatiquement pour afficher en temps réel les changements du classement de films.

## Cahier des charges

Le site doit être développé en respectant les spécifications fournies par l'association "nom de l'association". Il doit comprendre les zones suivantes :
- "Meilleur film" : Affichage du film avec la meilleure note IMDb, son titre, un bouton "Play" et le résumé du film.
- "Films les mieux notés" : Affichage des 7 autres films les mieux notés toutes catégories confondues.
- "Catégorie 1", "Catégorie 2" et "Catégorie 3" : Affichage des 7 films les mieux notés d'une catégorie choisie.
- Fenêtre modale : Ouverture d'une fenêtre modale avec les informations détaillées d'un film lorsque l'utilisateur clique sur le bouton "Play" du meilleur film ou sur l'image d'un film.
