// middleware.ts
// Basic 認証で全ページを保護(モック共有用)
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;

  // 環境変数が未設定なら認証をスキップ(ローカル開発用)
  if (!user || !pass) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  const expected = `Basic ${btoa(`${user}:${pass}`)}`;

  if (auth === expected) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Enjin LMS Demo", charset="UTF-8"',
    },
  });
}

export const config = {
  // _next 内部リソースと favicon は除外
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
