/**
 * External Dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18n-calypso';

/**
 * Internal dependencies
 */
import SectionNav from 'components/section-nav';
import NavTabs from 'components/section-nav/tabs';
import NavItem from 'components/section-nav/item';
import FollowersCount from 'blocks/followers-count';
import SegmentedControl from 'components/segmented-control';
import { getSelectedSiteSlug } from 'state/ui/selectors';

const StatsNavigation = props => {
	const { translate, slug, type } = props;
	const types = {
		orders: translate( 'Orders' ),
		customers: translate( 'Customers' ),
		stock: translate( 'Stock' ),
		taxes: translate( 'Taxes' ),
		coupons: translate( 'Coupons' ),
		subscriptions: translate( 'Subscriptions' ),
	};
	return (
		<SectionNav selectedText={ types[ type ] }>
			<NavTabs label={ translate( 'Stats' ) }>
				<NavItem path={ `/store/stats/${ slug }` } selected={ type === 'orders' }>
					{ types.orders }
				</NavItem>
				<NavItem path={ `/store/stats/${ slug }` } selected={ type === 'customers' }>
					{ types.customers }
				</NavItem>
				<NavItem path={ `/store/stats/${ slug }` } selected={ type === 'stock' }>
					{ types.stock }
				</NavItem>
			</NavTabs>
			<SegmentedControl
				className="stats-navigation__control"
				initialSelected="store"
				options={ [
					{ value: 'site', label: translate( 'Site' ), path: `/stats/day/${ slug }` },
					{ value: 'store', label: translate( 'Store' ) },
				] }
			/>
			<FollowersCount />
		</SectionNav>
	);
};

StatsNavigation.propTypes = {
	slug: PropTypes.string
};

export default connect(
	state => {
		return {
			slug: getSelectedSiteSlug( state ),
			translate: i18n.translate,
		};
	}
)( StatsNavigation );
