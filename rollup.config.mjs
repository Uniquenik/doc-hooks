import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync('package.json', {encoding: 'utf8'}));

export default [
  {
    input: 'src/main/index.ts',
    external: [...Object.keys(pkg.peerDependencies)],
    output: [{ file: 'dist/index.js', format: 'cjs' }],
    plugins: [typescript(), url()],
  },
];
