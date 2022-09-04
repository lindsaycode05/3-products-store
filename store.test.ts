import { IProduct } from './index';
import { Checkout } from '.';

const fs = require('fs');
const priceData = JSON.parse(fs.readFileSync('./data.json').toString());

describe("returns the final amount based on the products' prices, quantities and 2-1 & bulk offers", () => {
  afterEach(() => {
    priceData.forEach((product: IProduct) => {
      product.qty = 0;
    });
  });

  test('1 voucher, 1 t-shirt, 1 mug', () => {
    const checkout = new Checkout(priceData);
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'MUG' });
    expect(checkout.total()).toBe('32.5€');
  });

  test('1 voucher, 2 t-shirts, 1 mug', () => {
    const checkout = new Checkout(priceData);
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'MUG' });
    expect(checkout.total()).toBe('52.5€');
  });

  test('1 voucher, 10 t-shirts (bulk offer)', () => {
    const checkout = new Checkout(priceData);
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    expect(checkout.total()).toBe('195€');
  });

  test('9 vouchers, 2 t-shirts (2-for-1 offer)', () => {
    const checkout = new Checkout(priceData);
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    expect(checkout.total()).toBe('70€');
  });

  test('12 vouchers, 20 t-shirts, 4 mugs (bulk offer and 2-for-1 offer)', () => {
    const checkout = new Checkout(priceData);
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });
    checkout.scan({ code: 'VOUCHER' });

    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });
    checkout.scan({ code: 'TSHIRT' });

    checkout.scan({ code: 'MUG' });
    checkout.scan({ code: 'MUG' });
    checkout.scan({ code: 'MUG' });
    checkout.scan({ code: 'MUG' });
    expect(checkout.total()).toBe('450€');
  });
});

export {};
