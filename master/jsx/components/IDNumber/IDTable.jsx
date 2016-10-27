import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

export default class IDTable extends Component {
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
          {this.props.ids.map(function (id, key) {
            return (
              <tr key={key + 1}>
                <td>{key + 1}</td>
                <td>{id.id}</td>
                <td>{id.position}</td>
                <td>{id.birthday}</td>
                <td>{id.sex}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
