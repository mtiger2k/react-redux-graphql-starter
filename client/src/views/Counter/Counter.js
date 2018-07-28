import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

import Upload from './Upload'

const Home = props => (

  <div className="animated fadeIn">
    <Row>
      <Col xl={6}>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
          </CardHeader>
          <CardBody>
            <h1>Home</h1>
            <p>Count: {props.count}</p>

            <p>
              <button onClick={props.increment}>Increment</button>
              <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
                Increment Async
              </button>
            </p>

            <p>
              <button onClick={props.decrement}>Decrement</button>
              <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
                Decrement Async
              </button>
            </p>

            <div><Upload /></div>

            <p>
              <button onClick={() => props.changePage()}>
                Go to home page via redux
              </button>
            </p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>

)

const mapStateToProps = ({ counter }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
