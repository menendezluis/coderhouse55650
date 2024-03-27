export default class TicketService {
    constructor(repo) {
        this.repo = repo;
    }
    
  async createTicket(ticket) {
    try {
        const newTicket = await this.repo.create(ticket);
        return newTicket;
    }
    catch (error) {
        throw error;
    }
}
    
    async getTickets() {
        try {
            const tickets = await this.repo.get();
            return tickets;
        }
        catch (error) {
            throw error;
        }
    }
   
    getTicket = async (id) => {
        try{
        let tickets = await this.getById(id);
        if (!tickets) return;
        return tickets.find((ticket) => ticket.id == id);
        }
        catch (error) {
            throw error;
        }
    };
    }
