import { type RouterOutputs } from "~/utils/api";

export type Message = RouterOutputs["room"]["getMessages"][number];
