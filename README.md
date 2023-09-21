<head>
    <div align="center">
        <h1 align="center">Glassy Chat</h1>
    </div>
</head>

<div align="center">
  <img alt="nextdotjs" src="https://img.shields.io/badge/-next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="react" src="https://img.shields.io/badge/-React-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="trpc" src="https://img.shields.io/badge/-trpc-2596BE.svg?style=for-the-badge&logo=trpc&logoColor=white" />
  <img alt="zod" src="https://img.shields.io/badge/-zod-3E67B1.svg?style=for-the-badge&logo=zod&logoColor=white" />
  <img alt="reactquery" src="https://img.shields.io/badge/-react%20query-FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img alt="nextauth" src="https://img.shields.io/badge/-nextauth.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="zustand" src="https://img.shields.io/badge/-zustand-252b37.svg?style=for-the-badge&logo=react&logoColor=white" />
  <img alt="radixui" src="https://img.shields.io/badge/-radix%20UI-161618.svg?style=for-the-badge&logo=radixui&logoColor=white" />
  <img alt="tailwindcss" src="https://img.shields.io/badge/-tailwind%20CSS-4285F4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="pusher" src="https://img.shields.io/badge/-pusher-300D4F.svg?style=for-the-badge&logo=pusher&logoColor=white" />
  <img alt="planetscale" src="https://img.shields.io/badge/-planetscale-000000.svg?style=for-the-badge&logo=planetscale&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="mysql" src="https://img.shields.io/badge/-mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img alt="pwa" src="https://img.shields.io/badge/-pwa-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white" />
</div>

<div align="center">
  <h3>A simple serverless chat.</h3>    
<!--   <p><a href="https://youtu.be/zDJ3vSZpoSA" target="_blank">Demo video</a></p> -->
  <p><a href="https://glassy-chat.vercel.app/" target="_blank">Website</a></p>
</div>

<br/>

## About

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

A chat application, written in Next.js, with the use of tRPC, Zustand, Radix UI, Tailwind Css, Pusher, Prisma.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example`.
Then proceed:

1. `npm install`
2. Create [PlanetScale](https://planetscale.com/) MySQL database and add [connection string](https://planetscale.com/docs/concepts/connection-strings) as value for `DATABASE_URL`
3. `npx prisma db push`
4. Generate a secret value for `NEXTAUTH_SECRET`. You can generate a new secret on the command line with: `openssl rand -base64 32`
5. Create a [Discord OAuth App](https://create.t3.gg/en/usage/next-auth#setting-up-the-default-discordprovider) and add values for `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET`
6. Create a [GitHub OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app). Make sure to set Authorization callback URL to http://localhost:3000/api/auth/callback/github. After that add values for `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
7. Create [Pusher account](https://pusher.com/) and add values for `PUSHER_APP_ID`, `PUSHER_APP_KEY`, `PUSHER_APP_SECRET`, `PUSHER_APP_CLUSTER`, `NEXT_PUBLIC_PUSHER_APP_KEY`, `NEXT_PUBLIC_PUSHER_APP_CLUSTER`
8. Add values for `SUPER_ADMIN_NAME` and `SUPER_ADMIN_EMAIL`
9. `npx prisma db seed`
10. `npm run dev`

## Snapshots

### Sign in

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/42fcbc77-cadb-4d88-94c0-a10716dcfa18)

### Chat

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/552772cd-0560-4b37-958d-a2d88fc43ccd)

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/9f4ce352-721f-4f7b-acb2-8671fcb7fecd)

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/a99f81e5-0004-42af-81fa-1bbac146f923)

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/608f4ae4-bdac-4b46-918a-9d19ed5f41c4)

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/545abf55-9b35-40b8-bcf7-8239a3b9a663)

![image](https://github.com/YaroslavChuiko/GlassyChat/assets/32570823/dcc631df-0baf-4a08-afd6-b53e4ba5822c)
