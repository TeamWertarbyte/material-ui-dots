# Material-UI Dots

[![npm Package](https://img.shields.io/npm/v/material-ui-dots.svg)](https://www.npmjs.com/package/material-ui-dots)
[![Build Status](https://travis-ci.org/TeamWertarbyte/material-ui-dots.svg?branch=master)](https://travis-ci.org/TeamWertarbyte/material-ui-dots)
[![Coverage Status](https://coveralls.io/repos/github/TeamWertarbyte/material-ui-dots/badge.svg?branch=master)](https://coveralls.io/github/TeamWertarbyte/material-ui-dots?branch=next)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This component gives you animated pagination dots as seen in the [Material Design specs][material-specs] and in the quick settings menu of Android N. The dots were extracted from our [auto-rotating carousel][material-auto-rotating-carousel] component.

[material-specs]: https://material.io/design/communication/onboarding.html#top-user-benefits-model
[material-auto-rotating-carousel]: https://github.com/TeamWertarbyte/material-auto-rotating-carousel

## Installation
```shell
npm i --save material-ui-dots
```

## Usage

There is only a single `Dots` component which is to be used in controlled mode. The following example component will display five dots and select a dot when clicking on it.

```js
import React from 'react'
import Dots from 'material-ui-dots'

class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = { index: 0 }
  }

  render () {
    return (
      <Dots
        index={this.state.index}
        count={5}
        onDotClick={(index) => this.setState({ index })}
      />
    )
  }
}
```

## License

The files included in this repository are licensed under the MIT license.
