ici on lance le serveur 



tout d'abord l'ouvrir dans un termianl

faire un composer install

ouvrir le fichier .env	(il est generalement cache pour le voir on doit faire affichier les fichier cache)

modifier les informations lie a a base de donne nous avons utilise une ase de donnee mysql 

remplir les champs suivants :

<h2>
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
</h2>

par celle de votre base de donne


faire ensuite un <h2>php artisan migrate</h2>


enfin faire un <h2>php artisan serve</h2> pour lancer le serveur 


se rassurer qu cela tourne sur le port 8000


sinon enlever ce qui occupe le port 8000 et refaire 

