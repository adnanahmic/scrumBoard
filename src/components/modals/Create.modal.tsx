import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, ReactNode } from "react";

interface PropTypes {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title: string;
  children: ReactNode;
  disableSubmit?: boolean;
}

const CreateModal: FC<PropTypes> = ({
  open,
  onSubmit,
  onClose,
  title,
  children,
  disableSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={disableSubmit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
