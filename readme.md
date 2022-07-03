Bitácora de abordo:
01/07/2022:

Hay dos KO's:

1. El IF del método POST add-favorites no está funcionando bien. Creemos que el fallo está en que cree que siempre es el mismo juego y no hace nada.

2. Cuando hacemos el método POST add-favorites, a Mongo no está llegando el modelo correcto. De hecho, sólo está llegando el campo interno 'comments', que es el único que no viene de la API.

---

03/07/2022:
Solucionados errores anteriores.

Errores actuales:

1. Corta cualquier String que esté separado por espacios, quedándose lo primero que encuentra.

2. El botón delete no funciona pese a haber revisado el código.
