import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import People from "@material-ui/icons/People";
import History from "@material-ui/icons/History";
import ListAlt from "@material-ui/icons/ListAlt";
import VpnKey from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import {useTranslation} from 'react-i18next';

const TopNavigation = () => {
	const {t} = useTranslation();

	return (
			<Paper square className="header-paper" elevation={2}>
				<Container maxWidth="md">
					<div className="bottom-header">
						<Grid container spacing={1}>
							<Grid item xs>
								<Link to="/organisations" className="home-tabs">
									<div className="home-tab-icon">
										<People color="primary" />
									</div>
									<Typography color="primary">{t('ORGANIZATIONS')}</Typography>
								</Link>
							</Grid>
							<Grid item xs>
								<div className="home-tabs">
									<div className="home-tab-icon">
										<History color="inherit" />
									</div>
									<Typography>{t('REQUEST_HISTORY')}</Typography>
								</div>
							</Grid>
							<Grid item xs>
								<div className="home-tabs">
									<div className="home-tab-icon">
										<ListAlt color="inherit" />
									</div>
									<Typography>{t('LEADER_BOARD')}</Typography>
								</div>
							</Grid>
							<Grid item xs>
								<div className="home-tabs">
									<div className="home-tab-icon">
										<VpnKey color="inherit" />
									</div>
									<Typography>{t('MASTER_ACCOUNT')}</Typography>
								</div>
							</Grid>
						</Grid>
					</div>
				</Container>
			</Paper>
		);
};

export default TopNavigation;
