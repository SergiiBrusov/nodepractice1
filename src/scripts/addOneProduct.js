import fs from 'node:fs/promises';
import { createFakeProduct } from '../utils/createFakeProduct.js';
import { DB_PATH } from '../constants/products.js';
import { readFile } from '../utils/readFile.js';


const addOneProduct = async () => {
  const productsList = await readFile();
  const newProduct = createFakeProduct();

  productsList.push(newProduct);

  await fs.writeFile(DB_PATH, JSON.stringify(productsList, null, 2));
};

addOneProduct();
