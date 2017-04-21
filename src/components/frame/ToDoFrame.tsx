import * as React from 'react'
import { ToDo } from '../interface/ToDo'

interface ToDoFrameProps {
  toDoFrameContent: ToDo
  idx: Number
  manipulateCallback(type: String, idx: Number): void
}

export class ToDoFrame extends React.Component<ToDoFrameProps, {}> {
  static PropTypes = {
    toDoFrameContent: React.PropTypes.object.isRequired,
    idx: React.PropTypes.number.isRequired,
    manipulateCallback: React.PropTypes.func.isRequired,
  }
  handleDone = () => {
    this.props.manipulateCallback('done', this.props.idx)
  }
  render() {
    return (
      <div>
        <div>
          {this.props.idx} : {this.props.toDoFrameContent.content}
          -->
          { this.props.toDoFrameContent.isDone ? 'yes' : 'no'}
          <button
            onClick={ this.handleDone }
          >
            Done
          </button>
        </div>
      </div>
    )
  }
}
