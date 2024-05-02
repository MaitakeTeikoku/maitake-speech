import {
  IconButton
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon
} from "@mui/icons-material";
import { useStateContext } from "../utils/StateContext";

interface CopyButtonProps {
  interimText: string,
  textList: string[]
}

function CopyButton({
  textList,
  interimText
}: CopyButtonProps): JSX.Element {
  const {
    createMessage
  } = useStateContext();

  const copy = () => {
    const copiedText = `${textList.join("\n")}\n${interimText}`;
    try {
      navigator.clipboard.writeText(copiedText)
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
    <IconButton
      onClick={copy}
      size="large"
      color="inherit"
    >
      <ContentCopyIcon />
    </IconButton>
  );
}

export default CopyButton;
