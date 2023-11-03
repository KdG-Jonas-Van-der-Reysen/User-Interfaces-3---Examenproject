import { Box, Typography } from "@mui/material";
import { MapListViewSwitch } from "./form/MapSwitch";

function Item({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function PoIs() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h5">Ontdek ons park!</Typography>
        <MapListViewSwitch/>
      </Box>
      <Typography variant="h6">
        Ervaar Walibi: Adrenaline en Plezier in één! 🎢🌟
      </Typography>
      <p>
        Walibi staat bekend om zijn sensationele attracties. Ben jij een echte
        thrill-seeker of geef je de voorkeur aan een rustiger avontuur? De keuze
        is helemaal aan jou. Op warme dagen kun je ook verkoeling vinden in onze
        verfrissende waterattracties. Veel plezier!
      </p>

    
    </div>
  );
}
