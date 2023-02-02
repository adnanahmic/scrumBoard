import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { getUnixTime } from "date-fns";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { Ticket } from "../../types/Ticket.types";
import { assignSprint, getAllSprints, saveNewTicket } from "../../utils/store";
import CreateModal from "../modals/Create.modal";

interface PropTypes {
  ticketToUpdate: number | undefined;
  onClose: () => void;
}

const AssignSprintForm: FC<PropTypes> = ({ ticketToUpdate, onClose }) => {
  const [data, setData] = useState<string>("");
  const sprints = useMemo(() => getAllSprints(), []);

  const isValidData = useMemo(() => data, [data]);

  const handleChange = (e: SelectChangeEvent) => setData(e?.target?.value);

  const handleSubmit = () => {
    assignSprint(Number(ticketToUpdate), Number(data));
    handleClose();
  };

  const handleClose = () => {
    setData("");
    onClose();
  };

  return (
    <CreateModal
      title="Assign sprint"
      open={!!ticketToUpdate}
      onClose={handleClose}
      onSubmit={handleSubmit}
      disableSubmit={!isValidData}
    >
      <Grid
        container
        rowSpacing={3}
        sx={{
          pt: 2,
          minWidth: {
            xs: "200px",
            sm: "400px",
          },
        }}
      >
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-label">Sprint</InputLabel>
          <Select
            value={data}
            label="Sprint"
            onChange={handleChange}
            fullWidth
            placeholder="Select sprint to assign"
          >
            {sprints?.map((sprint) => (
              <MenuItem key={sprint?.id} value={sprint?.id}>
                {sprint?.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </CreateModal>
  );
};

export default AssignSprintForm;
