import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Accordion, AccordionSummary, AccordionDetails,
  IconButton
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { helpList } from "../utils/Config";

interface HelpDialogProps {
  helpDialogOpen: boolean;
  setHelpDialogOpen: (helpDialogOpen: boolean) => void;
}

function HelpDialog({
  helpDialogOpen,
  setHelpDialogOpen,
}: HelpDialogProps): JSX.Element {

  // 展開する項目
  const [expandAccordion, setExpandAccordion] = useState<string>("");

  const handleAccordion = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandAccordion(isExpanded ? panel : "");
  };

  return (
    <Dialog
      open={helpDialogOpen}
      onClose={() => setHelpDialogOpen(false)}
    >
      <DialogTitle>
        {"ヘルプ"}
      </DialogTitle>
      <DialogContent>
        {helpList.map((help, helpIndex) => (
          <div key={helpIndex}>
            <Accordion
              key={helpIndex}
              expanded={expandAccordion === `${helpIndex}`}
              onChange={handleAccordion(`${helpIndex}`)}
              sx={{ textAlign: "start" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                {help.summary}
              </AccordionSummary>
              <AccordionDetails>
                {help.details}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-around" }}>
        <IconButton
          onClick={() => setHelpDialogOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

export default HelpDialog;
