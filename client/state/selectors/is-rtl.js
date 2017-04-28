/**
 * Internal dependencies
 */
import { getCurrentUser } from 'state/current-user/selectors';

/**
 * Returns the isRtl value for the current user.
 *
 * @param  {Object}   state      Global state tree
 * @return {?Boolean}            Current user is rtl
 */
export default function isRtl( state ) {
	const currentUser = getCurrentUser( state );
	if ( currentUser && 'isRTL' in currentUser ) {
		return currentUser.isRTL;
	}
	return null;
}
