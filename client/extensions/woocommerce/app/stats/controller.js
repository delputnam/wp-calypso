/**
 * External dependencies
 */
import React from 'react';
import page from 'page';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import AsyncLoad from 'components/async-load';
import StatsPagePlaceholder from 'my-sites/stats/stats-page-placeholder';

function isValidParameters( context ) {
	const validParameters = {
		type: [ 'orders', 'customers', 'stock' ],
		period: [ 'year', 'last_month', 'month', '7day', 'custom' ],
		segment: [ 'sales_by_date', 'sales_by_product', 'sales_by_category', 'coupon_usage' ]
	};
	return Object.keys( validParameters )
		.every( param => includes( validParameters[ param ], context.params[ param ] ) );
}

export default function StatsController( context ) {
	if ( ! isValidParameters( context ) ) {
		page.redirect( '/store/stats' );
	}

	const props = {
		type: context.params.type,
		period: context.params.period,
		segment: context.params.segment,
		startDate: context.query.start_date,
		endDate: context.query.end_date,
	};
	renderWithReduxStore(
		<AsyncLoad
			placeholder={ <StatsPagePlaceholder /> }
			require="extensions/woocommerce/app/stats"
			{ ...props }
		/>,
		document.getElementById( 'primary' ),
		context.store
	);
}
