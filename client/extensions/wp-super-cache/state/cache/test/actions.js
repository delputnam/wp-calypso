/**
 * External dependencies
 */
import { expect } from 'chai';
/**
 * Internal dependencies
 */
import useNock from 'test/helpers/use-nock';
import { useSandbox } from 'test/helpers/use-sinon';
import {
	WP_SUPER_CACHE_DELETE_CACHE,
	WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
	WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
} from '../../action-types';
import {
	deleteCache,
} from '../actions';

describe( 'actions', () => {
	let spy;

	useSandbox( ( sandbox ) => spy = sandbox.spy() );

	const siteId = 123456;
	const failedSiteId = 456789;

	describe( '#deleteCache()', () => {
		useNock( nock => {
			nock( 'https://public-api.wordpress.com' )
				.persist()
				.post( `/rest/v1.1/jetpack-blogs/${ siteId }/rest-api/` )
				.query( { path: '/wp-super-cache/v1/cache' } )
				.reply( 200, { wp_delete_cache: true } )
				.post( `/rest/v1.1/jetpack-blogs/${ failedSiteId }/rest-api/` )
				.query( { path: '/wp-super-cache/v1/cache' } )
				.reply( 403 );
		} );

		it( 'should dispatch test cache action when thunk triggered', () => {
			deleteCache( siteId )( spy );

			expect( spy ).to.have.been.calledWith( {
				type: WP_SUPER_CACHE_DELETE_CACHE,
				siteId,
			} );
		} );

		it( 'should dispatch request success action when request completes', () => {
			return deleteCache( siteId )( spy ).then( () => {
				expect( spy ).to.have.been.calledWith( {
					type: WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
					siteId,
				} );
			} );
		} );

		it( 'should dispatch fail action when request fails', () => {
			return deleteCache( failedSiteId )( spy ).then( () => {
				expect( spy ).to.have.been.calledWith( {
					type: WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
					siteId: failedSiteId,
				} );
			} );
		} );
	} );
} );
