import * as React from 'react'
import { InputArea } from  './components/InputArea'
// import { ToDoList } from  './components/ToDoList'

export class HelloWorld extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <InputArea />
      </div>
    )
  }
}
