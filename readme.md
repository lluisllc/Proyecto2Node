
Hay dos KO's:
1) El IF del método POST add-favorites no está funcionando bien. Creemos que el fallo está en que cree que siempre es el mismo juego y no hace nada.

2) Cuando hacemos el método POST add-favorites, a Mongo no está llegando el modelo correcto. De hecho, sólo está llegando el campo interno 'comments', que es el único que no viene de la API.