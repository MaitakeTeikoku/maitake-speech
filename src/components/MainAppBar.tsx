import { useState } from "react";
import {
  AppBar, Toolbar,
  Typography, IconButton, Avatar
} from "@mui/material";
import {
  Help as HelpIcon
} from "@mui/icons-material";
import HelpDialog from "./HelpDialog";

function MainAppBar(): JSX.Element {

  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            onClick={() => window.location.href = "https://maitake-home.pages.dev"}
            sx={{ p: 0, mr: 2 }}
          >
            <Avatar
              alt="Maitake"
              src={`${process.env.PUBLIC_URL}/logo192.png`}
            />
          </IconButton>
          <Typography variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {`音声文字起こし`}
          </Typography>

          <IconButton
            onClick={() => setHelpDialogOpen(true)}
            size="large"
            color="inherit"
            edge="end"
          >
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <HelpDialog
        helpDialogOpen={helpDialogOpen}
        setHelpDialogOpen={setHelpDialogOpen}
      />
    </div>
  );
}

export default MainAppBar;
