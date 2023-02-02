import React, { FC, ReactNode } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBack, ConfirmationNumber, Layers } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

interface PropTypes {
  children: ReactNode;
}

const Layout: FC<PropTypes> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {location.pathname !== "/" && (
              <ArrowBack fontSize="medium" sx={{ mr: 3 }} />
            )}
            Scrum Board
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem key="Sprints">
              <ListItemButton
                onClick={() => navigate("/sprints")}
                disabled={location?.pathname === "/sprints"}
              >
                <ListItemIcon>
                  <Layers />
                </ListItemIcon>
                <ListItemText primary="Sprints" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key="Tickets">
              <ListItemButton
                onClick={() => navigate("/tickets")}
                disabled={location?.pathname === "/tickets"}
              >
                <ListItemIcon>
                  <ConfirmationNumber />
                </ListItemIcon>
                <ListItemText primary="Tickets" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Drawer>
      {children}
    </Box>
  );
};

export default Layout;
