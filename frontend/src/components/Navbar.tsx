import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { IconButton, Menu, MenuItem } from "@mui/material";
import logo from "../assets/logo.png";

export default function Navbar() {
  const Navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const rightSx = {
    mr: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  };

  const buttonSx = {
    textTransform: "none",
    px: 2,
    py: 1,
    minWidth: 0,
  };

  const guestSx = {
    px: 2,
    py: 1,
  };

  function openUserMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function closeUserMenu() {
    setAnchorEl(null);
  }

  function loginClick() {
    Navigate(`/login`);
  }
  function registerClick() {
    Navigate(`/register`);
  }
  function logoutClick() {
    setUser(null);
    Navigate("/");
  }
  function logoClick() {
    Navigate(`/`);
  }

  function goToThreads() {
    closeUserMenu();
    Navigate("/my/threads");
  }

  function goToComments() {
    closeUserMenu();
    Navigate("/my/comments");
  }

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ minHeight: 70 }}>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton onClick={logoClick}>
                <Box
                  component="img"
                  alt="Logo"
                  src={logo}
                  sx={{
                    height: 70,
                    width: "auto",
                  }}
                />
              </IconButton>
              <Button color="inherit" onClick={loginClick}>
                <Typography>Login</Typography>
              </Button>
              <Button color="inherit" onClick={registerClick}>
                <Typography>Register</Typography>
              </Button>
            </Box>
            <Box sx={rightSx}>
              <Typography sx={guestSx}>Guest</Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ minHeight: 70 }}>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton onClick={logoClick}>
                <Box
                  component="img"
                  alt="Logo"
                  src={logo}
                  sx={{
                    height: 70,
                    width: "auto",
                  }}
                />
              </IconButton>
              <Button color="inherit" onClick={logoutClick}>
                <Typography>Logout</Typography>
              </Button>
            </Box>
            <Box sx={rightSx}>
              <Button onClick={openUserMenu} sx={buttonSx} color="inherit">
                {user.username}
              </Button>

              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={closeUserMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={goToThreads}>My Threads</MenuItem>
                <MenuItem onClick={goToComments}>My Comments</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
