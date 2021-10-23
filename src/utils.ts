import { createGlobalStyle } from 'styled-components'

// all interfaces will be prefaced with i
export interface iTask {
  title: string,
  comment: string, 
  id: string,
  duration: number,
  startTime: number,
  status: 'creating' | 'paused' | 'running' | 'complete',
  pauseTime: number,
}

export const blankTask = {
  title: '',
  comment: '', 
  id: '',
  duration: 0,
  startTime: 0,
  status: 'creating',
  progress: 0,
  pauseTime: 0,
}

export const statusColors:any = {
  creating: '#ff0',
  running: '#5b9bea',
  paused: '#fad',
  complete: '#5b9',
}

export function statusColor(status:string) {
  return statusColors[status]
}

const dark = '#38393F'
const light = '#D4CCCC'
const accent = '#EFDD9B'

export const theme = {
  dark, light, accent
}

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Work Sans, sans-serif;
    font-weight: 300;
    color: ${accent};
    // transition: all .25s ease;
    transition: background .25s ease, border .25s ease, opacity .25s ease, margin .25s ease;
  }

  body {
    background: ${dark};
    // padding: 0 25vw;
    font-size: 15px;
    height: 100vh;
  }

  .silent {
    opacity: .1;
    :hover { opacity: 1 }
  }

  button {
    padding: 5px 20px;
    font-weight: 400;
    font-size: 16px;
    border: 1px solid ${accent};
    background: none;
    border-radius: 999px;
    display: inline-block;

    :hover {
      background: ${accent};
      color: ${dark};
      
      * {
        color: ${dark};
      }
    }
  }

  .cur-btn {
    background: ${accent};
    color: ${dark};
    // color: #fff;
  }

  i {
    font-style: normal;
    font-weight: 100;
  }

  b {
    font-weight: 400;
  }

  .create-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    border: 1px solid ${accent};
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    padding: 0;
    :hover {
      background: ${accent};
      color: ${dark};
    }
  }

  // .btn-lg {
  //   padding: 8px 25px;
  //   font-size: 18px;
  //   background: #ddd;
  // }
`