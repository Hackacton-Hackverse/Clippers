```
fonctionnalite du site web
```

1. En-tête :
   - Logo de l'entreprise ou de l'application
   - Menu de navigation avec des liens vers les différentes sections (Accueil, Offres d'emploi, Profil, Déconnexion)

2. Section Accueil :
   - Présentation de l'entreprise ou de l'application
   - Dernières offres d'emploi disponibles
   - Bouton pour accéder à la liste complète des offres d'emploi

3. Section Offres d'emploi :
   - Liste des offres d'emploi disponibles avec des informations telles que le titre du poste, la description et la date de publication
   - Possibilité de filtrer les offres d'emploi par catégorie ou par localisation
   - Bouton pour postuler à une offre d'emploi

4. Section Profil :
   - Informations sur l'utilisateur telles que le nom, l'adresse e-mail et le numéro de téléphone
   - Historique des candidatures soumises
   - Possibilité de mettre à jour les informations du profil

5. Pied de page :
   - Liens vers les mentions légales, la politique de confidentialité et les conditions d'utilisation
   - Coordonnées de l'entreprise ou de l'application



```
tables
```

1. Table "Offres d'emploi" :
   - ID (identifiant unique)
   - Titre de l'offre
   - Description de l'offre
   - Conditions requises
   - Statut (disponible, prise)
   - Date de publication
   - ID de l'administrateur responsable de l'offre

2. Table "Utilisateurs" :
   - ID (identifiant unique)
   - Nom
   - Prénom
   - Adresse email
   - Mot de passe (haché)
   - Rôle (étudiant, administrateur)

3. Table "Candidatures" :
   - ID (identifiant unique)
   - ID de l'offre à laquelle la candidature est liée
   - ID de l'étudiant candidat
   - CV (lien vers le fichier)
   - Autres éléments requis pour la candidature

4. Table "Catégories" :
   - ID (identifiant unique)
   - Nom de la catégorie (domaines, compétences requises...)

5. Table "Offre_Categories" (table de liaison entre les offres d'emploi et les catégories) :
   - ID de l'offre
   - ID de la catégorie

