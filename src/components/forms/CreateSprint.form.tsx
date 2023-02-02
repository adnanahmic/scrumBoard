import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { format, getUnixTime, toDate } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ChangeEvent, FC, useMemo, useState } from "react";
import { Sprint } from "../../types/Sprint.types";
import CreateModal from "../modals/Create.modal";
import { Box } from "@mui/system";
import { saveNewSprint } from "../../utils/store";

interface PropTypes {
  open: boolean;
  onClose: () => void;
}

const initialFormData: Partial<Sprint> = {
  name: "",
  endDate: undefined,
  startDate: undefined,
};

const CreateSprintForm: FC<PropTypes> = ({ open, onClose }) => {
  const [data, setData] = useState<Partial<Sprint>>(initialFormData);

  const isValidData = useMemo(
    () => Object.values(data)?.every((val) => val),
    [data]
  );

  const handleChange = (name: string, value: string) =>
    setData({ ...data, [name]: value });

  const handleSubmit = () => {
    saveNewSprint({ id: getUnixTime(new Date()), ...data });
    handleClose();
  };

  const handleClose = () => {
    setData(initialFormData);
    onClose();
  };

  console.log(typeof data?.startDate, data);
  return (
    <CreateModal
      title="Create new Sprint"
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      disableSubmit={!isValidData}
    >
      <Grid container rowSpacing={3} sx={{ pt: 2 }}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            placeholder="Enter Sprint name"
            fullWidth
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e?.target?.value)
            }
            name="name"
            value={data?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <DatePicker
                label="Start date"
                disablePast
                minDate={toDate(new Date())}
                views={["day"]}
                value={data?.startDate ?? null}
                onChange={(newValue) => {
                  handleChange("startDate", newValue as unknown as string);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
              <DatePicker
                label="End date"
                disablePast
                minDate={toDate(new Date(data?.startDate ?? ""))}
                views={["day"]}
                value={data?.endDate ?? null}
                onChange={(newValue) => {
                  handleChange("endDate", newValue as unknown as string);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </Box>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </CreateModal>
  );
};

export default CreateSprintForm;
