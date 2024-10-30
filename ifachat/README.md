
# FOAD du 30-10-2024 NodeJS Socket.io

CSI CEPPIC 2024 - DWWM CEPPIC 2024

Bonjour à tous,
Voici les instructions pour votre FOAD d'aujourd'hui :
A partir du projet NodeJS "IFACHAT" realisé ensemble dont vous trouverez une copie dans le partage, vous devrez réaliser les fonctionnalités suivantes :

## Affichage des Clients

Pour chaque utilisateurs connecté au serveur, ce dernier devra recevoir depuis le serveur un tableau d'objet qui contiendra pour chaque utilisateur :
- socket.id
- pseudo

Cette liste devra afficher sur la partie front tous les utilisateurs connectés à partir de leur pseudo dans un element de type 

``` `<p onclick="displaySomething(${socket.id})">${pseudo}</p>` ```
(https://www.w3schools.com/jsref/event_onclick.asp)

## Gestion des messages privés

Au click sur un utilisateur connecté dans cette liste un popup devra afficher une fenetre TinyMCE et un bouton d'envoie qui permettra d'envoyer un message UNIQUEMENT à cette utilisateur.

L'utilisateur à qui est destiné ce message privé revevera un "event socket.io" qui devra faire apparaitre ce message dans une nouvelle fenetre popup.

## Habillage CSS (Facultatif)

Avec le temps qui vous restera je vous demande d'utiliser ou au minimum de rechercher une solution de type library css pour rendre l'application jolie 🫶

Bon courage à tous et à jeudi.