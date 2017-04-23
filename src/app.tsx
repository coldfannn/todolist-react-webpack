import * as React from 'react'
import * as _ from 'lodash'
import { ToDo } from  './components/interface/ToDo'
import { InputArea } from  './components/InputArea'
import { GlobalControlCenter } from  './components/GlobalControlCenter'
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

  handleGlobalControl = (type: string) => {
    let toDoList = this.state.toDoList
    switch (type) {
      case 'done':
        toDoList.forEach((current) => {
          current.isDone = current.isChecked ? true : current.isDone
        })
        break
      default:
        for (let i = 0; i < toDoList.length; i += 1) {
          if (toDoList[i].isChecked) {
            toDoList.splice(i, 1)
            i -= 1
          }
        }
    }
    this.refreshList(toDoList)
  }

  handleCheckedAll = (isCheckedAll: boolean) => {
    const toDoList = this.state.toDoList
    toDoList.forEach((current) => {
      current.isChecked = isCheckedAll
    })
    this.refreshList(toDoList)
  }

  handleInsert = (content) => {
    const toDoList = this.state.toDoList
    toDoList.unshift({
      _id: _.uniqueId(),
      content,
      isDone: false,
      isChecked: false
    })
    this.refreshList(toDoList)
  }

  handleChange = (type: string, id) => {
    const toDoList = this.state.toDoList
    const idx = _.map(toDoList, '_id').indexOf(id)
    if (type === 'done') {
      toDoList[idx].isDone = !toDoList[idx].isDone
    } else {
      toDoList[idx].isChecked = !toDoList[idx].isChecked
    }
    this.refreshList(toDoList)
  }

  handleUpdate = (updateContent: string, id) => {
    const toDoList = this.state.toDoList
    const idx = _.map(toDoList, '_id').indexOf(id)
    toDoList[idx].content = updateContent
    this.refreshList(toDoList)
  }

  renderGlobalControlCenter() {
    if (this.state.toDoList.length > 0) {
      return (
        <GlobalControlCenter
          checkedAllCallback={ this.handleCheckedAll }
          globalControlCallback={ this.handleGlobalControl }
        />
      )
    }
    return null
  }

  render() {
    return (
      <div>
        <InputArea
          insertCallback = { this.handleInsert }
        />
        { this.renderGlobalControlCenter() }
        <ToDoList
          toDoList={ this.state.toDoList }
          changedListCallback={ this.handleChange }
          updatedListCallback={ this.handleUpdate }
        />
      </div>
    )
  }
}
