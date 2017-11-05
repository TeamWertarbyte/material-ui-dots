/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Dots from './Dots'

jest.useFakeTimers()

describe('<Dots />', () => {
  it('matches the snapshot', () => {
    const tree = mount(<Dots count={3} index={0} />)
    expect(tree).toMatchSnapshot()
  })

  it('highlights the selected dot', () => {
    const tree = mount(<Dots count={3} index={2} />)
    const dots = tree.findWhere((e) => e.type() === 'div' && e.getDOMNode().className.indexOf('Dots-dot-') >= 0)
    expect(dots.length).toBe(4) // 3 dots + highlighting dot

    expect(dots.at(0).getDOMNode().style.opacity).toBe('0.5')
    expect(dots.at(1).getDOMNode().style.opacity).toBe('0.5')
    expect(dots.at(2).getDOMNode().style.opacity).toBe('0')
    expect(dots.at(3).getDOMNode().style.left).toBe(`${4 * 8 + 4}px`)
  })

  it('calls onDotClick when clicking on dots', () => {
    const dotClickHandler = jest.fn()
    const tree = mount(<Dots count={5} index={0} onDotClick={dotClickHandler} />)
    const dots = tree.findWhere((e) => e.type() === 'div' && e.getDOMNode().className.indexOf('Dots-dot-') >= 0)
    expect(dots.length).toBe(6) // 5 dots + highlighting dot

    // click on all the dots
    for (let i = 0; i < 5; i++) {
      dotClickHandler.mockReset()
      dots.at(i).simulate('click')
      expect(dotClickHandler).toHaveBeenCalled()
      expect(dotClickHandler.mock.calls[0][0]).toBe(i)
    }
  })

  it('does not explode when clicking a dot if no onDotClick handler is specified', () => {
    const tree = mount(<Dots count={5} index={0} />)
    const dots = tree.findWhere((e) => e.type() === 'div' && e.getDOMNode().className.indexOf('Dots-dot-') >= 0)
    dots.at(1).simulate('click')
  })

  it('uses a timer when changing the index of animation', () => {
    const tree = mount(<Dots count={5} index={0} />)
    tree.setProps({ index: 1 }) // starts the animation (and the timeout)
    jest.runAllTimers()
    tree.unmount()
    expect(clearTimeout.mock.calls.length).toBe(0) // timer ran, so no timer to cancel on unmount
  })

  it('clears the animation timeout when unmounting', () => {
    const tree = mount(<Dots count={5} index={0} />)
    tree.setProps({ index: 1 }) // starts the animation (and the timeout)
    tree.unmount() // should cancel the timeout
    jest.runAllTimers() // this logs a warning (and thus fails) if the timeout isn't cancelled
  })

  it('does not use the animation timer when the index is not changed', () => {
    setTimeout.mockReset()
    const tree = mount(<Dots count={5} index={0} />)
    tree.setProps({ count: 3 }) // starts the animation (and the timeout)
    expect(setTimeout.mock.calls.length).toBe(0)
  })
})
