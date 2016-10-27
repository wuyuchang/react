import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              黑魔法
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to="/"><NavItem>黑身份</NavItem></IndexLinkContainer>
              <LinkContainer to="/todo"><NavItem>任务</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ReactCSSTransitionGroup
          component="div"
          className="container app"
          transitionName="example"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {React.cloneElement(this.props.children, {key:this.props.location.pathname})}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
