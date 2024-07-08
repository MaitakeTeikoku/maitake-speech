import {
  Typography
} from "@mui/material";

const listStyle = {
  paddingLeft: 16
};
// ヘルプに表示する内容
export const helpList = [
  {
    summary: "使い方",
    details: (
      <div>
        <Typography variant="caption">
          <ol style={listStyle}><li>
            {"「開始」ボタンを押してね！マイクが起動するよ！"}
          </li><li>
              {"声が認識されると、文字起こしの結果が表示されるよ！"}
            </li><li>
              {"「停止」ボタンを押してね！"}
            </li><li>
              {"コピーボタンを押して、文字起こしの結果をコピーしてね！"}
            </li></ol>
        </Typography>
      </div>
    )
  },
  {
    summary: "プライバシーポリシー",
    details: (
      <div>
        <Typography variant="caption">
          <ol style={listStyle}><li>
            {"当サイトについて"}
            <ul style={listStyle}><li>
              {"当サイトではWeb Speech APIを利用しています。"}
            </li><li>
                {"使用しているブラウザのプライバシーポリシーを確認してください。"}
              </li><li>
                {"入力された音声は、文字起こし以外の目的では使用しません。"}
              </li><li>
                {"個人情報や機密情報は入力しないようにしてください。"}
              </li></ul>
          </li></ol>
        </Typography>
      </div>
    )
  },
  {
    summary: "利用規約",
    details: (
      <div>
        <Typography variant="caption">
          <ol style={listStyle}><li>
            {"リンクについて"}
            <ul style={listStyle}><li>
              {"当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。"}
            </li><li>
                {"ただし、インラインフレームの使用や画像の直リンクは禁止します。"}
              </li></ul>
          </li><li>
              {"免責事項について"}
              <ul style={listStyle}><li>
                {"当サイトの情報や、当サイトのリンクやバナーなどで移動したサイトで提供される情報やサービス等について、損害等の一切の責任を負いません。"}
              </li><li>
                  {"できる限り正確な情報を提供するように努めていますが、正確性や安全性を保証するものではありません。"}
                </li></ul>
            </li><li>
              {"著作権について"}
              <ul style={listStyle}><li>
                {"当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。"}
              </li><li>
                  {"当ブログは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がある場合、お問い合わせフォームよりご連絡ください。"}
                </li></ul>
            </li></ol>
        </Typography>
      </div>
    )
  }
];
