import * as React from 'react'

interface InputAreaProps {
  insertCallback(currentTask: String): void
}

interface InputAreaState {
  currentTask: String
}

export class InputArea extends React.Component<InputAreaProps, InputAreaState> {
  static PropTypes = {
    insertCallback: React.PropTypes.func.isRequired,
  }
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
    this.setState({
      currentTask: ''
    })
    this.props.insertCallback(this.state.currentTask)
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
          _________________________________
        </div>
      </div>
    )
  }
}
