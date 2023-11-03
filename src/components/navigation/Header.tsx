import { AppBar, Toolbar } from "@mui/material";
import Logo from "../../assets/img/walibi_heel.png"; 

export function Header() {
  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ justifyContent: "flex-start" }}>
      <img
          src={Logo}
          alt="Logo"
          style={{ height: "30px", width: "auto" }} 
        />
      </Toolbar>
    </AppBar>
  );
}
