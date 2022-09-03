import { generateAmount } from '.';

const fs = require('fs');
const STORE_DATA = JSON.parse(fs.readFileSync('./data.json').toString());

test("returns the final amount based on the products' prices, quantities and 2-1 & bulk offers", () => {
  const voucher = STORE_DATA[0];
  const tshirt = STORE_DATA[1];
  const mug = STORE_DATA[2];

  expect(generateAmount(voucher, tshirt, mug)).toBe(32.5);
});

export {};
