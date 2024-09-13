const date = new Date();

// 月を表示
const args = process.argv.slice(2);

// 0 が年の最初の月を示すので、+1を記載します。+1を記載しないと今日が11月だった場合、10月と表示されてしまいます。
let month = date.getMonth()+1

// mオプションに対応する為に取得した２つの引数を処理する
args.forEach((arg, index) => {
    // mオプションがあり、かつその次に月の引数があるか判定
    if (arg === '-m' && args[index + 1]) {
        // 引数として渡された月をparseIntメソッドで10進数に変換する
        month = Number.parseInt(args[index + 1], 10);
      }
});

// dateオブジェクトが持つ値から年の値を取得
const year = date.getFullYear()

// 曜日を指定
const weeks = ['日', '月','火', '水', '木', '金', '土', ]

// 今日の日付を取得する
const today = date.getDate()

// 月の最初の日付を取得する
const startDate = new Date(year, month - 1, 1)

// 月の最後の日を取得する
const endDate = new Date(year, month, 0)

// 月の末日を取得する
const endDayCount = endDate.getDate()

// 月の最初の日の曜日を取得
const startDay = startDate.getDay()

// 何日から始めるか指定する
let dayCount = 1

// 初期の空白を設定
let calendar = ' '.repeat(startDay);
// spaseを定義
let space = '';
// 空白にrepeatメソッドで3をかけた上で、さらにstartDayの日数分空白をかける。末尾の空白は微調整のもの
space = (" ".repeat(3).repeat(startDay)) + ' ';

// カレンダーの日付を指定した月の日数分繰り返し処理で取得する
for (let day = 1; day <= endDayCount; day++) {
    // 日付をtoString()で文字列に変換し、padStart()メソッドで文字の長さを2行に指定しスペースを埋め込んで日付の幅を調整
    calendar += day.toString().padStart(2, ' ') + ' ';
    // 土曜日で改行するようにstartDayとdayを足して、7で割り切れる日は改行をする処理を入れる
    if ((startDay + day) % 7 === 0) calendar += '\n';
    }

// 1月〜12月が入力されたか判定する
if (month >= 1 && month <= 12) {
    // 月を表示
    process.stdout.write(" ".repeat(5) + month.toString() + '月  ');
    // 年を表示
    console.log(year);
    // 曜日を表示
    console.log(weeks.join(' '));
    // 1週目の表示の手前に空白を入れる
    process.stdout.write(space)
    // trim()メソッドで不要な空白を削除した上で、2週目以降の日付を表示する
    console.log(calendar.trim());
} else {
    console.error('1~12の月を入力してください')
}