'use strict';

const katexMath = require('markdown-it-texmath');

const nbbKaTeX = module.exports;

nbbKaTeX.updateParserRules = (parser) => {
	const katexOptions = {
		strict: true,
	};
	parser.use(katexMath, {
		katexOptions,
		delimiters: ['dollars', 'brackets'],
	});
};

nbbKaTeX.getLinkTags = (hookData) => {
	const { links } = hookData;
	links.push({
		rel: 'prefetch stylesheet',
		href: 'https://fastly.jsdelivr.net/npm/katex@0.15.6/dist/katex.min.css',
	});
	return hookData;
};
