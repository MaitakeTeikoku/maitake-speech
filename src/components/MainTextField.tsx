import {
  Tooltip,
  TextField, InputAdornment, IconButton, Divider
} from "@mui/material";
import {
  ContentCopy as ContentCopyIcon
} from "@mui/icons-material";
import { useStateContext } from "../utils/StateContext";

interface MainTextFieldProps {
  interimText: string;
  finalTextList: string[];
}

function MainTextField({
  interimText,
  finalTextList
}: MainTextFieldProps): JSX.Element {
  const {
    createMessage
  } = useStateContext();

  const copy = (index: number) => {
    const copyText = finalTextList[index];
    try {
      navigator.clipboard.writeText(copyText)
        .then(() => {
          createMessage("コピー成功", "success");
        })
        .catch((error: any) => {
          createMessage(`${error}`, "error");
        });
    } catch (error) {
      createMessage(`${error}`, "error");
    }
  }

  return (
    <div>
      {finalTextList.map((text, index) => (
        <TextField
          key={index}
          value={text}
          multiline
          fullWidth
          variant="outlined"
          size="small"
          autoFocus={index === finalTextList.length - 1}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip arrow
                  title="コピー"
                >
                  <IconButton
                    onClick={() => copy(index)}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
          sx={{ mt: 1 }}
        />
      ))}

      <Divider
        sx={{ mt: 1 }}
      />

      <TextField
        value={interimText}
        disabled
        variant="outlined"
        multiline
        fullWidth
        sx={{ mt: 1 }}
      />
    </div>
  );
}

export default MainTextField;
