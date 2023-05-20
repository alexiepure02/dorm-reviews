import Header from "@/components/Header";
import "../globals.css";
import SessionProvider from "@/contexts/SessionProvider";

export const metadata = {
  title: "Acasă - Căminul Tău",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
