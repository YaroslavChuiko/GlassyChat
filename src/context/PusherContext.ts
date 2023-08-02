import type Pusher from "pusher-js";
import { createContext } from "react";

export const PusherContext = createContext<Pusher | null>(null);
