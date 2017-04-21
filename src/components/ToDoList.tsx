import * as React from 'react'
import { ToDo } from  './interface/ToDo'
import { ToDoFrame } from './frame/ToDoFrame'

interface ToDoListProps {
  toDoList: ToDo[]
  changedListCallback(type: String, idx: Number): void
}

export class ToDoList extends React.Component<ToDoListProps, {}> {
  static PropTypes = {
    toDoList: React.PropTypes.array.isRequired,
    changedListCallback: React.PropTypes.func.isRequired,
  }

  handleChange = (type: String, idx: Number) => {
    if (type === 'checked') {
      this.props.changedListCallback('checked', idx)
    } else if (type === 'done') {
      this.props.changedListCallback('done', idx)
    }
  }

  renderList() {
    const itemsEl = this.props.toDoList.map((current: ToDo, idx: Number) => {
      return (
        <ToDoFrame
          key={ `toDoFrame${idx}` }
          idx={ idx }
          toDoFrameContent={ current }
          manipulateCallback={ this.handleChange }
        />
      )
    })
    return itemsEl
  }

  render() {
    return (
      <div>
        { this.renderList() }
      </div>
    )
  }
}
