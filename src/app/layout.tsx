"use client"

import { fonts } from "@/utils/font";
import { getCookie } from "@/utils/storage";
import { usePathname, useRouter } from "next/navigation";
import { unprotectedRoutes } from "@/utils/constants";
import { Header } from "@/organisms/header/Header";
import { Footer } from "@/organisms/footer/Footer";
import "./globals.css";
import styles from '@/app/layout.module.css'
import NextAuthProvider from "@/providers/NextAuthProvider";

type RootLayoutType = Readonly<{
  children: React.ReactNode;
}>

export default function RootLayout({
  children,
}: RootLayoutType) {

  return (
    <html lang="fa" dir="rtl">
      <body className={fonts.className}>
        <NextAuthProvider>
          <div className={styles.container}>
            <Header />
            <div className={styles.childrenContainer}>
              {children}
            </div>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
