import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import pkg from './package.json';

export default [
  {
    input: 'src/main/index.ts',
    external: [...Object.keys(pkg.peerDependencies)],
    output: [{ file: 'dist/index.js', format: 'es' }],
    plugins: [image(), typescript(), url()],
  },
];
