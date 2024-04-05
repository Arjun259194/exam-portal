import { z } from "zod";

const s = z.object({
  result: z.array(z.number()),
})
