import React, { Component } from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import ID from './../IDNumber/ID'

export default class Last extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

    this.state = {
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleClick() {
    let id = new ID()
    let last = id.calcLastCode(this.state.value).code
    alert(last)
  }


  render() {
    return (
      <FormGroup>
        <FormControl type="text" onChange={this.handleChange} value={this.value}/>
        <Button bsStyle="primary" onClick={this.handleClick}>计算校验位</Button>
      </FormGroup>
    )
  }
}
