/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import generateVariations from '../index';

describe( 'generateVariations', () => {
	it( 'returns an empty array when passed a product with no variation attributes', () => {
		const product = { id: 1 };
		const variations = generateVariations( product );
		expect( variations ).to.eql( [] );
	} );
	it( 'generates simple variations when passed a product with one product variation attribute', () => {
		const product = { id: 1, attributes: [
			{
				name: 'Color',
				options: [ 'Red', 'Blue' ],
				variation: true,
				uid: 'edit_0',
			}
		] };

		const variations = generateVariations( product );
		expect( variations[ 0 ] ).to.eql( {
			attributes: [
				{ option: 'Red' },
			]
		} );

		expect( variations[ 1 ] ).to.eql( {
			attributes: [
				{ option: 'Blue' },
			]
		} );
	} );
	it( 'generates a cartesian of variations when passed a product with multiple variation attributes', () => {
		const product = { id: 1, attributes: [
			{
				name: 'Color',
				options: [ 'Red', 'Blue' ],
				variation: true,
				uid: 'edit_0',
			},
			{
				name: 'Size',
				options: [ 'Small' ],
				variation: true,
				uid: 'edit_1',
			},
		] };

		const variations = generateVariations( product );

		expect( variations[ 0 ] ).to.eql( {
			attributes: [
				{
					name: 'Color',
					option: 'Red'
				},
				{
					name: 'Size',
					option: 'Small',
				}
			]
		} );

		expect( variations[ 1 ] ).to.eql( {
			attributes: [
				{
					name: 'Color',
					option: 'Blue'
				},
				{
					name: 'Size',
					option: 'Small',
				}
			]
		} );
	} );
	it( 'generates the correct number of variations when passed a product with multiple variation attributes', () => {
		const product = { id: 1, attributes: [
			{
				name: 'Color',
				options: [ 'Red', 'Blue' ],
				variation: true,
				uid: 'edit_0',
			},
			{
				name: 'Size',
				options: [ 'Small', 'Medium' ],
				variation: true,
				uid: 'edit_1',
			},
			{
				name: 'Cut',
				options: [ 'Unisex' ],
				variation: true,
				uid: 'edit_2',
			},
		] };

		const variations = generateVariations( product );

		expect( variations.length ).to.eql( 4 );
	} );
} );
