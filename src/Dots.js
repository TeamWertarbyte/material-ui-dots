import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

const styles = {
  dots: {
    position: 'relative',
    padding: '20px 0 28px'
  },
  dotOuter: {
    width: 8,
    height: 8,
    padding: 4,
    float: 'left',
    position: 'absolute'
  },
  dot: {
    width: 8,
    height: 8,
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

  componentWillReceiveProps ({index, dotColor}) {
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
    const {count, index, style = {}, onDotClick, dotColor, ...other} = this.props
    const {previousIndex} = this.state

    return (
      <div style={{...style, width: count * 16}} {...other}>
        <div style={styles.dots}>
          {[...Array(count).keys()].map((i) => (
            <div
              key={i}
              style={{
                ...styles.dotOuter,
                left: i * 16,
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
              marginTop: 4,
              left: Math.min(previousIndex, index) * 16 + 4,
              width: Math.abs(previousIndex - index) * 16 + 8
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
  onDotClick: PropTypes.func
}

Dots.defaultProps = {
  dotColor: '#fff'
}
