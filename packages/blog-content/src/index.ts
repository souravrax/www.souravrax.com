export * from './schema.js';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CONTENT_PATH = pathToFileURL(resolve(__dirname, '../content')).href;
export const ASSETS_PATH = pathToFileURL(resolve(__dirname, '../assets')).href;
