import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {useTranslation} from 'react-i18next';

const Header = () => {
	const {t} = useTranslation();

	return (
			<Fragment>
				<AppBar className="header-root-class" position="static">
					<Container maxWidth="xl">
						<div className="top-header">
							<Toolbar disableGutters>
								<Typography>{t('GENERAL_SERVICES')}</Typography>
								<Typography className="header-scope-test" variant="h6" color="inherit">
									{t('SCOPE_ONE')}
								</Typography>
							</Toolbar>
						</div>
					</Container>
				</AppBar>
			</Fragment>
		);
};

export default Header;
