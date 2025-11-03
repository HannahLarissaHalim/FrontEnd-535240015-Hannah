import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Hannah Portfolio",
  description: "Personal portfolio website built with Next.js and Bootstrap 5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-light text-dark`}>
        {children}
      </body>
    </html>
  );
}
