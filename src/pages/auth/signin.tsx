import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerAuthSession } from "~/server/auth";

//?? create type for providers as for colorTheme
const providerIcons = {
  ["github"]: <GitHubLogoIcon width={35} height={35} className="mr-4" />,
  ["discord"]: <DiscordLogoIcon width={35} height={35} className="mr-4" />,
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!providers) return null;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className=" space-y-4 rounded-3xl bg-[rgba(255,_255,_255,_0.8)] p-10 shadow-[0px_4px_24px_-1px_rgba(0,_0,_0,_0.2)] backdrop-blur transition-colors dark:bg-[rgba(0,_0,_0,_0.8)]">
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            className="flex w-full items-center rounded-lg bg-graya-3 px-5 py-3 font-semibold text-gray-12 transition-colors hover:bg-graya-4 active:scale-[0.99] dark:bg-graydarka-3 dark:text-graydark-12 dark:hover:bg-graydarka-4"
            onClick={() => void signIn(provider.id)}
          >
            {providerIcons[provider.id as keyof typeof providerIcons]}
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const session = await getServerAuthSession({ req, res });

  if (session) {
    return { redirect: { destination: "/" }, props: {} };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
