import { useState } from "react";
import {
  Tooltip,
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
          <Tooltip arrow
            title="ホームに戻る"
          >
            <IconButton
              onClick={() => window.location.href = "https://maitake-home.pages.dev"}
              sx={{ p: 0, mr: 2 }}
            >
              <Avatar
                alt="Maitake"
                src="/logo192.png"
              />
            </IconButton>
          </Tooltip>

          <Typography variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {`音声文字起こし`}
          </Typography>

          <Tooltip arrow
            title="ヘルプ"
          >
            <IconButton
              onClick={() => setHelpDialogOpen(true)}
              size="large"
              color="inherit"
              edge="end"
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
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
