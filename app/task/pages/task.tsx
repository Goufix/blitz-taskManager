import { BlitzPage, invalidateQuery, useMutation, useQuery } from "@blitzjs/core"
import { Button, Card, Checkbox, TextField, Typography } from "@material-ui/core"
import { Suspense, useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import doneTask from "../mutations/doneTask"
import insertTask from "../mutations/insertTask"
import getTask from "../queries/getTask"
import styles from "../styles.module.css"

const Task: BlitzPage = () => {
  const { control, handleSubmit } = useForm()
  const [createTaskMutation, { isLoading }] = useMutation(insertTask, {
    onSuccess: () => invalidateQuery(getTask),
  })
  const [doneTaskMutation] = useMutation(doneTask, {
    onSuccess: () => invalidateQuery(getTask),
  })
  const [tasks] = useQuery(getTask, undefined)

  const submitHandler = useCallback(
    async (data) => {
      await createTaskMutation(data)
    },
    [createTaskMutation]
  )

  const markAsDone = useCallback(
    async (event) => {
      await doneTaskMutation({ id: Number(event.target.value) })
    },
    [doneTaskMutation]
  )

  return (
    <div className={styles.container}>
      <Card>
        {tasks.map((task) => (
          <Card key={task.id}>
            <Checkbox checked={task.done} value={task.id} onChange={markAsDone} />
            <Typography variant="h5">{task.label}</Typography>
            <Typography>{task.description}</Typography>
          </Card>
        ))}
      </Card>
      <Card>
        <Typography variant="h3">Inserir tarefa</Typography>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <Controller
            control={control}
            name="label"
            render={({ field }) => <TextField variant="outlined" placeholder="Título" {...field} />}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField variant="outlined" multiline placeholder="Descrição" {...field} />
            )}
          />

          <Button disabled={isLoading} type="submit" variant="outlined" color="primary">
            Registrar
          </Button>
        </form>
      </Card>
    </div>
  )
}

const WrappedTask: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Task />
    </Suspense>
  )
}

export default WrappedTask
