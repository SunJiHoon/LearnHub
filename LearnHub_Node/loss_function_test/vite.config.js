import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

export default {
	base: '/assets/courses',
	build: {
		outDir: '../../LearnHub/src/main/resources/static/assets/courses',
		rollupOptions: {
			input: globSync('**/*.html').map(file =>
				fileURLToPath(new URL(file, import.meta.url))
			),
		},
	},
};