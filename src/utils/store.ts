import { Sprint } from "../types/Sprint.types";
import { Ticket } from "../types/Ticket.types";

export const getData = (name: string): Ticket[] | Sprint[] =>
  JSON.parse(localStorage.getItem(name) ?? "[]");

export const setData = (name: string, data: Ticket[] | Sprint[]) =>
  localStorage.setItem(name, JSON.stringify(data));

export const getAllTickets = (): Ticket[] => getData("tickets");
export const getAllSprints = (): Sprint[] => getData("sprints");

export const saveNewTicket = (data: Ticket) => {
  const tickets = getAllTickets();
  setData("tickets", [...tickets, data]);
};

export const saveNewSprint = (data: Sprint) => {
  const sprints = getAllSprints();
  setData("sprints", [...sprints, data]);
};

export const assignSprint = (ticketId: number, sprintId: number) => {
  const tickets = getAllTickets();
  const remaningTickets = tickets?.filter(
    (ticket) => Number(ticket?.id) !== Number(ticketId)
  );
  const updatedTicket = {
    ...tickets?.find((ticket) => ticket?.id === ticketId),
    sprintId,
  };
  remaningTickets?.unshift(updatedTicket);
  setData("tickets", remaningTickets);
};

export const removeSprint = (ticketId: number) => {
  const tickets = getAllTickets();
  const remaningTickets = tickets?.filter(
    (ticket) => Number(ticket?.id) !== Number(ticketId)
  );
  const updatedTicket = {
    ...tickets?.find((ticket) => ticket?.id === ticketId),
    sprintId: undefined,
  };
  remaningTickets?.unshift(updatedTicket);
  setData("tickets", remaningTickets);
};
