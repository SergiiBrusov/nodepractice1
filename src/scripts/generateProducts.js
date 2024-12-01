import fs from 'node:fs/promises';
import { createFakeProduct } from '../utils/createFakeProduct.js';
import { DB_PATH } from '../constants/products.js';
import { readFile } from '../utils/readFile.js';

const generateProduct = async (productNumber) => {
  const productsList = Array(productNumber)
    .fill(0)
    .map(() => {
      return createFakeProduct();
    });
  
  const data =  await readFile();

  // const newData = [...data, ...productsList];

  data.push(...productsList);

  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
 
};

generateProduct(5);
