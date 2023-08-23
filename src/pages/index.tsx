import { type GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Sidebar from "~/components/Sidebar/Sidebar";
import { getServerAuthSession } from "~/server/auth";
import { useAppStore } from "~/store/store";
import { type ColorTheme } from "~/types/ColorTheme";

export default function Home() {
  const { colorTheme } = useAppStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // zustand persist is used - error: Text content does not match server-rendered HTML https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  }, []);

  const getColors = (colorTheme: ColorTheme) => {
    switch (colorTheme) {
      case "blue":
        return "from-[#6366f1] to-[#d946ef]";
      case "green":
        return "from-[#4ADE80] to-[#06B6D4]";
      case "yellow":
        return "from-[#FCD34D] to-[#F97316]";
      default:
        return "from-[#6366f1] to-[#d946ef]";
    }
  };
  return (
    <div
      className={`${
        isClient && getColors(colorTheme)
      } flex min-h-screen min-w-full bg-gradient-to-br p-12`}
    >
      <Sidebar />
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
