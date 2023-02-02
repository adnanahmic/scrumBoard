import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Sprint } from "../../types/Sprint.types";
import { Ticket } from "../../types/Ticket.types";
import { getAllSprints, getAllTickets, removeSprint } from "../../utils/store";

const SprintPage = () => {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setSprints([...getAllSprints()]);
  }, []);

  useEffect(() => {
    setTickets([...getAllTickets()]);
  }, []);

  const handleRemoveSprint = (id: number) => {
    removeSprint(id);
    setSprints([...getAllSprints()]);
    setTickets([...getAllTickets()]);
  };

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
        <Typography variant="h4">All Sprints</Typography>
        <Grid container sx={{ py: 4, px: 6 }} rowSpacing={3}>
          {sprints?.map((sprint) => {
            const sprintTickets = tickets?.filter(
              (ticket) => ticket?.sprintId === sprint?.id
            );
            return (
              <Grid item xs={12} key={sprint?.id}>
                <Accordion sx={{ boxShadow: "none" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      border: "1px solid #f0f0f0",
                      borderRadius: 2,
                      ".MuiAccordionSummary-content": {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    }}
                  >
                    <Typography variant="h6">{sprint?.name}</Typography>
                    <Typography variant="caption" sx={{ mr: 6 }}>
                      {format(new Date(sprint?.startDate ?? ""), "dd/MM/yyyy")}{" "}
                      - {format(new Date(sprint?.endDate ?? ""), "dd/MM/yyyy")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ background: "#f6f6f6" }}>
                    <Grid
                      container
                      sx={{ py: 4, px: 3 }}
                      rowSpacing={3}
                      columnSpacing={3}
                    >
                      {sprintTickets?.map((ticket) => (
                        <Grid item key={ticket?.id}>
                          <Card sx={{ minWidth: 200 }}>
                            <CardContent
                              sx={{ textAlign: "left", minHeight: 100 }}
                            >
                              <Typography variant="h5" component="div">
                                {ticket?.title}
                              </Typography>
                              <Typography variant="body2" sx={{ pt: 2 }}>
                                {ticket?.description}
                              </Typography>
                            </CardContent>
                            <Divider />
                            <CardActions
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                                sx={{ textTransform: "none" }}
                                onClick={() =>
                                  handleRemoveSprint(Number(ticket?.id))
                                }
                              >
                                Delete
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SprintPage;
