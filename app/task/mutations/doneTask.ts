import { resolver } from "@blitzjs/core/server"
import db from "db"
import { DoneTask } from "../validations"

export default resolver.pipe(resolver.zod(DoneTask), async ({ id }) => {
  console.log(id)
  await db.task.update({ where: { id }, data: { done: true } })
})
