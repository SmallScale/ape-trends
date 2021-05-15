# ape-trends

Want to know how often strangers on the internet mention buying/selling/holding a crypto currency?

Look no further, we can get you all the data you need to make incredibly poor decisions.

That is if that data can be found on [r/CryptoCurrency](https://www.reddit.com/r/CryptoCurrency/).

**_Data from other subreddits and social media platforms might come soon or never!_**

## Install

Install with [npm](npmjs.org):

```bash
npm i ape-trends
```

## Usage

```js
import getApeTrends from "ape-trends";

const makeBadDecisions = async () => {
  const apeTrends = await getApeTrends();
  console.log(
    "This many times someone mentioned buying DOGE",
    apeTrends["Dogecoin"].buy
  );
};
```

## Author

- [github/SmallScale](https://github.com/SmallScale)

## License

Copyright (c) 2021 SmallScale, contributors.
Released under the MIT license

---
