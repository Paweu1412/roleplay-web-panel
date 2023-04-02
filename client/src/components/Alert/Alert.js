import React from "react";
import { Snackbar, Alert } from "@mui/material";

export const AlertInfo = (props) => {
	const { state, info } = props;

	let [show, setShow] = React.useState(true);

  return (
    <Snackbar open={show} autoHideDuration={6000}>
      <Alert severity={state}>
				{info}
			</Alert>
    </Snackbar>
  );
};
