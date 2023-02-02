import {
  Grid,
  TextField,
} from "@mui/material";
import { getUnixTime } from "date-fns";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { Ticket } from "../../types/Ticket.types";
import { saveNewTicket } from "../../utils/store";
import CreateModal from "../modals/Create.modal";

interface PropTypes {
  open: boolean;
  onClose: () => void;
}

const initialFormData: Partial<Ticket> = {
  title: "",
  description: "",
};

const CreateTicketForm: FC<PropTypes> = ({ open, onClose }) => {
  const [data, setData] = useState<Partial<Ticket>>(initialFormData);

  const isValidData = useMemo(
    () => Object.values(data)?.every((val) => val),
    [data]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e?.target?.name]: e?.target?.value });

  const handleSubmit = () => {
    saveNewTicket({ id: getUnixTime(new Date()), ...data });
    handleClose();
  };

  const handleClose = () => {
    setData(initialFormData);
    onClose();
  };

  return (
    <CreateModal
      title="Create new ticket"
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      disableSubmit={!isValidData}
    >
      <Grid container rowSpacing={3} sx={{ pt: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            placeholder="Enter ticket name"
            fullWidth
            onChange={handleChange}
            name="title"
            value={data?.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            placeholder="Enter ticket description"
            multiline
            rows={3}
            fullWidth
            onChange={handleChange}
            name="description"
            value={data?.description}
          />
        </Grid>
      </Grid>
    </CreateModal>
  );
};

export default CreateTicketForm;
