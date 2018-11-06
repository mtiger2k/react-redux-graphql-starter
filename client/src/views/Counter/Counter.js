import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import reducer, {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'
import injectReducer from '../../utils/injectReducer';

import Upload from './Upload'

const Counter = props => (

  <div className="animated fadeIn">
    <Row>
      <Col xl={6}>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> Redux <small className="text-muted">example</small>
          </CardHeader>
          <CardBody>
            <h1>Counter</h1>
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'counter', reducer });

export default compose(
  withReducer, 
  withConnect,
)(Counter);

