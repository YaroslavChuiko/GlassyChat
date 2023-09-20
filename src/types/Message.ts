import { type RouterOutputs } from "~/utils/api";

export type Message = RouterOutputs["chat"]["getMessages"][number];
