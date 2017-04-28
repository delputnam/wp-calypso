/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { useSandbox } from 'test/helpers/use-sinon';
import {
	WP_SUPER_CACHE_DELETE_CACHE,
	WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
	WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
} from '../../action-types';
import {
	SERIALIZE,
	DESERIALIZE,
} from 'state/action-types';
import reducer from '../reducer';

describe( 'reducer', () => {
	const primarySiteId = 123456;
	const secondarySiteId = 456789;

	useSandbox( ( sandbox ) => {
		sandbox.stub( console, 'warn' );
	} );

	describe( 'deleteStatus()', () => {
		const previousState = deepFreeze( {
			deleteStatus: {
				[ primarySiteId ]: {
					deleting: true,
					status: 'pending',
				}
			}
		} );

		it( 'should default to an empty object', () => {
			const state = reducer( undefined, {} );

			expect( state.deleteStatus ).to.eql( {} );
		} );

		it( 'should set request to true if request in progress', () => {
			const state = reducer( undefined, {
				type: WP_SUPER_CACHE_DELETE_CACHE,
				siteId: primarySiteId,
			} );

			expect( state.deleteStatus ).to.eql( {
				[ primarySiteId ]: {
					deleting: true,
					status: 'pending',
				}
			} );
		} );

		it( 'should accumulate requesting values', () => {
			const state = reducer( previousState, {
				type: WP_SUPER_CACHE_DELETE_CACHE,
				siteId: secondarySiteId,
			} );

			expect( state.deleteStatus ).to.eql( {
				[ primarySiteId ]: {
					deleting: true,
					status: 'pending',
				},
				[ secondarySiteId ]: {
					deleting: true,
					status: 'pending',
				}
			} );
		} );

		it( 'should set request to false if request finishes successfully', () => {
			const state = reducer( previousState, {
				type: WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
				siteId: primarySiteId,
			} );

			expect( state.deleteStatus ).to.eql( {
				[ primarySiteId ]: {
					deleting: false,
					status: 'success',
				}
			} );
		} );

		it( 'should set request to false if request finishes with failure', () => {
			const state = reducer( previousState, {
				type: WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
				siteId: primarySiteId,
			} );

			expect( state.deleteStatus ).to.eql( {
				[ primarySiteId ]: {
					deleting: false,
					status: 'error',
				}
			} );
		} );

		it( 'should not persist state', () => {
			const state = reducer( previousState, {
				type: SERIALIZE,
			} );

			expect( state.deleteStatus ).to.eql( {} );
		} );

		it( 'should not load persisted state', () => {
			const state = reducer( previousState, {
				type: DESERIALIZE,
			} );

			expect( state.deleteStatus ).to.eql( {} );
		} );
	} );
} );
