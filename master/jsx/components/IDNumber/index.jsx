import React, { Component } from 'react'
import { Grid, FormGroup, InputGroup, Button, Form, FormControl, HelpBlock } from 'react-bootstrap'
import IDTable from './IDTable'
import ID from './ID'
import District from './../District/index'

export default class IDNumber extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      sum: 1,
      validationState: null,
      validationText: '',
      ids: new ID(1).ids
    }

  }

  handleChange(e) {
    this.setState({
      sum: e.target.value,
      validationText: '',
      validationState: null,
    })
  }

  handleSubmit(e) {
    var val = Number(this.state.sum)

    if (isNaN(val)) {
      this.setState({
        validationText: '你个傻逼，看不懂要输入数字啊？',
        validationState: 'error'
      })
    } else if (val <= 0) {
      this.setState({
        validationText: '请输入大于0的数字',
        validationState: 'error'
      })
    } else if (val >= 10000) {
      this.setState({
        validationText: '你个傻逼，不怕电脑卡死吗？最多输入9999！！！',
        validationState: 'error'
      })
    } else {
      this.setState({
        validationText: '',
        validationState: null,
        ids: new ID(val).ids
      })
    }
  }

  getBtnStyle() {
    let result = ''
    switch(this.state.validationState) {
      case 'error': result = 'danger'; break;
      default: result = 'primary';
    }
    return result
  }

  render() {
    return (
      <div>
        <Form inline>
          <District />
        </Form>
        <FormGroup validationState={this.state.validationState}>
          <InputGroup>
            <FormControl type="text" placeholder="请输入要生成的黑身份个数" defaultValue={this.state.sum} onChange={this.handleChange}/>
            <InputGroup.Button>
              <Button bsStyle={this.getBtnStyle()} onClick={this.handleSubmit}>生成</Button>
            </InputGroup.Button>
          </InputGroup>
          <HelpBlock>{this.state.validationText}</HelpBlock>
        </FormGroup>
        <IDTable ids={this.state.ids} />
      </div>
    )
  }
}
