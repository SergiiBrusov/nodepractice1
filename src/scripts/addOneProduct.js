import fs from 'node:fs/promises';
import { createFakeProduct } from '../utils/createFakeProduct.js';
import { DB_PATH } from '../constants/products.js';

const addOneProduct = async () => {
  const productsListJSON = await fs.readFile(DB_PATH, 'utf8');
  const productsList = JSON.parse(productsListJSON);
  const newProduct = createFakeProduct();

  productsList.push(newProduct);

  await fs.writeFile(DB_PATH, JSON.stringify(productsList, null, 2));
};

addOneProduct();
