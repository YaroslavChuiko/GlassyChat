import { type GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Chat from "~/components/Chat";
import Sidebar from "~/components/Sidebar";
import { THEME_GRADIENTS } from "~/const/const";
import { getServerAuthSession } from "~/server/auth";
import { useAppStore } from "~/store/store";

export default function Home() {
  const { colorTheme, isSidebarShowed } = useAppStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // zustand persist is used - error: Text content does not match server-rendered HTML https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  }, []);

  return (
    <div
      className={`${
        isClient && THEME_GRADIENTS[colorTheme]
      } flex max-h-screen min-h-screen min-w-full overflow-hidden lg:p-8`}
    >
      <div
        className={`relative flex w-full transition ${
          !isSidebarShowed &&
          "-translate-x-full min-[600px]:translate-x-[-450px] lg:translate-x-0"
        }`}
      >
        <Sidebar className="lg:mr-7 xl:mr-10" />
        <Chat className="flex-1" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return {
      redirect: {
        destination: "api/auth/signin",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
