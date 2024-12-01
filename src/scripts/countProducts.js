import { readFile } from '../utils/readFile.js';

const countProducts = async () => {
  const products = await readFile();

    console.log(products.length);
    
    
  return products.length;
};

countProducts();