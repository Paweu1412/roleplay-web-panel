import React from "react";
import { Snackbar, Alert } from "@mui/material";

export const AlertInfo = (props) => {
  const { state, info } = props;


  return (
    <Snackbar open={true}>
      <Alert severity={state}>{info}</Alert>
    </Snackbar>
  );
};
