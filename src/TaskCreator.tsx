import React, { useState } from 'react'
import styled from 'styled-components'
import { colors, iTask, blankTask } from './utils'

const Form = styled.form`
  outline: none;

  input, textarea {
    border: none;
    background: none;
    outline: none;
    // border-radius: 6px;
    width: 100%;

    :hover {
    }

    :focus::placeholder {
      opacity: .2;
    }
  }

  input {
    font-size: 35px;
    margin-bottom: 10px;
    color: ${colors.green};
    :focus { color: black }
  }

  textarea {
    font-size: 18px;
    margin-left: 10px;
    opacity: .8;
    min-height: 80px;
  }

  button {

  }
`

const Pill = styled.div<{ selected?: boolean }>`
  // border: none;
  // outline: none;

  cursor: pointer;
  background: ${props => props.selected ? colors.green : '#eee'};
  color: ${props => props.selected ? 'white' : '#666'};
  display: inline;
  margin: 5px;
  padding: 6px 15px;
  border-radius: 999px;
  font-size: 14px;

  :hover {
    opacity: ${props => props.selected ? 1 : .5};
  }
`

const TaskCreator: React.FC<{ create: (form:any) => void }> = props => {
  const [form, setForm] = useState<iTask>(blankTask)
  const { create } = props
  const times = [.1, 1, 5, 10, 15, 30, 45, 60]
  return (
    <Form {...props}>
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} name='name' placeholder="What's the task?" />
      <br />
      <textarea value={form.comment} onChange={e => setForm({ ...form, comment: e.target.value })} name='description' placeholder='Comment...' />
      <div style={{ display: 'flex' }}>
        {times.map((time, i) => (
          <Pill key={i} selected={form.duration === time} onClick={() => setForm({ ...form, duration: time })}>{time}m</Pill>
        ))}
      </div>
      
      <Pill onClick={() => create(form)} style={{
        display: 'inline-block',
        padding: '8px 40px',
        fontSize: 18,
        marginTop: 20,
        borderRadius: 4,
        pointerEvents: form.duration ? 'all' : 'none',
        // opacity: form.time ? 1 : .5,
        background: form.duration ? colors.blue : '#eee',
        color: '#fff',
      }}>
        Lesketit
      </Pill>
      {/* <p>or</p>
      <p>+</p>
      <button>Do it</button> */}
    </Form>
  )
}

export default TaskCreator