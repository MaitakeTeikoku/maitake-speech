import {
  Tooltip,
  IconButton
} from "@mui/material";
import {
  CopyAll as CopyAllIcon
} from "@mui/icons-material";
import { useStateContext } from "../utils/StateContext";

interface CopyButtonProps {
  interimText: string;
  finalTextList: string[];
}

function CopyAllButton({
  finalTextList,
  interimText
}: CopyButtonProps): JSX.Element {
  const {
    createMessage
  } = useStateContext();

  const copyAll = () => {
    const copyAllText = `${finalTextList.join("\n")}\n${interimText}`;
    try {
      navigator.clipboard.writeText(copyAllText)
        .then(() => {
          createMessage("コピー成功！", "success");
        })
        .catch((error: any) => {
          createMessage(`${error}`, "error");
        });
    } catch (error) {
      createMessage(`${error}`, "error");
    }
  }

  return (
    <Tooltip arrow
      title="すべてコピー"
    >
      <IconButton
        onClick={copyAll}
        size="large"
        color="inherit"
      >
        <CopyAllIcon />
      </IconButton>
    </Tooltip>
  );
}

export default CopyAllButton;
