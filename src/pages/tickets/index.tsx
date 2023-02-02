import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AssignSprintForm from "../../components/forms/AssignSprint.form";
import { Sprint } from "../../types/Sprint.types";
import { Ticket } from "../../types/Ticket.types";
import { getAllSprints, getAllTickets } from "../../utils/store";

const TicketPage = () => {
  const [ticketToUpdate, setTicketToUpdate] = useState<number | undefined>(
    undefined
  );
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setSprints([...getAllSprints()]);
  }, []);

  useEffect(() => {
    setTickets([...getAllTickets()]);
  }, []);

  useEffect(() => {
    setTickets([...getAllTickets()]);
  }, [ticketToUpdate]);

  return (
    <Grid
      container
      sx={{ pt: 12, px: 4, pb: 4, background: "#f0f0f0", flexGrow: 1 }}
    >
      <Paper
        sx={{
          p: 3,
          flexGrow: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="h4">All Tickets</Typography>
        <Grid container sx={{ py: 8, px: 6 }} rowSpacing={3} columnSpacing={3}>
          {tickets?.map((ticket) => {
            const ticketSprint = sprints?.find(
              (sp) => sp?.id === ticket?.sprintId
            );
            return (
              <Grid item key={ticket?.id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent sx={{ textAlign: "left", minHeight: 150 }}>
                    {ticketSprint && (
                      <Typography variant="caption">
                        {`Sprint: ${ticketSprint?.name}`}
                      </Typography>
                    )}
                    <Typography variant="h5" component="div">
                      {ticket?.title}
                    </Typography>
                    <Typography variant="body2" sx={{ pt: 2 }}>
                      {ticket?.description}
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: "none" }}
                      disabled={!!ticketSprint}
                      onClick={() => setTicketToUpdate(ticket?.id)}
                    >
                      Assign Sprint
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
      <AssignSprintForm
        ticketToUpdate={ticketToUpdate}
        onClose={() => setTicketToUpdate(undefined)}
      />
    </Grid>
  );
};

export default TicketPage;
