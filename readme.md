Bitácora de abordo:
01/07/2022:

Hay dos KO's:

1. El IF del método POST add-favorites no está funcionando bien. Creemos que el fallo está en que cree que siempre es el mismo juego y no hace nada.

2. Cuando hacemos el método POST add-favorites, a Mongo no está llegando el modelo correcto. De hecho, sólo está llegando el campo interno 'comments', que es el único que no viene de la API.

---

03/07/2022:
Solucionados errores anteriores.

Errores actuales:

~~1. Corta cualquier String que esté separado por espacios, quedándose lo primero que encuentra.~~

~~2. El botón delete no funciona pese a haber revisado el código.~~

~~3. El método post no envía correctamente el comentario a Mongo. Se crea el comment solo con _id y no existe el campo comentario en el propio Mongo.~~

~~4. El botón 'more info' navega a la vista /details pero no nos pinta los campos. ~~

5. Ver cómo recuperar los múltiples comentarios del juego en la vista /details del mismo. 
Probablemente editar el modelo de comentarios para añadir el id de API del juego y hacer luego la llamada a esa ID.

---
POST MVP:

a) CSS
b) Botón comentarios en profile según user
c) Pantalla inicio: que muestre directamente el signup y el login
d) Poder borrar el comentario
e) Editar el comentario ?¿?¿

---





