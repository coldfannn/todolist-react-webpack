import * as React from 'react'
import { ToDo } from  './interface/ToDo'
import { ToDoFrame } from './frame/ToDoFrame'

interface ToDoListProps {
  toDoList: ToDo[]
  changedListCallback(type: string, id: string): void
  updatedListCallback(updateContent: string, id: string): void
}

export class ToDoList extends React.Component<ToDoListProps, {}> {
  static PropTypes = {
    toDoList: React.PropTypes.array.isRequired,
    changedListCallback: React.PropTypes.func.isRequired,
  }

  handleChange = (type: string, id: string) => {
    if (type === 'checked') {
      this.props.changedListCallback('checked', id)
    } else if (type === 'done') {
      this.props.changedListCallback('done', id)
    }
  }

  handleUpdate = (updateContent: string, id: string) => {
    this.props.updatedListCallback(updateContent, id)
  }

  renderList() {
    const itemsEl = this.props.toDoList.map((current: ToDo, idx: number) => {
      return (
        <ToDoFrame
          key={ `toDoFrame_${current._id}` }
          idx={ idx }
          toDoFrameContent={ current }
          manipulateCallback={ this.handleChange }
          manipulateUpdateCallback={ this.handleUpdate }
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
