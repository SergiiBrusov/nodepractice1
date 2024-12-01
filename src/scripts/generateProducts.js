import fs from 'node:fs/promises';

import { createFakeProduct } from '../utils/createFakeProduct.js';
import { DB_PATH } from '../constants/products.js';
import { parse } from 'node:path';

const generateProduct = async (productNumber) => {
  const productsList = Array(productNumber)
    .fill(0)
    .map(() => {
      return createFakeProduct();
    });
  const data = await fs.readFile(DB_PATH, 'utf8');
  let newData = [];
  if (!data) {
    newData = productsList;
  } else {
    newData = [...JSON.parse(data), ...productsList];
  }

  await fs.writeFile(DB_PATH, JSON.stringify(newData, null, 2));
 
};
generateProduct(5);
