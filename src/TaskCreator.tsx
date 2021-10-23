import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { blankTask, theme } from './utils'

const Form = styled.form`

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 25vw;

  // input, textarea {
  //   background: none;
  //   border: none;
  //   outline: none;
  //   // border: 1px dashed #eee;
  //   width: 100%;
  // }

  // input {
  //   color: ${theme.light};
  //   font-size: 30px;
  //   border-radius: 10px;
  //   background: #fff1;
  //   padding: 10px 15px;
  //   width: 40vw;
  //   display: block;
  //   margin: auto;
  //   text-align: center;

  //   ::placeholder {
  //     opacity: .5;
  //   }
  // }

  // textarea {
  //   font-size: 20px;
  //   opacity: .75;
  //   margin: 15px;
  //   padding: 5px;
  //   // color: #d4cccc;
   
  //   ::placeholder {
  //     opacity: .3;
  //   }
  // }

  // #times {
  //   display: flex;
    
  //   button {
  //     margin-right: 5px;
  //   }
  // }

`

const TaskCreator: React.FC<any> = props => {
  const [data, setData] = useState(blankTask)
  const { create, staged } = props
  const times = [.1, 1, 5, 10, 15, 30, 60].map(t => t*60*1000)

  useEffect(() => {
    if (staged !== null) {
      setData({ ...data, ...staged })
    }
  }, [staged])

  return (
    <Form style={props.style}>
      <input value={data.title} placeholder='...' onChange={e => setData({ ...data, title: e.target.value })} />
      <textarea value={data.comment} placeholder='Any other information?' onChange={e => setData({ ...data, comment: e.target.value })} />
      <div id='times'>
        {times.map(time => {
          const selected = time === data.duration
          return <button className={selected ? 'cur-btn' : ''} type='button' onClick={() => setData({ ...data, duration: time })}>{time/1000/60}</button>
        })}
      </div>
      <button type='button' onClick={() => create(data)}>create</button>
    </Form>
  )
}

export default TaskCreator
