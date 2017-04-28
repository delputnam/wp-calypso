/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	isDeletingCache,
	isCacheDeleteSuccessful,
	getCacheDeleteStatus,
} from '../selectors';

describe( 'selectors', () => {
	const primarySiteId = 123456;
	const secondarySiteId = 456789;

	describe( 'isDeletingCache()', () => {
		it( 'should return false if no state exists', () => {
			const state = {
				extensions: {
					wpSuperCache: undefined,
				}
			};
			const isDeleting = isDeletingCache( state, primarySiteId );

			expect( isDeleting ).to.be.false;
		} );

		it( 'should return false if the site is not attached', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: true, status: 'pending' }
							}
						}
					}
				}
			};
			const isDeleting = isDeletingCache( state, secondarySiteId );

			expect( isDeleting ).to.be.false;
		} );

		it( 'should return false if the cache is not being deleted', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: false, status: 'success' }
							}
						}
					}
				}
			};
			const isDeleting = isDeletingCache( state, primarySiteId );

			expect( isDeleting ).to.be.false;
		} );

		it( 'should return true if the cache is being deleted', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: true, status: 'pending' }
							}
						}
					}
				}
			};
			const isDeleting = isDeletingCache( state, primarySiteId );

			expect( isDeleting ).to.be.true;
		} );
	} );

	describe( 'isCacheDeleteSuccessful()', () => {
		it( 'should return false if the site is not attached', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: true, status: 'pending' }
							}
						}
					}
				}
			};
			const isSuccessful = isCacheDeleteSuccessful( state, secondarySiteId );

			expect( isSuccessful ).to.be.false;
		} );

		it( 'should return true if the delete request status is success', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: false, status: 'success' }
							}
						}
					}
				}
			};
			const isSuccessful = isCacheDeleteSuccessful( state, primarySiteId );

			expect( isSuccessful ).to.be.true;
		} );

		it( 'should return false if the delete request status is error', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: false, status: 'error' }
							}
						}
					}
				}
			};
			const isSuccessful = isCacheDeleteSuccessful( state, primarySiteId );

			expect( isSuccessful ).to.be.false;
		} );
	} );

	describe( 'getCacheDeleteStatus()', () => {
		it( 'should return undefined if the site is not attached', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: true, status: 'pending' }
							}
						}
					}
				}
			};
			const status = getCacheDeleteStatus( state, secondarySiteId );

			expect( status ).to.be.undefined;
		} );

		it( 'should return success if the delete request status is success', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: false, status: 'success' }
							}
						}
					}
				}
			};
			const status = getCacheDeleteStatus( state, primarySiteId );

			expect( status ).to.eql( 'success' );
		} );

		it( 'should return error if the delete request status is error', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: false, status: 'error' }
							}
						}
					}
				}
			};
			const status = getCacheDeleteStatus( state, primarySiteId );

			expect( status ).to.eql( 'error' );
		} );

		it( 'should return pending if the delete request status is pending', () => {
			const state = {
				extensions: {
					wpSuperCache: {
						cache: {
							deleteStatus: {
								[ primarySiteId ]: { deleting: true, status: 'pending' }
							}
						}
					}
				}
			};
			const status = getCacheDeleteStatus( state, primarySiteId );

			expect( status ).to.eql( 'pending' );
		} );
	} );
} );
