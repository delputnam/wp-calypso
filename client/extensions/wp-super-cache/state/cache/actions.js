/**
 * Internal dependencies
 */
import wp from 'lib/wp';
import {
	WP_SUPER_CACHE_DELETE_CACHE,
	WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
	WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
} from '../action-types';

/*
 * Deletes the cache for a site.
 *
 * @param  {Number} siteId Site ID
 * @returns {Function} Action thunk that deletes the cache for a given site
 */
export const deleteCache = ( siteId, type ) => {
	return ( dispatch ) => {
		dispatch( {
			type: WP_SUPER_CACHE_DELETE_CACHE,
			siteId,
		} );

		return wp.req.post(
			{ path: `/jetpack-blogs/${ siteId }/rest-api/` },
			{ path: '/wp-super-cache/v1/cache', body: JSON.stringify( type ), json: true } )
			.then( () => {
				dispatch( {
					type: WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
					siteId,
				} );
			} )
			.catch( () => {
				dispatch( {
					type: WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
					siteId,
				} );
			} );
	};
};
