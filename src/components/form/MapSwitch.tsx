import { FormControlLabel, FormGroup, Switch, styled } from "@mui/material";
import { useState } from "react";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: 'url("/src/assets/icons/list.svg")',
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "hsl(25, 81%, 54%)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "hsl(331, 64%, 49%)",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: 'url("/src/assets/icons/map.svg")',
      backgroundColor: "transparent",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "hsl(25, 81%, 54%)",
    borderRadius: 20 / 2,
  },
}));

export function MapListViewSwitch() {
  return (
    <FormGroup sx={{float: 'right'}}>
      <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
        label=""
      />
    </FormGroup>
  );
}