import { useState, useEffect } from 'react'
// import styled from 'styled-components'

import { iTask, taskId, GlobalStyles, tasksObj, tasksArr } from './utils'
import Task from './Task'
import TaskCreator from './TaskCreator'
import Timer from './Timer'

const App: React.FC<any> = () => {
  const [tasks, setTasks] = useState<iTask[]>([])

  // const save = (t: iTask[]) => localStorage.setItem('tasks', JSON.stringify(t))

  useEffect(() => {
  //   let t: any = localStorage.getItem('tasks')
  //   if (t) {
  //     t = JSON.parse(t)
  //     console.log('getting tasks from localStorage', t)
  //     setTasks(t)
  //   } else {
  //     console.log('NO TASKS SET IN LOCAL STORAGE. NOT EVEN AN EMPTY ARRAY.')
  //   }
  }, [])

  const createTask = (task: iTask) => {
    setTasks([
      ...tasks, 
      {
        ...task,
        id:taskId(),
        timer: new Timer((new Date).getTime(), task.duration*1000*60)
        
        // startTime: new Date().getTime(),
        // duration: task.duration*1000*60
      }
    ])
  }

  const removeTask = (id: string) => {
    // setTasks(tasks.filter(t => t.id !== id))
  }

  const updateTask = (task: iTask) => {
    // let t:any = tasksObj(tasks)
    // if (t[task.id]) {
    //   t[task.id] = task
    //   setTasks(tasksArr(t))
    //   console.log('updating task with id', task.id)
    // } else console.log('I am updating, but I dont see the tasks sID')
  }

  const removeAll = () => {
  //   setTasks([])
  }

  useEffect(() => {
  //   save(tasks)
  }, [tasks])

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '10vw' }}>
      <GlobalStyles />
      <TaskCreator create={createTask} />
      <div style={{ height: '5vh' }} /> 
      {tasks.length > 0 && <button style={{ padding: '10px 30px', margin: '30px 0', border: 'none', background: 'palevioletred', color: 'white', borderRadius: 8 }} onClick={removeAll}>Remove all tasks</button>}
      {tasks.map((task:iTask, i:number) => (
        <Task key={i} task={task} remove={removeTask} update={updateTask} />
      ))}
    </div>
  )
}

export default App