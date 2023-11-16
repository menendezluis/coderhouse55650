class TicketManager {
  eventos;
  #_precioBaseDeGanancia = 0.15;
  static ultimoId = 0;
  constructor() {
    this.eventos = [];
  }

  getEventos() {
    return this.eventos;
  }

  agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
    TicketManager.ultimoId++;
    const evento = {
      id: TicketManager.ultimoId,
      nombre,
      lugar,
      precio: precio + precio * this.#_precioBaseDeGanancia,
      capacidad,
      fecha,
      participantes: [],
    };
    this.eventos.push(evento);
  }

  agregarUsuario(idEvento, idUsuario) {
    if (!idEvento || !idUsuario) {
      throw new Error("Faltan datos");
    }
    const evento = this.eventos.find((datos) => datos.id === idEvento);

    const isAlreadyAdded = evento.participantes.find((id) => id === idUsuario);

    if (evento && !isAlreadyAdded) {
      evento.participantes.push(idUsuario);
    }
  }

  ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
    const eventoOriginal = this.eventos.find(
      (evento) => evento.id === idEvento
    );

    return {
      ...eventoOriginal,
      id: idEvento,
      fecha: nuevaFecha,
      lugar: nuevaLocalidad,
    };
  }
}

const ticketManager = new TicketManager();

ticketManager.agregarEvento(
  "Evento de prueba",
  "Buenos Aires",
  9999,
  100,
  new Date()
);
ticketManager.agregarEvento(
  "Evento de prueba",
  "Cordoba 2",
  4444,
  111,
  new Date()
);

ticketManager.agregarEvento(
  "Mar de plata concierto",
  "Buenos aires",
  5555,
  2222,
  new Date()
);

ticketManager.agregarUsuario(1, "Luis");
ticketManager.agregarUsuario(2, "Kevin");
ticketManager.agregarUsuario(3, "Santiago");
ticketManager.agregarUsuario(1, "Franco");

ticketManager.ponerEventoEnGira(1, "Cordoba", new Date("2024-01-01"));

console.log(ticketManager.getEventos());
