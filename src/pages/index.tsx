import { type GetServerSideProps } from "next";
import Sidebar from "~/components/Sidebar/Sidebar";
import { getServerAuthSession } from "~/server/auth";

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-12">
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
