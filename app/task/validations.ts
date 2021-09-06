import { z } from "zod"

export const InsertTask = z.object({
  label: z.string(),
  description: z.string(),
})

export const DoneTask = z.object({
  id: z.number(),
})
