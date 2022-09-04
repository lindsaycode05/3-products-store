const fs = require('fs');

const priceData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

interface IObjectKeys {
  [key: string]: any;
}

interface IProduct extends IObjectKeys {
  code: string;
  name: string;
  price: number;
  qty: number;
}

export class Checkout {
  product: IProduct;
  // Constructor executes whenever a class function is called however its inner functions are not executed
  constructor(product: IProduct) {
    this.product = product;
  }

  scan = (product: Partial<IProduct>) => {
    // Switch statement is passed a parameter that is compared to in each case inside it e.g. product
    switch (product.code) {
      case 'VOUCHER':
        this.product[0].qty++;
        break;
      case 'TSHIRT':
        this.product[1].qty++;
        break;
      case 'MUG':
        this.product[2].qty++;
        break;

      default:
        break;
    }
  };

  total = () => {
    let initialValue = 0;
    // Reduce function reduce the values of array to a single values, its used mostly for calculating total amount
    const total = this.product.reduce((total: number, product: IProduct) => {
      if (product.code === 'VOUCHER') {
        const multiplier = Math.floor(product.qty / 3);
        if (product.qty >= 2) {
          return total + product.price * (product.qty - 1 * multiplier);
        }
        return total + product.price * product.qty;
      } else if (product.code === 'TSHIRT') {
        if (product.qty >= 3) {
          return total + (product.price - 1) * product.qty;
        }
        return total + product.price * product.qty;
      } else {
        return total + product.price * product.qty;
      }

      // initialValue is the initial value of the value to be returned from the reduce function e.g. in this case total
    }, initialValue);
    return `${total}€`;
  };
}

let co = new Checkout(priceData);
co.scan({ code: 'VOUCHER' });
co.scan({ code: 'TSHIRT' });
co.scan({ code: 'MUG' });
const price = co.total();
console.log(price);
