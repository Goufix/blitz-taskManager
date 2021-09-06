import { resolver } from "@blitzjs/core/server"
import db from "db"
import { InsertTask } from "../validations"

export default resolver.pipe(resolver.zod(InsertTask), async ({ label, description }) => {
  await db.task.create({ data: { label, description } })
})
