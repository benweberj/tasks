import { createGlobalStyle } from 'styled-components'
import Timer from './Timer'

export interface iTask {
  id: string,
  name: string,
  comment: string,
  timer: Timer,
  duration: number,
}

export const blankTask:iTask = {
  id: '',
  name: '',
  comment: '',
  timer: new Timer(),
  duration: 5*60*1000
}
  
export const tasksObj = (tasks: iTask[]) => tasks.reduce((acc, val) => ({ ...acc, [val.id]: val }), {})
export const tasksArr = (tasks: any) => Object.keys(tasks).map(id => tasks[id])

let lastId = 0
export const taskId = () => {
  let tasks = localStorage.getItem('tasks')
  if (tasks) {
    JSON.parse(tasks).forEach((task:iTask) => {
      let num = parseInt(task.id.split('-')[1])
      console.log('i see a task with id', num)
      if (num > lastId) lastId = num
    })
  }
  lastId++
  return `task-${lastId}`
}

export const colors = {
  red: '#DD7979',
  green: '#6ACAAA',
  blue: '#8AA6ED',
}

export const statusColor = (status:'paused'|'complete'|'running'|'complete') => {
  const stats = {
    'paused': colors.blue,
    'running': 'transparent',
    'complete': colors.red,
  }
  return stats[status]
}

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *::placeholder {
    transition: all .2s ease;
  }

  p, span, button, input, textarea, div {
    font-size: 15px;
    font-weight: 100;
    caret-color: ${colors.green};
  }
  p, textarea {
    line-height: 1.4;
  }

  body {
    background: #fff;
  }

  .topright {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  
  .topleft {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  button {
    padding: 6px 30px;
    border: none;
    border-radius: 999px;
    outline: 0:
    background: #eee;
    margin: 5px;

    :hover {
      transform: scale(1.05);
    }
  }

  .disabled {
    pointer-events: none;
    opacity: .5;
    userSelect: none;
  }
`