import {
  Typography,
} from "@mui/material";

import { Breacrumbs } from "../navigation/Breacrumbs";
import { PoIForm } from "./PoIForm";

export function PoIAdd() {
  return (
    <div style={{ marginBottom: "100px" }}>
      <Breacrumbs currentPageTitle="Toevoegen" />

      <Typography variant="h6">Point of Interest toevoegen</Typography>
      <PoIForm />
    </div>
  );
}
