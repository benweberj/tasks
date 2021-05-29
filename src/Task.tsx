import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Timer from './Timer'

import { iTask, colors, statusColor } from './utils'

const Card = styled.div<any>`
  // background: #eee8;
  background: ${props => statusColor(props.status)}33;
  // box-shadow: 2px 2px 5px 1px #0002;
  border: 1px solid #0001;
  color: #666;
  border-radius: 10px 10px 4px 4px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  // display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 18px;
  }
`

// const Btn = styled.div<any>`
//   width: 16px;
//   height: 16px;
//   border-radius: 99px;
//   background: ${props => props.cancel ? colors.red : props.pause ? colors.blue : colors.blue };
//   line-height: 15px;
//   font-size: 11px;
//   color: #fff;
//   text-align: center;
//   cursor: pointer;
//   opacity: .5;

//   :hover {
//     transform: scale(1.2);
//     opacity: 1;
//   }
// `

const Progress = styled.div<any>`
  width: 100%;
  height: 6px;
  background: #0001;
  position: absolute;
  bottom: 0;
  left: 0;
  background: ${props => props.task.status==='paused' ? colors.blue : `linear-gradient(90deg, ${colors.green}, ${colors.red})`};
  clip-path: polygon(0% 0%, ${props => props.p*100}% 0%, ${props => props.p*100}% 100%, 0% 100%);
  // transition: all ${props => props.period}s ease;

  // :after {
  //   transition: all 1s linear;
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   background: red;
  //   height: 100%;
  //   width: ${props => props.p*100}%;
  // }

`

interface TaskHandler {
  task: iTask,
  remove: (id:string) => void,
  update: (task:iTask) => void,
}

const Task: React.FC<TaskHandler> = props => {
  const { task, remove, update } = props
  const { name, comment, id, timer } = task
  const [timerState, setTimerState] = useState<any>(timer)
  const { status, progress, duration, startTime } = timerState
  const running = status === 'running'

  // useEffect(() => console.log(timerState))
  
  useEffect(() => {
    timer.listen(state => {
      console.log(state)
      setTimerState(state)
    })
    return () => { timer.stop();  console.log(`The task with name ${name} must be deleted`) }
  }, [])

  return (
    <Card status={timer.status}>
      {name} -- {comment} -- ({id})
      <pre><code>
      {JSON.stringify(timerState, null, 2)}
      </code></pre>
      <button onClick={running ? timer.stop : timer.start}>{running ? 'pause' : 'resume'}</button>
      <button onClick={() => remove(id)}>Delete</button>
    </Card>
  )


  // return (
  //   <Card task={task} style={{ marginBottom: 10 }}>
  //     {/* <div className='topright' style={{ display: 'flex' }}> */}
  //       {/* <Btn pause onClick={status==='running' ? this.pause : this.resume} style={{ marginRight: 4 }}>{'p'}</Btn>
  //       <Btn cancel onClick={() => this.remove(id)}>x</Btn> */}
  //     {/* </div> */}
  //     <div>
  //       <p style={{ opacity: .5, top: 2, left: 2, fontSize: 12 }} className='topleft'>{duration}</p>
  //       <h1>{name}</h1>
  //       <p>{comment}</p>
  //       <p>{status}</p>
  //       <button>
  //       <Progress period={this.period/1000} task={task} p={progress} />
  //     </div>

  //     <div style={{ display: 'flex' }}>
  //       <button className={status === 'complete' ? 'disabled' : undefined} onClick={this.togglePause}>{status === 'running' ? 'pause' : 'resume'}</button>
  //       <button onClick={() => this.remove(id)}>delete</button>
  //     </div>
  //   </Card>
  // )
}


//   // tick = () => {
//   //   const { task, update } = this.props
//   //   const { status, pauseTime, duration, startTime } = task
//   //   console.log('tick')
//   //   if (status === 'paused') { //
//   //     update({ ...task, pauseTime: pauseTime + this.period })
//   //   } else { // it's going
//   //     const progress = (new Date().getTime() - startTime - pauseTime) / duration
//   //     if (progress >= 1) { // it's over
//   //       clearInterval(this.interval)
//   //       update({ ...task, status: 'complete', progress })
//   //     } else {
//   //       update({ ...task, progress })
//   //     }
//   //   }
//     // let now = new Date().getTime()
//     // console.log((now - task.startTime)/1000)
//     // if ((task.ellapsed || 0) >= task.duration) { // finished
//     //   update({ ...task, status: 'complete' })
//     //   clearInterval(this.interval)
//     //   this.interval = null
//     // } else update({ ...task, ellapsed: (task.ellapsed as any) + amount })
//   // }

//   resume = () => {
//     // const { update, task } = this.props
//     // update({ ...task, status: 'running' })
//     // if (this.interval !== null) {
//     //   clearInterval(this.interval)
//     //   this.interval = null
//     // }
//     // this.interval = setInterval(this.tick, this.period)
//   }

//   togglePause = () => {
//     // const { update, task } = this.props
//     // let newState:any = task.status === 'running' ? 'paused' : 'running'
//     // update({ ...task, status: newState })
//   }

//   remove = (id:string) => {
//     const { remove } = this.props
//     clearInterval(this.interval)
//     // this.interval = null
//     remove(id)
//   }

//   componentDidUpdate = (prevProps:TaskHandler, prevState:TaskHandler) => {
//     // if (this.props.task.status === 'complete' && prevProps.task.status === 'running') {
//     //   alert('done')
//     // }
//   }

//   componentDidMount = () => {
//     // this.update()
//     const { task: { status, name } } = this.props
//     // if (task.status === 'running') {
//     //   this.resume()
//     // }
//     if (['paused', 'running'].includes(status)) {
//       this.interval = setInterval(this.tick, this.period)
//     } else {
//       console.log(`I think task with name ${name} is done`)
//     }
//   }

//   componentWillUpdate = (prevProps:any, prevState:any) => {
//     console.log(prevProps, this.props)
//     console.log('task is re rendering')
//   }

//   render() {

//   }
// }

export default Task
