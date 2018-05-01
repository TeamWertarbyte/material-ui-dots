/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Dots from './Dots'

const theme = createMuiTheme()

function themed (Component) {
  return (props) => (
    <MuiThemeProvider theme={theme}>
      <Component {...props} />
    </MuiThemeProvider>
  )
}

const ThemedDots = themed(Dots)

test('three dots, first is selected', () => {
  const tree = renderer.create(
    <ThemedDots
      count={3}
      index={0}
    />
  )
  expect(tree).toMatchSnapshot()
})

test('custom style', () => {
  const tree = renderer.create(
    <ThemedDots
      count={5}
      index={0}
      style={{ backgroundColor: 'red' }}
    />
  )
  expect(tree).toMatchSnapshot()
})

test('onDotClick handler', () => {
  const handleDotClick = jest.genMockFunction()
  const tree = renderer.create(
    <ThemedDots
      count={3}
      index={0}
      onDotClick={handleDotClick}
    />
  )
  expect(tree).toMatchSnapshot()
})

test('custom dot color', () => {
  const tree = renderer.create(
    <ThemedDots
      count={4}
      index={0}
      dotColor='red'
    />
  )
  expect(tree).toMatchSnapshot()
})

test('custom dot size', () => {
  const tree = renderer.create(
    <ThemedDots
      count={4}
      index={0}
      dotSize={12}
    />
  )
  expect(tree).toMatchSnapshot()
})
