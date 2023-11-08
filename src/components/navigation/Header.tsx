import {
  AppBar,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import Logo from "../../assets/img/walibi_heel.png";
import { useContext, useState } from "react";
import { AccountCircle } from "@mui/icons-material";

// Icons
import LogoutIcon from "@mui/icons-material/Logout";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-start" }}>
        <Link
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "30px", width: "auto" }}
          />
        </Link>
      </Toolbar>

      {/* Authenticatie */}
      {user ? (
        <div style={{ marginRight: "1.5rem" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem disabled sx={{ opacity: "1 !important" }}>
              <span>{user.email}</span>
            </MenuItem>

            <MenuItem
              onClick={() => {
                setUser(null);
                handleClose();
              }}
            >
              <LogoutIcon sx={{ fontSize: "20px", marginRight: "0.5rem" }} />{" "}
              Uitloggen
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Button
          color="inherit"
          sx={{ marginRight: "1.5rem" }}
          onClick={() => {
            setUser({ isAdmin: true, email: "jonas.vdr@gmail.com" });
          }}
        >
          Inloggen
        </Button>
      )}
    </AppBar>
  );
}
