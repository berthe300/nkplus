# Site vitrine NK+

Site statique (HTML/CSS/JS, sans build) pour présenter l'application NK+.
Il est **volontairement séparé** du projet Flutter.

Le site présente le déploiement pilote au **Mali** (Bamako) et utilise de
**vraies captures** de l'application (dossier `assets/img/screens/`).

## Aperçu local

Depuis ce dossier :

```bash
python -m http.server 8090
```

Puis ouvrir <http://localhost:8090>.

Le site fonctionne aussi en double-cliquant sur `index.html`, mais le serveur
local est préférable (chemins, téléchargement de l'APK, polices).

## Structure

```
NKPlus-Site/
├── index.html                 # page d'accueil
├── comment-ca-marche.html     # guide détaillé
├── mentions-legales.html      # mentions légales + données personnelles
├── assets/
│   ├── css/style.css          # thème complet (blanc / rouge / marine)
│   ├── js/main.js             # menu mobile, animations, retour en haut
│   ├── img/                   # logo, favicon, image de partage
│   │   └── screens/           # captures réelles de l'application
│   └── downloads/             # APK Android de test
├── robots.txt
└── sitemap.xml
```

## Animation du titre

L'effet machine à écrire du héros est dans `assets/js/main.js` (tableau
`phrases`). La première phrase est aussi écrite dans `index.html` : sans
JavaScript, le message reste lisible. L'animation se met en pause quand
l'onglet passe en arrière-plan et s'arrête si l'utilisateur préfère réduire les
animations.

## À personnaliser avant publication

1. **Domaine** : remplacer `https://nkplus.app/` dans :
   - `index.html` (`og:url`),
   - `robots.txt`,
   - `sitemap.xml`.
2. **Image de partage** : les réseaux sociaux exigent une URL **absolue**
   (`https://votre-domaine/assets/img/og-cover.png`).
3. **Contact** : remplacer `contact@nkplus.app` dans les trois pages.
4. **Mentions légales** : compléter l'éditeur, l'hébergeur, la conservation des
   données et faire valider par un juriste (APDP au Mali).
5. **APK** : joindre la nouvelle version à une release GitHub, puis mettre à
   jour le lien de téléchargement, le nom et la taille dans `index.html`.
6. **Tarifs** : les offres ne sont pas affichées sur le site ; les ajouter si
   elles sont définitivement fixées.
7. **Polices** : le site charge Inter depuis Google Fonts. Pour une
   confidentialité maximale, héberger la police localement.

## Déploiement actuel

- **Site en ligne** : <https://berthe300.github.io/nkplus/>
- **Dépôt** : <https://github.com/berthe300/nkplus>
- **APK 1.0.1** : <https://github.com/berthe300/nkplus/releases/tag/v1.0.1>
- Hébergement : **GitHub Pages** (branche `main`, racine du dépôt).

Pour mettre à jour le site :

```bash
git add -A
git commit -m "Mise à jour du site"
git push origin main
```

GitHub Pages reconstruit automatiquement le site. L'APK n'est pas stocké dans le
dépôt : il est joint à une **release GitHub** (les fichiers exécutables sont
refusés par l'offre gratuite de Firebase Hosting).

## Autres hébergeurs

Le site est 100 % statique. Il peut aussi être publié sur :

- **Netlify** : glisser-déposer le dossier ;
- **Vercel** : importer le dossier comme projet statique ;
- **GitHub Pages** : pousser le contenu dans une branche `gh-pages` ;
- **OVH / cPanel** : envoyer les fichiers dans `www/`.

Configurer ensuite le domaine et HTTPS. Tester :

- l'ouverture des trois pages ;
- le menu mobile ;
- le téléchargement de l'APK ;
- les liens `mailto:` ;
- l'image de partage (Open Graph).

## Notes

- Aucun cookie publicitaire, aucun script de suivi.
- Le site ne collecte aucune donnée : le formulaire de contact n'existe pas
  encore. Si un formulaire est ajouté, prévoir un backend (Formspree, Netlify
  Forms, API) et mettre à jour la politique de confidentialité.
- L'APK fourni est signé avec la clé **debug** : il convient aux tests, pas à
  une publication Play Store.
