import { useState, useEffect, useRef } from "react";
import {
  Container, Grid, Paper,
  Avatar,
  TextField, Divider,
  Button
} from "@mui/material";
import {
  Stop as StopIcon,
  Mic as MicIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  FiberManualRecord as FiberManualRecordIcon
} from "@mui/icons-material";
import { useStateContext } from "../utils/StateContext";
import MainAppBar from "../components/MainAppBar";
import CopyButton from "../components/CopyButton";

function SpeechToText(): JSX.Element {
  const {
    createMessage
  } = useStateContext();

  // SpeechRecognitionオブジェクト
  const [recognition, setRecognition] = useState<any>(null);
  // 音声認識が開始されているかどうか
  const [isOnStart, setIsOnStart] = useState<boolean>(false);
  // 録音が開始されているかどうか
  const [isOnAudioStart, setIsOnAudioStart] = useState<boolean>(false);
  // 発話の検出が開始されているかどうか
  const [isOnSpeechStart, setIsOnSpeechStart] = useState<boolean>(false);
  // 暫定的な文字起こしのテキスト
  const [interimText, setInterimText] = useState<string>("");
  // 最終的な文字起こしのテキストのリスト
  const [textList, setTextList] = useState<string[]>([]);

  useEffect(() => {
    // SpeechRecognitionオブジェクトの作成
    let newRecognition: any = null;
    if ("webkitSpeechRecognition" in window) {
      newRecognition = new (window as any).webkitSpeechRecognition();
    } else {
      newRecognition = new (window as any).SpeechRecognition();
    }

    setRecognition(newRecognition);

    // クリーンアップ関数
    return () => {
      if (newRecognition) {
        newRecognition.stop();
      }
    };
  }, []);

  if (recognition) {
    // 連続的な認識を有効
    recognition.continuous = true;
    // 途中結果を取得
    recognition.interimResults = true;
    // 認識する言語を日本語に設定
    recognition.lang = "ja-JP";

    // 音声認識が開始・終了したときの処理
    recognition.onstart = () => { setIsOnStart(true); };
    recognition.onend = () => { setIsOnStart(false); };
    // 録音が開始・終了したときの処理
    recognition.onaudiostart = () => { setIsOnAudioStart(true); };
    recognition.onaudioend = () => { setIsOnAudioStart(false); };
    // 発話の検出が開始・終了したときの処理
    recognition.onspeechstart = () => { setIsOnSpeechStart(true); };
    recognition.onspeechend = () => { setIsOnSpeechStart(false); };

    // エラーが起きたときの処理
    recognition.onerror = (event: any) => {
      createMessage(`${event.error}`, "error");
    }

    // 音声認識の結果が出たときの処理
    recognition.onresult = (event: any) => {
      // 暫定的な文字起こしのテキスト
      let newInterimText = "";
      // 最終的な文字起こしのテキスト
      let newText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          newText += transcript;
        } else {
          newInterimText += transcript;
        }
      }
      setInterimText(newInterimText);

      if (newText !== "") {
        setTextList(prev => [...prev, newText]);
      }
    };
  } else {
    createMessage("マイクの使用を許可してください。", "warning");
  }

  // 画面の一番下までスクロールする
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollBottomRef && scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [interimText, textList]);

  // 開始または停止ボタンが押されたときの処理
  const handleClick = () => {
    if (recognition) {
      // 開始ボタンを押したとき
      if (!isOnStart) {
        // 音声認識を開始
        recognition.start();
      } else {
        // 音声認識を停止
        recognition.stop();
      }
    } else {
      createMessage("マイクが使用できません。", "error");
    }
  }

  return (
    <div>
      <Container maxWidth="md"
        sx={{ mt: 16, mb: 12 }}
      >
        {textList.map((text, index) => (
          <TextField
            key={index}
            value={text}
            multiline
            fullWidth
            variant="outlined"
            size="small"
            autoFocus={ index === textList.length - 1 }
            InputProps={{
              readOnly: true
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
      </Container>

      <Paper
        elevation={1}
        sx={{
          position: "fixed",
          top: 0, left: 0, right: 0
        }}
      >
        <MainAppBar />

        <Container maxWidth="md">
          <Grid container
            spacing={2}
            sx={{ mt: 0 }}
          >
            <Grid item xs={2}>
              <Avatar
                sx={{
                  bgcolor: isOnAudioStart
                    ? "success.main"
                    : "inherit.main"
                }}
              >
                <MicIcon />
              </Avatar>
            </Grid>
            <Grid item xs={2}>
              <Avatar
                sx={{
                  bgcolor: isOnSpeechStart
                    ? "success.main"
                    : "inherit.main"
                }}
              >
                <RecordVoiceOverIcon />
              </Avatar>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={2}
              sx={{
                textAlign: "end"
              }}
            >
              <CopyButton
                interimText={interimText}
                textList={textList}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          py: 2
        }}
      >
        <Container maxWidth="md">
          <Button
            onClick={handleClick}
            startIcon={
              isOnStart
                ? <StopIcon />
                : <FiberManualRecordIcon />
            }
            fullWidth
            variant="contained"
            size="large"
            color={
              isOnStart
                ? "secondary"
                : "primary"
            }
          >
            {isOnStart
              ? "停止"
              : "開始"
            }
          </Button>
        </Container>
      </Paper>

      <div ref={scrollBottomRef} />
    </div>
  );
}

export default SpeechToText;
