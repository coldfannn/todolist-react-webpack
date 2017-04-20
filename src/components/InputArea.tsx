import * as React from 'react'

interface InputAreaState {
  currentTask: String
}

export class InputArea extends React.Component<{}, InputAreaState> {
  constructor() {
    super()
    this.state = {
      currentTask: ''
    }
  }
  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.setState({
      currentTask: value
    })
  }
  handleSubmit = () => {
    alert(this.state.currentTask)
    // console.warn(this.state.currentTask)
  }
  render() {
    return (
      <div>
        <h2>Type Ur Task</h2>
        <input
          type='text'
          onChange={ this.handleChange }
        />
        <button onClick={ this.handleSubmit }>Submit</button>
        <div>
          { this.state.currentTask }
        </div>
      </div>
    )
  }
}
