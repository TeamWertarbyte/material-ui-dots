import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

const styles = {
  dots: {
    position: 'relative'
  },
  dotOuter: {
    float: 'left',
    position: 'absolute'
  },
  dot: {
    transition: 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    borderRadius: 4
  }
}

export default class Dots extends Component {
  constructor (props) {
    super(props)
    this.state = {
      previousIndex: props.index || 0
    }
  }

  componentWillReceiveProps ({index, dotColor, dotSize}) {
    if (index !== this.props.index) {
      this.setState({previousIndex: this.props.index})
      this.timeout = setTimeout(() => {
        this.timeout = null
        this.setState({previousIndex: index})
      }, 450)
    }
  }

  componentWillUnmount () {
    if (this.timeout != null) {
      clearTimeout(this.timeout)
    }
  }

  handleDotClick = (index, event) => {
    if (this.props.onDotClick != null) {
      this.props.onDotClick(index, event)
    }
  }

  render () {
    const {count, index, style = {}, onDotClick, dotColor, dotSize, ...other} = this.props
    const {previousIndex} = this.state
    styles.dot = {
      ...styles.dot,
      width: dotSize,
      height: dotSize
    }
    styles.dotOuter = {
      ...styles.dotOuter,
      width: dotSize,
      height: dotSize,
      padding: dotSize / 2
    }
    return (
      <div style={{...style, width: count * (dotSize * 2)}} {...other}>
        <div style={styles.dots}>
          {[...Array(count).keys()].map((i) => (
            <div
              key={i}
              style={{
                ...styles.dotOuter,
                left: i * (dotSize * 2),
                cursor: onDotClick != null ? 'pointer' : 'inherit'
              }}
              onClick={(event) => this.handleDotClick(i, event)}
            >
              <Paper
                square={false}
                elevation={0}
                style={{
                  ...styles.dot,
                  backgroundColor: dotColor,
                  opacity: i >= Math.min(previousIndex, index) && i <= Math.max(previousIndex, index) ? 0 : 0.5
                }}
              />
            </div>
          ))}
          <Paper
            elevation={0}
            style={{
              ...styles.dot,
              backgroundColor: dotColor,
              position: 'absolute',
              marginTop: (dotSize / 2),
              left: Math.min(previousIndex, index) * (dotSize * 2) + (dotSize / 2),
              width: Math.abs(previousIndex - index) * (dotSize * 2) + dotSize
            }}
          />
        </div>
      </div>
    )
  }
}

Dots.propTypes = {
  count: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object,
  dotColor: PropTypes.string,
  dotSize: PropTypes.number,
  onDotClick: PropTypes.func
}

Dots.defaultProps = {
  dotColor: '#fff',
  dotSize: 8
}
