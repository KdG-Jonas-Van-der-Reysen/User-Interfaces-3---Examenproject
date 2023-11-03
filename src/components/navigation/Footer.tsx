import { Box } from "@mui/material";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box
      className="footer"
      sx={{
        boxShadow: 5,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
       <footer>
        <a href="https://www.walibi.be/nl" target="_blank">Copyright {year} @ Walibi Belgium</a>
      </footer>
    </Box>
  );
}
