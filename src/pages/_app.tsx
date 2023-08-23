import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import PusherProvider from "~/provider/PusherProvider";
import { useEffect } from "react";
import { useAppStore } from "~/store/store";
// import { Lato } from "next/font/google";

// const lato = Lato({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const applyDarkMode = useAppStore((state) => state.applyDarkMode);

  useEffect(() => {
    applyDarkMode();
  }, [applyDarkMode]);

  return (
    <SessionProvider session={session}>
      <PusherProvider>
        {/* <main className={lato.className}> */}
        <main className="font-sans">
          <Component {...pageProps} />
        </main>
      </PusherProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
