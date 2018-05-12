/*global wp*/

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import JetpackGalleryBlockEditor from './block-edit.jsx';
import JetpackGalleryBlockSave from './block-save.jsx';

const JetpackGalleryBlockType = 'jetpack/gallery';

const settings = {
	title: __( 'Jetpack Gallery' ),
	icon: 'format-gallery',
	category: 'layout',

	attributes: {
		columns: {
			type: 'integer',
			'default': 3,
		},
		linkTo: {
			type: 'string',
			'default': 'none',
		},
		images: {
			type: 'array',
			'default': [],
			source: 'query',
			selector: '.tiled-gallery-item',
			query: {
				width: {
					source: 'attribute',
					selector: 'img',
					attribute: 'data-original-width',
				},
				height: {
					source: 'attribute',
					selector: 'img',
					attribute: 'data-original-height',
				},
				url: {
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				},
				link: {
					source: 'attribute',
					selector: 'img',
					attribute: 'data-link',
				},
				alt: {
					source: 'attribute',
					selector: 'img',
					attribute: 'alt',
					'default': '',
				},
				id: {
					source: 'attribute',
					selector: 'img',
					attribute: 'data-id',
				},
				caption: {
					type: 'array',
					source: 'children',
					selector: 'figcaption',
				},
			},
		},
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: function( content ) {
					return wp.blocks.createBlock( JetpackGalleryBlockType, content );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: function( content ) {
					return wp.blocks.createBlock( 'core/gallery', content );
				},
			},
		],
	},

	edit: JetpackGalleryBlockEditor,
	save: JetpackGalleryBlockSave
};

wp.blocks.registerBlockType(
	JetpackGalleryBlockType,
	settings
);