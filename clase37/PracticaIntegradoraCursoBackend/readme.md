¿Cómo abordar la tercera práctica integradora?

Primero, como ya será usual, toca dar un vistazo a lo que se tiene.

* Sistema de usuarios con roles "student" y "teacher".
* Sistema de cursos
* Acción de agregar un usuario a un curso en particular. 
* Modelo de registro y login (realizado con passport + jwt)

Ergo, nuestro reto en esta práctica integradora consistirá en:
* Reajustar la arquitectura del proyecto para funcionar a partir de ciertos patrones de diseño.
* Aplicar variables de entorno.
* Aplicar un sistema de políticas a partir del token de jwt
* Enviar correos para determinadas situaciones. 

Consideraciones importantes:

* A estas alturas cada comisión tiene diferentes retos, a algunos se les estará complicando más el modelo de Dao, a algunos tal vez el manejo de políticas. ¡Sé creativo con tus tiempos y hazlos rendir para lo que más necesite tu clase!
* En este punto se muestra dotenv tal como lo visto en clase, si quieres enseñar otra forma de gestionar entornos, estás en completa libertad de hacerlo.

TODOS LOS CAMBIOS ESTÁN 100% testeados, por lo que se asegura que el funcionamiento será exitoso en caso de copiarse correctamente cada línea del código.

A continuación, se te deja un log de los cambios completos que se han realizado, el paso a paso en el cual se estructuró esta rama. Eres libre de hacerlo en el orden que necesites, siempre y cuando tengas el tiempo para implementarlo y explicarlo correctamente.
¡Comenzamos!

1. Se crea un archivo .env para comenzar a colocar las variables de entorno. Se agregan las siguientes variables:
    * MONGO_USER : Usuario de Mongo
    * MONGO_PASSWORD: Password de Mongo
    * MONGO_DATABASE: Base de datos de Mongo.
    * JWT_COOKIE : Cookie que se envía con el token de jwt.
    * JWT_SECRET : Secreto con el que se firma el token en jwt.
2. Se crea un archivo config.js en la carpeta config, éste alojará todas las variables de entorno. Además, se colocará dotenv para poder cargar el archivo .env
3. Se modifica la url de mongo en app.js para que esta vez tome las variables de entorno generadas en config.js, además, se modifica la lógica del token en sessions.js para utilizar también estas variables de entorno con jwt.
4. Se crea una carpeta "repositories" para colocar los repositorios de usuarios y de coursos, además, se crea un archivo UserRepository.js y CoursesRepository.js para poder gestionar los repositorios.
5. Se crea un archivo "services" en la carpeta "repositories", para poder exportar los correspondientes repositorios, además, se reajustan los archivos users.router.js, passport.config.js, courses.router.js, para poder utilizar los servicios de repository exportados del archivo services.js
6. Se mueven TODOS los controladores a una carpeta controllers, sin romper la lógica, sólo es por limpieza de arquitectura.
7. Se instala passport-jwt y se coloca en el passport.config una nueva estrategia "current" para poder extraer la cookie de jwt como lo visto en clases previas. Además, se configura en el mismo archivo una función CookieExtractor para funcionar con la nueva estrategia.
8. Se agrega al controlador una función currentUser que permitirá devolver al usuario devuelto por passport, también se modifica el sessionsRouter para colocar la ruta /current y que mande a llamar el middleware de Passport.
9. Se crea una carpeta "middleware" para colocar el middleware de autenticación, así que se crea un archivo "auth.middleware.js", éste contendrá un sistema de políticas como el visto en clases previas. 
10. Reconfigurar las rutas de "getCourse" y "createCourse" para contar con las políticas ["PUBLIC"] y ["TEACHER"] respectivamente.

11. Se crea el servicio de mailing en la carpeta services y se agregan las variables MAILING_USER, MAILING_SERVICE, MAILING_PASSWORD respectivamente.
12. Se utiliza el servicio de mailing cuando el usuario se ha registrado a algún curso.
¡Hemos terminado!

Te invito a que repases con detalle estos pasos para que puedas evaluar tus propios tiempos de ejecución de cada paso, al final, te servirá para qué partes ir más aceleradas, en cuales puedes tomar más tiempo o qué codigos recomiendas ya tener hechos desde el inicio de la clase (todo es un malabar de tiempos en el cual tú eres el dueño).

Recuerda que también puedes evaluar los tiempos según sea el grupo, pues habrá grupos que habrán entendido muy bien passport, pero habrá otros que tal vez necesiten que se vaya más lento en esa parte. ¡Todo está pensado para ser muy flexible!

NUEVOS IMPORTS:
dotenv
nodemailer
passport-jwt