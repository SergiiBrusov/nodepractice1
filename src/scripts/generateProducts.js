import fs from 'node:fs/promises';

import { createFakeProduct } from '../utils/createFakeProduct.js';
import { DB_PATH } from '../constants/products.js';

const generateProduct = async (productNumber) => {
  const productsList = Array(productNumber)
    .fill(0)
    .map(() => {
      return createFakeProduct();
    });
  await fs.writeFile(DB_PATH, JSON.stringify(productsList, null, 2));
  console.log(productsList);
};
generateProduct(5);
