import { verifyJwtToken } from "@/libs/index";
import { NextResponse, type NextRequest } from "next/server";

// 🔑 Auth sayfaları listesi
const AUTH_PAGES = ["/login", "/register"];

// 🔎 URL'in auth sayfası olup olmadığını kontrol eden fonksiyon
const isAuthPage = (pathname: string): boolean => {
  return AUTH_PAGES.some((page) => pathname.startsWith(page));
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { nextUrl, cookies } = request;
  const token = cookies.get("token")?.value ?? null;

  let hasVerifiedToken = false;

  if (token) {
    try {
      const payload = await verifyJwtToken(token);
      hasVerifiedToken = payload !== null;
    } catch (error) {
      hasVerifiedToken = false;
    }
  }

  const isAuthPageRequested = isAuthPage(nextUrl.pathname);

  // Eğer login/register isteniyor ve zaten token varsa → ana sayfaya yönlendir
  if (isAuthPageRequested) {
    if (hasVerifiedToken) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  
  if (!hasVerifiedToken) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

 
  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};

