// 環境変数から設定したユーザー名とパスワードを取得
const USERNAME = process.env.BASIC_AUTH_USERNAME;
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

exports.handler = async (event) => {
  const { headers } = event;
  const auth = headers.authorization;

  // 認証情報がない場合は、パスワード入力を要求
  if (!auth) {
    return {
      statusCode: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    };
  }

  // 認証情報をデコード
  const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');

  // ユーザー名とパスワードが一致するかチェック
  if (username === USERNAME && password === PASSWORD) {
    // ★★★ここが重要★★★
    // 一致すれば、本来のページを表示するようにNetlifyに指示を出す
    return {
      statusCode: 200,
      headers: {
        'x-nf-pass': 'true',
      },
    };
  }

  // 一致しない場合は、再度パスワード入力を要求
  return {
    statusCode: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  };
};