import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { v4 as uuid } from 'uuid'
import AnimateHeight from 'react-animate-height'

import TaskCreator from './TaskCreator'
import Task from './Task'
import { iTask, GlobalStyles, theme } from './utils'

const Debug = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
height: 100vh;

border: 1px solid red;
  > * {
    // border: 1px dashed white;
    // margin: 10px;
    // > * {
    //   border: 1px solid #white;
    //   > * {
    //     border: 2px solid #888;
    //     > * {
    //       border: 1px solid #888;
    //     }
    //   }
    // }
  }
`

const ModeToggle = styled.div<{ create:boolean }>`
  border-radius: 999px;
  width: 250px;
  height: 40px;
  background: #0005;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0 25px;
  z-index: 0;
  cursor: pointer;
  user-select: none;

  > * { color: ${theme.dark} }

  #slider {
    transition: all .5s ease;
    z-index: -1;
    background: ${theme.accent};
    position: absolute;
    top: 0;
    left: ${props => props.create ? '50%' : 0};
    width: 50%;
    height: 100%;
    border-radius: 999px;
  }
`

const App: React.FC<any> = props => {
  const [tasks, setTasks] = useState<iTask[]>([])
  const [stagedTask, setStagedTask] = useState<iTask|null>(null)
  const [creating, setCreating] = useState(false)
  // 
  useEffect(() => {
    const lt = localStorage.getItem('cached-tasks')
    if (lt && typeof JSON.parse(lt) === 'object') {
      console.log('getting tasks from localStorage', JSON.parse(lt))
      setTasks(JSON.parse(lt))
    }
  }, [])
  //
  useEffect(() => {
    // localStorage.setItem('cached-tasks', JSON.stringify(tasks))
    
  }, [tasks])
  //
  function createTask(task:any) {
    Object.assign(task, {
      id: uuid(),
      startTime: Date.now(),
      status: 'running'
    })
    setTasks([...tasks, task])
    setStagedTask(null)
    setCreating(false)
  }
  //
  function removeTask(id:string) {
    setTasks(tasks.filter((t:any) => t.id !== id))
  }
  // update task properties (mainly for tracking progress)
  function updateTask(task:any) {
    setTasks(tasks.map((t:any) => task.id === t.id ? task : t))
  }
  // remove task from task list and populate the creator form with its info
  function editTask(task:any) {
    removeTask(task.id)
    setStagedTask(task)
    setCreating(true)
  }

  const noTasks = (
    <h1>NO motherfucking tasks</h1>
  )

  const tasksList = tasks.map((task:any) => (
    <Task remove={removeTask} update={updateTask} task={task} edit={editTask} />
  ))

  return (
    <Debug>
      <GlobalStyles />

      {/* <h1 style={{ fontSize: 60 }}>Create a task</h1> */}
      <button onClick={() => setCreating(true)} style={{ alignSelf: 'flex-start', margin: '0 auto', fontSize: 25, padding: '8px 40px' }}>Create a task</button>
      <TaskCreator creating={creating} create={createTask} staged={stagedTask} />

      {/* <ModeToggle create={creating}>
        <div id='slider' onClick={() => setCreating(!creating)} />
        <h3>create</h3>
        <h3>destroy</h3>
      </ModeToggle> */}
      {/* <div className={creating ? 'silent' : ''} style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: creating ? '20vh' : '30vh',
        transition: 'all 1s ease',
        transform: creating ? 'translateX(-40%)' : 'none',
      }}>
        <h1 style={{fontSize: 50, marginRight: 30 }}><i>Create a task</i></h1>
        <button className='create-btn' onClick={() => setCreating(!creating)}>+</button>
      </div> */}

      <AnimateHeight height={creating ? 'auto' : 0} duration={500}>
      </AnimateHeight>

      <div>
        {tasksList}
      </div>
      {/* <CreateBtn onClick={() => setCreating(true)} />
      <TaskCreator create={createTask} staged={stagedTask} />
      {noTasks}
      {tasksList} */}
      
      {/* <AnimateHeight height={!creating ? 'auto' : 0} duration={1000}>
        <CreateBtn onClick={() => setCreating(true)} />
      </AnimateHeight>

      <AnimateHeight height={creating ? 'auto' : 0} duration={1000}>
        <TaskCreator create={createTask} staged={stagedTask} />
      </AnimateHeight>
      
      <AnimateHeight height={(tasks.length===0 && !creating) ? 'auto' : 0} duration={1000}>
        {noTasks}
      </AnimateHeight>

      <AnimateHeight height={tasks.length > 0 ? 'auto' : 0} duration={1000}>
        {tasksList}
      </AnimateHeight> */}

    </Debug>
  )
}

export default App
