<h1 id="top" align="center">"Checkout" and "scanning" function that calculates the total sum to be paid for the checked out products</h1>

## 💻 Run the app

1. Clone the repo
2. Run `yarn` or `npm i` to install the required dependencies
3. Run `yarn start` or `npm start` to execute the function and view the result in the console
4. Scan any amount of products to get the total cost of them

## 📌 Details

- Function that calculates the total sum of the products in the database (mock data in our case)
- Is present a 2-for-1 promotion for the `Voucher` product (buy 2, get 1 free)
- Is present a bulk offer for the `T-shirt` product (buy 3 or more, the price of that product is reduced by one)
- The function uses TypeScript to ensure a smooth workflow regarding the data that is being received and computed against

## 🧪 Testing

- The app contains unit testing with Jest library
- To run the test, run `yarn test` or `npm test`

## ✨ Built With

- Node
- Typescript
