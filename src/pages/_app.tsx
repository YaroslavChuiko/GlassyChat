import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import PusherProvider from "~/provider/PusherProvider";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PusherProvider>
        <main className={lato.className}>
          <Component {...pageProps} />
        </main>
      </PusherProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
