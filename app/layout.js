import { Inter } from "next/font/google";
import "./globals.scss";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import styles from "./page.module.scss";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Карта допомоги",
  description: "НУВГП",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ position: 'relative' }} className={inter.className}>
      <AppRouterCacheProvider>
          <main className={styles.main}>
              <div className={styles.description}>
                  <p>
                      Пошук точок благодійної допомоги

                      <code className={styles.code}>{' '}ВПО</code>
                  </p>
                  <div>
                      <a
                          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          <Image
                              src="/vercel.svg"
                              alt="Vercel Logo"
                              className={styles.vercelLogo}
                              width={100}
                              height={24}
                              priority
                          />
                      </a>
                  </div>
              </div>
              {children}
          </main>
      </AppRouterCacheProvider>
      <div id='modal'></div>
      </body>
    </html>
  );
}
