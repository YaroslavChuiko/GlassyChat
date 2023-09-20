import { type RouterOutputs } from "~/utils/api";

export type Chat = RouterOutputs["user"]["getChats"][number];
