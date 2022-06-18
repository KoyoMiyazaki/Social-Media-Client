import React from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const ToastMessage = ({
  isOpened,
  setIsOpened,
  duration,
  message,
  severity,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpened(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={duration}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
