import * as React from 'react'
import { ToDo } from  './components/interface/ToDo'
import { InputArea } from  './components/InputArea'
import { ToDoList } from  './components/ToDoList'

interface ToDoListState {
  toDoList: ToDo[]
}

export class HelloWorld extends React.Component<{}, ToDoListState> {
  constructor() {
    super()
    this.state = {
      toDoList: []
    }
  }

  refreshList(toDoList: ToDo[]) {
    this.setState({
      toDoList
    })
  }

  handleInsert = (content) => {
    const toDoList = this.state.toDoList
    toDoList.unshift({
      _id: '12313123',
      content,
      isDone: false,
      isChecked: false
    })
    this.refreshList(toDoList)
  }

  handleChange = (type: String, idx) => {
    const toDoList = this.state.toDoList
    if (type === 'done') {
      toDoList[idx].isDone = !toDoList[idx].isDone
    } else if (type === 'checked') {
      toDoList[idx].isChecked = !toDoList[idx].isChecked
    }
    this.refreshList(toDoList)
  }

  render() {
    return (
      <div>
        <InputArea
          insertCallback = { this.handleInsert }
        />
        <ToDoList
          toDoList={ this.state.toDoList }
          changedListCallback={ this.handleChange }
        />
      </div>
    )
  }
}
