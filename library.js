'use strict';

const katexMath = require('markdown-it-texmath');

const nbbKaTeX = module.exports;

nbbKaTeX.updateParserRules = (parser) => {
	parser.use(katexMath, {
		delimiters: ['dollars', 'brackets'],
	});
};

nbbKaTeX.getLinkTags = ({ links }) => {
	links.push({
		rel: 'prefetch stylesheet',
		href: 'https://fastly.jsdelivr.net/npm/katex@0.15.6/dist/katex.min.css',
	});
};
