/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import {
	WP_SUPER_CACHE_DELETE_CACHE,
	WP_SUPER_CACHE_DELETE_CACHE_FAILURE,
	WP_SUPER_CACHE_DELETE_CACHE_SUCCESS,
} from '../action-types';

/**
 * Returns the updated deleting state after an action has been dispatched.
 * Deleting state tracks whether the cache for a site is currently being deleted.
 *
 * @param  {Object} state Current deleting state
 * @param  {Object} action Action object
 * @return {Object} Updated deleting state
 */
const deleteStatus = createReducer( {}, {
	[ WP_SUPER_CACHE_DELETE_CACHE ]: ( state, { siteId } ) => ( {
		...state,
		[ siteId ]: {
			deleting: true,
			status: 'pending',
		}
	} ),
	[ WP_SUPER_CACHE_DELETE_CACHE_SUCCESS ]: ( state, { siteId } ) => ( {
		...state,
		[ siteId ]: {
			deleting: false,
			status: 'success',
		}
	} ),
	[ WP_SUPER_CACHE_DELETE_CACHE_FAILURE ]: ( state, { siteId } ) => ( {
		...state,
		[ siteId ]: {
			deleting: false,
			status: 'error',
		}
	} )
} );

export default combineReducers( {
	deleteStatus,
} );
