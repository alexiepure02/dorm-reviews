import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-background">
        <img
          src="auth-bg.png"
          className="fixed min-w-screen min-h-screen -z-50"
        />
        <div className="flex h-full items-center justify-between">
          <div className=" flex text-background w-full max-w-[860px] justify-end">
            <div className="flex flex-col grow gap-10 max-w-2xl">
              <h1 className="text-8xl font-bold">Căminul Tău</h1>
              <p className=" text-lg max-w-xl ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-[600px] justify-start">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
