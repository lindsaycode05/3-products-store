import { Checkout } from '.';

const fs = require('fs');
const priceData = JSON.parse(fs.readFileSync('./data.json').toString());

test("returns the final amount based on the products' prices, quantities and 2-1 & bulk offers", () => {
  const checkout = new Checkout(priceData);
  checkout.scan({ code: 'VOUCHER' });
  checkout.scan({ code: 'TSHIRT' });
  checkout.scan({ code: 'MUG' });
  expect(checkout.total()).toBe('32.5€');
});

export {};
