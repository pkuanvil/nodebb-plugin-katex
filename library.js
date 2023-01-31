'use strict';

const nconf = require.main.require('nconf');
const relative_path = nconf.get('relative_path');

const katexMath = require('markdown-it-texmath');
const _ = require('lodash');

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

nbbKaTeX.sanitizeConfig = (config) => {
	// Search katex source code for 'SvgNode', 'PathNode', 'LineNode', 'makeSvgSpan'
	const svgTags = [
		'svg',
		'line',
		'path',
	];
	const svgAttrs = {
		line: ['x1', 'y1', 'x2', 'y2', 'stroke-width'],
		path: ['d'],
		svg: ['width', 'height', 'style', 'viewBox', 'viewbox', 'preserveAspectRatio', 'preserveaspectratio'],
	};
	const svgClasses = {
		svg: ['hide-tail', 'halfarrow-left', 'halfarrow-right', 'brace-left', 'brace-center', 'brace-right'],
	};

	config.allowedTags = _.union(config.allowedTags, svgTags);
	for (const tag of Object.keys(svgAttrs)) {
		config.allowedAttributes[tag] = _.union(config.allowedAttributes[tag], svgAttrs[tag]);
	}
	for (const tag of Object.keys(svgClasses)) {
		config.allowedClasses[tag] = _.union(config.allowedClasses[tag], svgClasses[tag]);
	}
	return config;
};

nbbKaTeX.getLinkTags = (hookData) => {
	const { links } = hookData;
	links.push({
		rel: 'prefetch stylesheet',
		href: `${relative_path}/assets/katex.min.css`,
	});
	return hookData;
};
