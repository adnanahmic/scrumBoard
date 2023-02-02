import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import CreateSprintForm from "../../components/forms/CreateSprint.form";
import CreateTicketForm from "../../components/forms/CreateTicket.form";
import CreateModal from "../../components/modals/Create.modal";

const Home = () => {
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);
  const [openSprintModal, setOpenSprintModal] = useState<boolean>(false);

  return (
    <Grid
      container
      sx={{ pt: 12, px: 4, pb: 4, background: "#f0f0f0", flexGrow: 1 }}
    >
      <Paper
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2">Welcome to Scrum Board!</Typography>
        <Grid
          container
          columnSpacing={4}
          sx={{ m: 0, p: 0 }}
          justifyContent="center"
          rowSpacing={4}
        >
          <Grid item>
            <Button
              variant="contained"
              sx={{ py: 2, px: 3, textTransform: "none", fontSize: 18 }}
              onClick={() => setOpenTicketModal(true)}
            >
              Create Ticket
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ p: 2, px: 3, textTransform: "none", fontSize: 18 }}
              onClick={() => setOpenSprintModal(true)}
            >
              Create Sprint
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CreateTicketForm
        open={openTicketModal}
        onClose={() => setOpenTicketModal(false)}
      />
      <CreateSprintForm
        open={openSprintModal}
        onClose={() => setOpenSprintModal(false)}
      />
    </Grid>
  );
};

export default Home;
