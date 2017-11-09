/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Dots from './Dots'

function themed (Component) {
  return (props) => (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
