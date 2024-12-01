import fs from 'node:fs/promises';
import { DB_PATH } from '../constants/products.js';


export const readFile = async () => {

    const productsJSON = await  fs.readFile(DB_PATH, 'utf8');
    const products = productsJSON ? JSON.parse(productsJSON) : [];

    return products;
};

