import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import pkg from './package.json';

// eslint-disable-next-line import/no-default-export
export default [
    {
        input: 'src/main/index.ts',
        external: [...Object.keys(pkg.peerDependencies)],
        output: [{ file: 'dist/index.js', format: 'es' }],
        plugins: [
            typescript(),
            url(),
        ],
    },
];