import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { getGlobalStyle } from "../../utils/index";

export const Spinner = (query) => {
  return (
    <div>
      <Backdrop
        sx={{ 
            color: getGlobalStyle("--ui-text"), 
            zIndex: 1000
        }}
        open={query.open}
      >
        <CircularProgress sx={{ color: getGlobalStyle("--theme") }} />
      </Backdrop>
    </div>
  );
}
