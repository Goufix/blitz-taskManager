import db from "db"

export default async function getTask() {
  return db.task.findMany()
}
