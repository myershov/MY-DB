import React, { Component } from 'react'
import AddForm from './AddForm.jsx'
import { selectRow, getTasksThunk } from '../../store/gameboard/actions'
import { connect } from 'react-redux'
class Edit extends Component {
  state = {
    visible: true,
  }

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) return
      if (values.switch == true) {
        values.dailyPlan = 'End of Day'
      } else {
        values.TottalyWorked = ''
      }

      values.key = this.props.row.key
      values.username = this.props.row.username
      values.date = this.props.row.date

      this.props.onClick(values)
      form.resetFields()

      this.props.dispatch(selectRow(''))
      this.props.dispatch(getTasksThunk())
    })
  }

  // TODO: Recheck and use modern way of refs
  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    return (
      <div>
        {/* this.checkUser() !== null && */}
        {this.props.row.key && (
          <AddForm
            selected={this.props.row}
            wrappedComponentRef={this.saveFormRef}
            onCancel={() => this.props.dispatch(selectRow(''))}
            onCreate={this.handleCreate}
          />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  // debugger

  row: state.selectedRow,
})

export default connect(mapState)(Edit)
