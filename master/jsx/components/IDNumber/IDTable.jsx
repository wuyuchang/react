import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import ID from './ID'

export default class IDTable extends Component {
  generateID() {
    let rows = []
    for (let i = 0; i < this.props.sum; i ++) {
      let id = new ID()
      rows.push(
        <tr key={id.id}>
          <td>{i + 1}</td>
          <td>{id.id}</td>
          <td>{id.position}</td>
          <td>{id.birthday}</td>
          <td>{id.sex}</td>
        </tr>
      )
    }

    return rows
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>序号</td>
            <td>身份证</td>
            <td>地址</td>
            <td>出生日期</td>
            <td>性别</td>
          </tr>
        </thead>
        <tbody>
          {this.generateID()}
        </tbody>
      </Table>
    )
  }
}
