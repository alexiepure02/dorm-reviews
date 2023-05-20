import SessionProvider from "@/contexts/SessionProvider";
import "../globals.css";
import OptionsList from "./OptionsList";

export const metadata = {
  title: "Admin - Căminul Tău",
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
          <div className="w-full flex flex-col items-center gap-4 p-10">
            <div className="w-full max-w-screen-lg">
              <h1 className="text-2xl p-4">Panou Admin</h1>
              <div className="w-full flex flex-col md:flex-row md:items-start gap-4 text-center md:text-start p-4">
                <OptionsList />
                <div className="w-full flex justify-center rounded-md bg-background py-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
