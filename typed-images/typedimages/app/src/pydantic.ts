import { z } from "zod";

export const schema = z.object({ src: z.string(), author: z.string() });
