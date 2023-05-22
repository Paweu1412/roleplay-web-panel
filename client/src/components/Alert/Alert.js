import React from "react";
import { Snackbar, Alert } from "@mui/material";

export const AlertInfo = (props) => {
  const { state, info } = props;

  return (
    <div>
      <Snackbar open={true}>
        <Alert severity={state}>{info}</Alert>
      </Snackbar>
    </div>
  );
};
