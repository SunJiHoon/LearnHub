import { globSync } from 'glob';
import { fileURLToPath } from 'node:url';

export default {
	base: '/assets/javascripts/courses',
	build: {
		outDir: '../../LearnHub/src/main/resources/static/assets/javascripts/courses',
		rollupOptions: {
			input: Object.fromEntries(
				globSync('src/**/*.js').map(file => [
					file.slice(4, -3),
					fileURLToPath(new URL(file, import.meta.url))
				])
			),
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
};
