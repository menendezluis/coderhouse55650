¿Cómo abordar la segunda práctica integradora?

Primero hay que analizar los puntos que ya tenemos:

* Un sistema de routing para cursos, usuarios y vistas.
* Implementación de Handlebars para el manejo de plantillas.

* Un FileSystem de usuarios y de cursos.
* Modelos que conectan a la base de datos, para las colecciones de usuarios y cursos.

* Una vista para visualizar usuarios.
* Una vista para visualizar cursos.


Por lo tanto, hay que centrarse en los siguientes puntos:

* Modificar los modelos para que puedan trabajar con los ids de referencias de las otras colecciones e implementar búsquedas basadas en populations. Además, agregar los roles "student" y "teacher" al schema de users

* Agregar la lógica para que un usuario se pueda registrar a un curso y el curso pueda ser consciente de sus usuarios estudiantes

* Registro y Login con implementación de una estrategia de passport.

* Creación del token con jwt + envío por cookie.

Consideraciones importantes:

* No perder demasiado tiempo reexplicando toda la lógica de passport, es el punto que más tiempo te quitará si te desenvuelves demasiado en él. La idea es que lo integres, mas no que se dé una clase completa de él otra vez.
* Se te van a brindar vistas ya listas para poder hacer el envío de la información. ¡Te recomiendo ampliamente que las uses para tener el código hecho, en caso de que sientas que estás quedando corto de tiempo!

TODOS LOS CAMBIOS ESTÁN 100% testeados, por lo que se asegura que el funcionamiento será exitoso en caso de copiarse correctamente cada línea del código.

A continuación, se te deja un log de los cambios completos que se han realizado. Eres libre de hacerlo en el orden que necesites, siempre y cuando tengas el tiempo para implementarlo y explicarlo correctamente.

1. Se cambian los modelos de courses (courses.js) y users (users.js) para poder trabajar con referencias de Ids.
2. Se implementaron nuevos métodos a los dbManagers (courses.js y users.js en carpeta dbManagers) (getBy, update, etc). Además, se configuraron para aplicar population al momento de hacer los finds(), además de modificar el modelo de users para contar con un campo password y rol
3. Se implementó lógica para agregar al usuario al curso y viceversa (users.router.js)
4. Se agregaron algunos usuarios y algunos cursos a la base para probar que funcione esta inserción. Además, se hace una consulta a los usuarios y a los cursos para corroborar el correcto funcionamiento de la population.
5. Se crea una carpeta "config", y se crea un archivo passport.config.js
6. Se agrega toda la lógica de registro, login, serializador y deserializador. Se agrega también a app.js para comenzar a utilizarse en el futuro router de sesión.
Nota (paso 6) Notarás que la implementación se está haciendo con base en jwt, de modo que tenemos que colocar "session.false" para que funcione correctamente. En el caso de que estés utilizando express-session, deberás dejar el ajuste según se dicte en passport.
7. Se crea router de sessions para poder agregar la ruta de registro y la ruta de login. La ruta de registro envía sólo un mensaje indicando que se finalizó el registro, mientras que el login de momento sólo accede a la propiedad req.user (se consologuea para corroborar que el proceso de login fue exitoso).
8. Se Agrega jwt para poder crear el token a partir de req.user y se envía en una cookie. 
9. Se configura app para que pueda funcionar con cookies, implementando el middleware de CookieParser
10. Se corrobora que ahora el login genera correctamente el cookie y lo envía al cliente.

¡Hemos terminado!

Te invito a que repases con detalle estos pasos para que puedas evaluar tus propios tiempos de ejecución de cada paso, al final, te servirá para qué partes ir más aceleradas, en cuales puedes tomar más tiempo o qué codigos recomiendas ya tener hechos desde el inicio de la clase (todo es un malabar de tiempos en el cual tú eres el dueño).

Recuerda que también puedes evaluar los tiempos según sea el grupo, pues habrá grupos que habrán entendido muy bien passport, pero habrá otros que tal vez necesiten que se vaya más lento en esa parte. ¡Todo está pensado para ser muy flexible!

Por último, algunas de estas cosas las puedes probar de manera visual, sin embargo, puedes hacerlo también sólo con Postman, ThunderClient, etc.

NUEVOS IMPORTS: 
* passport
* passport-local
* jsonwebtoken
* cookie-parser
* bcrypt