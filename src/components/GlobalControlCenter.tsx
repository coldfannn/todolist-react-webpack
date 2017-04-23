import * as React from 'react'

interface GlobalControlCenterProps {
  checkedAllCallback(isCheckedAll: boolean): void
  globalControlCallback(currentTask: string): void
}

interface GlobalControlCenterState {
  isCheckedAll: boolean
}

export class GlobalControlCenter extends React.Component<GlobalControlCenterProps, GlobalControlCenterState> {
  static PropTypes = {
    checkedAllCallback: React.PropTypes.func.isRequired,
    globalControlCallback: React.PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      isCheckedAll: false
    }
  }

  handleCheckedAll = () => {
    this.setState({
      isCheckedAll: !this.state.isCheckedAll
    }, () => {
      this.props.checkedAllCallback(this.state.isCheckedAll)
    })
  }

  handleSubmit = (type: string) => (_) => {
    this.props.globalControlCallback(type)
  }

  render() {
    return (
      <div>
        <h2>Global Control</h2>
        <input
          id='checkAllInput'
          type='checkbox'
          onChange={ this.handleCheckedAll }
        />
        <button onClick={ this.handleSubmit('done') }>Done All</button>
        <button onClick={ this.handleSubmit('delete') }>Delete All</button>
        <div>
          _________________________________
        </div>
      </div>
    )
  }
}
