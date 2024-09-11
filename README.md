# Material-UI Dots

[![npm Package](https://img.shields.io/npm/v/material-ui-dots.svg)](https://www.npmjs.com/package/material-ui-dots)

This component gives you animated pagination dots as seen in the [Material Design specs][material-specs] and in the quick settings menu of Android N. The dots were extracted from our [auto-rotating carousel][material-auto-rotating-carousel] component.

[material-specs]: https://material.io/design/communication/onboarding.html#top-user-benefits-model
[material-auto-rotating-carousel]: https://github.com/TeamWertarbyte/material-auto-rotating-carousel

## Installation
```shell
yarn add material-ui-dots
```

## Usage

There is only a single `Dots` component which is to be used in controlled mode. The following example component will display five dots and select a dot when clicking on it.

```js
import * as React from 'react'
import { Dots } from 'material-ui-dots'
import { Box } from '@mui/material';

export const App: React.FC = () => {
  const [index, setIndex] = React.useState<number>(0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 6,
        pb: 0.5,
        width: 200,
      }}
    >
      <Dots index={index} count={5} onDotClick={(value) => setIndex(value)} />
    </Box>
  );
};
```

## License

The files included in this repository are licensed under the MIT license.
