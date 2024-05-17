import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Карта допомоги",
  description: "НУВГП",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ position: 'relative' }} className={inter.className}>
      {children}
      <div id='modal'></div>
      </body>
    </html>
  );
}
