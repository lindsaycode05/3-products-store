const fs = require('fs');
const STORE_DATA = JSON.parse(fs.readFileSync('./data.json').toString());

interface IProduct {
  code: string;
  name: string;
  price: number;
  qty: number;
}

export const generateAmount = (voucher: IProduct, tshirt: IProduct, mug: IProduct) => {
  // storing these function's args in array for executing the computation & calculating final amount
  const totalItems = [voucher, tshirt, mug];

  totalItems.forEach((item) => {
    // applying condition if qty > 2 then decrease the price by 1 for the t-shirt (bulk offer)
    if (item.qty >= 3 && item.code === 'TSHIRT') {
      item.price = item.price - 1;
    }
  });

  // calculating the amount
  let amount = 0;

  totalItems.forEach((item) => {
    let qty = item.qty;
    let price = item.price;
    let name = item.code;

    //  applying condition for 2-for-1 promotion for the Voucher
    if (name === 'VOUCHER' && qty === 3) {
      amount += (qty - 1) * price;
    } else {
      amount += qty * price;
    }
  });

  return amount;
};

const voucher = STORE_DATA[0];
const tshirt = STORE_DATA[1];
const mug = STORE_DATA[2];

console.log(generateAmount(voucher, tshirt, mug)); // should return 32.5 based on the json data at the moment

// other computation examples to try (please paste this data in the data.json file):

/*
[
    {
      "code": "VOUCHER",
      "name": "Voucher",
      "price": 5,
      "qty": 3
    },
    {
      "code": "TSHIRT",
      "name": "T-Shirt",
      "price": 20,
      "qty": 2
    },
    {
      "code": "MUG",
      "name": "Coffe mug",
      "price": 7.5,
      "qty": 1
    }
  ]
* RETURNS 57.5 (example with the 2-1 promotion offer)

[
    {
      "code": "VOUCHER",
      "name": "Voucher",
      "price": 5,
      "qty": 1
    },
    {
      "code": "TSHIRT",
      "name": "T-Shirt",
      "price": 20,
      "qty": 4
    },
    {
      "code": "MUG",
      "name": "Coffe mug",
      "price": 7.5,
      "qty": 0
    }
  ]
* RETURNS 81 (example with the bulk offer)

[
    {
      "code": "VOUCHER",
      "name": "Voucher",
      "price": 5,
      "qty": 3
    },
    {
      "code": "TSHIRT",
      "name": "T-Shirt",
      "price": 20,
      "qty": 3
    },
    {
      "code": "MUG",
      "name": "Coffe mug",
      "price": 7.5,
      "qty": 1
    }
  ]
* RETURNS 74.5 (example with the 2-1 promotion offer AND bulk offer)
*/
