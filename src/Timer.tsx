

// I'm not entirely sure if this is going to work, but heres the current idea:
// every time the timer is paused or started, add a breakpoint to the breaks array + either 'pause' or 'resume'
// use the breaks, startTime, and duration to figure out how much time is left
// when you loop over the breaks, you should never have 2 pause or resume breaks in a row, I think. As long as you prevent resuming on an already running timer, then I think this should hold up.

import { relative } from "path"


class Timer {
  public startTime: number
  public duration: number
  public status: 'creating' | 'running' | 'paused' | 'complete'
  public progress: number
  public timerId: any
  public breaks: any
  private rate: number = 1000
  private ticker: any = null
  private onChange: any = function(a:any) {}

  constructor(startTime: number = (new Date).getTime(), duration: number = Infinity) {
    this.startTime = startTime
    this.duration = duration
    this.status = 'creating'
    this.progress = 0
    this.breaks = []
  }

  // the tick is always running after the timer starts for the first time. 
  // NVM it should end after completion
  // its either accumulating the pause time or progression time
  private tick() {
    const now = (new Date()).getTime()
    const progress = (now - this.startTime) / this.duration
    // console.log(this)
    this.progress = Math.min(progress, 1)
    this.relay()

    if (progress >= 1) {
      this.end()
    } else {
      // console.log(`${this.status} -- ${progress}%`)
    }
    // if (this.status === 'running') {
    //   console.log('i am running')
    // } else if (this.status === 'paused') {
    //   console.log('i am paused')
    // } else {
    //   alert('why is the status not set but tick() has been called???')
    // }
  }

  private relay() {
    const { startTime, duration, status, progress, onChange } = this
    onChange({ startTime, duration, status, progress })
  }

  private end() {
    this.status = 'complete'
    clearInterval(this.ticker)
    this.relay()
  }
  
  start() {
    if (this.status === 'running') {
      console.warn('Trying to start a timer that is already running')
    } else {
      this.status = 'running'
      this.ticker = setInterval(this.tick.bind(this), this.rate)
    }
  }

  public listen(fn: (currentState:any) => void) {
    this.onChange = fn
    this.start()
  }

  public stop = () => {
    this.status = 'paused'
    // console.log('timer paused')
  }

  private addBreakpoint() {
    console.log('PRIVATE -- add breakpoint')
  }
}

export default Timer
