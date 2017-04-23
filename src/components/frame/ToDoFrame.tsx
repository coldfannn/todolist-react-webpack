import * as React from 'react'
import * as $ from 'jquery'
import { ToDo } from '../interface/ToDo'

interface ToDoFrameProps {
  toDoFrameContent: ToDo
  idx: number
  manipulateCallback(type: string, id: string): void
  manipulateUpdateCallback(updateContent: string, id: string): void
}

interface ToDoFrameState {
  updateContent: string
}

const styles = {
  show: {
    display: 'inline',
  },
  hide: {
    display: 'none',
  }
}

export class ToDoFrame extends React.Component<ToDoFrameProps, ToDoFrameState> {
  static PropTypes = {
    toDoFrameContent: React.PropTypes.object.isRequired,
    idx: React.PropTypes.number.isRequired,
    manipulateCallback: React.PropTypes.func.isRequired,
  }
  constructor() {
    super()
    this.state = {
      updateContent: ''
    }
  }
  componentDidMount() {
    const id = this.props.toDoFrameContent._id
    const ele = document.getElementById(`updateIpt_${id}`) as HTMLInputElement
    ele.value = this.props.toDoFrameContent.content
  }
  componentWillReceiveProps(nextProps) {
    const id = this.props.toDoFrameContent._id
    const ele = document.getElementById(`checked_${id}`) as HTMLInputElement
    ele.checked = nextProps.toDoFrameContent.isChecked
  }
  handleChange = (type: string) => (_) => {
    const id = this.props.toDoFrameContent._id
    this.props.manipulateCallback(type, id)
  }
  btnAnimate = () => {
    const id = this.props.toDoFrameContent._id
    $(`#updateBtn_${id}`).fadeIn()
    $(`#doneBtn_${id}`).fadeIn()
    $(`#taskContent_${id}`).fadeIn()
    $(`#yesBtn_${id}`).hide()
    $(`#noBtn_${id}`).hide()
    $(`#updateIpt_${id}`).hide()
  }
  handleUpdateContentChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.setState({
      updateContent: value
    })
  }
  handleUpdateSubmit = () => {
    const id = this.props.toDoFrameContent._id
    this.props.manipulateUpdateCallback(this.state.updateContent, id)
    this.btnAnimate()
  }
  handleUpdateBtnClick = () => {
    const id = this.props.toDoFrameContent._id
    $(`#updateBtn_${id}`).hide()
    $(`#doneBtn_${id}`).hide()
    $(`#taskContent_${id}`).hide()
    $(`#yesBtn_${id}`).fadeIn()
    $(`#noBtn_${id}`).fadeIn()
    $(`#updateIpt_${id}`).fadeIn()
  }
  handleCancel = () => {
    const id = this.props.toDoFrameContent._id
    this.setState({
      updateContent: this.props.toDoFrameContent.content
    }, () => {
      const ele = document.getElementById(`updateIpt_${id}`) as HTMLInputElement
      ele.value = this.props.toDoFrameContent.content
      this.btnAnimate()
    })
  }
  render() {
    return (
      <div>
        <input
          id={`checked_${this.props.toDoFrameContent._id}`}
          type='checkbox'
          onChange={ this.handleChange('checked') }
        />
        <span
          id={`taskContent_${this.props.toDoFrameContent._id}`}
          style={ styles.show }
        >
          {this.props.idx} : {this.props.toDoFrameContent.content}
        </span>
        <input
          id={`updateIpt_${this.props.toDoFrameContent._id}`}
          type='text'
          style={ styles.hide }
          onChange={ this.handleUpdateContentChange }
        />
        <div id='btnArea'>
          <button
            id={`doneBtn_${this.props.toDoFrameContent._id}`}
            onClick={ this.handleChange('done') }
            style={ styles.show }
          >
            Done
          </button>
          <button
            id={`updateBtn_${this.props.toDoFrameContent._id}`}
            onClick={ this.handleUpdateBtnClick }
            disabled={ this.props.toDoFrameContent.isDone }
            style={ styles.show }
          >
            Update
          </button>
          <button
            id={`yesBtn_${this.props.toDoFrameContent._id}`}
            onClick={ this.handleUpdateSubmit }
            style={ styles.hide }
          >
            Yes
          </button>
          <button
            id={`noBtn_${this.props.toDoFrameContent._id}`}
            onClick={ this.handleCancel }
            style={ styles.hide }
          >
            No
          </button>
        </div>
        <p>
          isDone: { this.props.toDoFrameContent.isDone ? 'yes' : 'no'}
          &nbsp;
          isChecked: { this.props.toDoFrameContent.isChecked ? 'yes' : 'no'}
        </p>
      </div>
    )
  }
}
