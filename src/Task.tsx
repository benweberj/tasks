import React, { useEffect } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { iTask, statusColor } from './utils'

interface TaskHandler {
  task: any,
  update: (task:any) => void,
  remove: (id:string) => void,
  edit: (task:any) => void,
}

const Progress = styled.div<{ progress:number, rate:number }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10px;
  background: #0002;
  clip-path: polygon(
    0% 0%,
    ${props => props.progress}% 0%,
    ${props => props.progress}% 100%,
    0% 100%
  );
  transition: all ${props => props.rate}s linear;
`


class Task extends React.Component<TaskHandler> {
  ticker: any = null
  rate: number = 100
  
  tick() {
    const { task, update } = this.props
    const { status, startTime, duration, pauseTime } = task

    if (status === 'paused') {
      update({ ...task, pauseTime: pauseTime + this.rate })
    } else if (status === 'running') {
      let progress = Math.min((Date.now() - startTime - pauseTime) / duration, 1)
      update({ ...task, progress })
      if (progress === 1) {
        this.end()
      }
    } else clearInterval(this.ticker)
  }

  // timer finished
  end() {
    clearInterval(this.ticker)
    this.props.update({ ...this.props.task, status: 'complete' })
  }

  // delete task and populate TaskCreator with its info (parent does this)
  edit() {
    const { task, edit } = this.props
    clearInterval(this.ticker)
    edit(task)
  }

  // remove task
  remove() {
    const { task, remove } = this.props
    clearInterval(this.ticker)
    remove(task.id)
  }

  // start or pause, based on the task's status
  handleTimer() {
    const { task, update } = this.props
    update({ ...task, status: task.status === 'paused' ? 'running' : 'paused' })
  }

  // start tickin
  componentDidMount() {
    this.ticker = setInterval(this.tick.bind(this), this.rate)
  }

  render() {
    const { task: { title, comment, duration, status, progress }  } = this.props
    
    const running = status === 'running'
    const paused = status === 'paused'
    const color = statusColor(status)

    return (
      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', margin: 5, border: `1px solid ${color}` }}>
        <div style={{ padding: 20 }}>
          <h1>{title}</h1>
          <p>{comment} -- {duration}</p>
          <button disabled={status === 'complete'} onClick={this.handleTimer.bind(this)}>
            {running ? 'pause' : 'resume'}
          </button>
          <button onClick={this.remove.bind(this)}>remove</button>
          <button onClick={this.edit.bind(this)}>edit</button>
        </div>

        <Progress progress={progress*100} rate={this.rate/1000} />
      </div>
    )
  }
}

export default Task
