import { readFile } from '../utils/readFile.js';

const getAllProducts = async () => {
  const productsList = await readFile();
  console.log(productsList);

  return productsList;
};

getAllProducts();