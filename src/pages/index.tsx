import { type GetServerSideProps } from "next";
import Chat from "~/components/Chat";
import Sidebar from "~/components/Sidebar";
import { getServerAuthSession } from "~/server/auth";
import { useAppStore } from "~/store/store";

export default function Home() {
  const { isSidebarShowed } = useAppStore();

  return (
    <div
      className={`relative flex w-full transition ${
        !isSidebarShowed &&
        "-translate-x-full min-[600px]:translate-x-[-450px] lg:translate-x-0"
      }`}
    >
      <Sidebar className="lg:mr-7 xl:mr-10" />
      <Chat className="flex-1" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
