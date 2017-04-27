import * as React from 'react'
import * as _ from 'lodash'
import { ToDo } from  './interface/ToDo'
import { InputArea } from  './components/input-area/InputArea'
import { GlobalControlCenter } from  './components/global-control-center/GlobalControlCenter'
import { ToDoList } from  './components/to-do-list/ToDoList'
import './app.less'

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

  globalControlAll = (type: string) => {
    switch (type) {
      case 'done':
        return this.state.toDoList.map((current) => {
          return Object.assign({}, current, {
            isDone: current.isChecked ? true : current.isDone
          })
        })
      case 'undone':
        return this.state.toDoList.map((current) => {
          return Object.assign({}, current, {
            isDone: current.isChecked ? false : current.isDone
          })
        })
      default:
        return this.state.toDoList.filter((current) => {
          return !current.isChecked
        })
    }
  }

  checkedAll = (isCheckedAll: boolean) => {
    return this.state.toDoList.map((current) => {
      return Object.assign({}, current, {
        isChecked: isCheckedAll
      })
    })
  }

  insertList = (newContent: ToDo) => {
    const toDoList = new Array(newContent)
    return toDoList.concat(this.state.toDoList)
  }

  updateListStatus = (type: string, id) => {
    return this.state.toDoList.map((current) => {
      if (current._id === id) {
        return type === 'done' ?
          Object.assign({}, current, {
            isDone: !current.isDone
          })
          :
          Object.assign({}, current, {
            isChecked: !current.isChecked
          })
      }
      return current
    })
  }

  updateListContent = (updateContent: string, id) => {
    return this.state.toDoList.map((current) => {
      if (current._id === id) {
        return Object.assign({}, current, {
          content: updateContent
        })
      }
      return current
    })
  }

  handleGlobalControl = (type: string) => {
    this.setState({
      toDoList: this.globalControlAll(type)
    })
  }

  handleCheckedAll = (isCheckedAll: boolean) => {
    this.setState({
      toDoList: this.checkedAll(isCheckedAll)
    })
  }

  handleInsert = (content) => {
    this.setState({
      toDoList: this.insertList({
        _id: _.uniqueId(),
        content,
        isDone: false,
        isChecked: false
      })
    })
  }

  handleChange = (type: string, id) => {
    this.setState({
      toDoList: this.updateListStatus(type, id)
    })
  }

  handleUpdate = (updateContent: string, id) => {
    this.setState({
      toDoList: this.updateListContent(updateContent, id)
    })
  }

  renderInputArea() {
    return (
      <InputArea
        insertCallback = { this.handleInsert }
      />
    )
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

  renderToDoList() {
    return (
      <ToDoList
        toDoList={ this.state.toDoList }
        changedListCallback={ this.handleChange }
        updatedListCallback={ this.handleUpdate }
      />
    )
  }

  render() {
    return (
      <div>
        { this.renderInputArea() }
        { this.renderGlobalControlCenter() }
        { this.renderToDoList() }
      </div>
    )
  }
}
