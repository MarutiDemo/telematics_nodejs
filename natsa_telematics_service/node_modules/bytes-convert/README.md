# bytes-convert

![Release](https://github.com/hy0ug0/bytes-convert/workflows/Release/badge.svg?branch=master)
<a href="https://codeclimate.com/github/hy0ug0/bytes-convert/maintainability"><img src="https://api.codeclimate.com/v1/badges/1b2594668f2e70da2969/maintainability" /></a>
<a href="https://codeclimate.com/github/hy0ug0/bytes-convert/test_coverage"><img src="https://api.codeclimate.com/v1/badges/1b2594668f2e70da2969/test_coverage" /></a>

A simple JavaScript module to convert bits to either bytes or octet.

## Usage

### In Node.js

```javascript
const bytesConvert = require('bytes-convert');

bytesConvert.convertFromOctet(65631);
// '65.63Ko'

bytesConvert.convertFromBits(6563123);
// '820.39Ko'

// OR

import { convertFromOctet, convertFromBits, Units } from 'bytes-convert';

convertFromOctet(65631);
convertFromOctet(65631, Units.OCTET);
// '65.63Ko'
convertFromOctet(65631, Units.BYTE);
// '6.56MB'

convertFromBits(6563123);
convertFromBits(6563123, Units.OCTET);
// '820.39Ko'
convertFromBits(6563123, Units.BYTE);
// '820.39KB'
```

### In browser

```html
<script src="https://cdn.jsdelivr.net/npm/bytes-convert/dist/bytes-convert.umd.min.js"></script>

<script>
    bytesConvert.convertFromOctet(65631);
    // '65.63Ko'
    
    bytesConvert.convertFromBits(6563123);
    // '820.39Ko'
</script>
```
