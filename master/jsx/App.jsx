import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              黑魔法，黑科技
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/todo"><NavItem>任务</NavItem></LinkContainer>
              <LinkContainer to="/IDNumber"><NavItem>黑身份</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid>{this.props.children}</Grid>
      </div>
    )
  }
}
