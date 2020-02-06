import React from 'react'
import Container from "@material-ui/core/Container";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import SecurityIcon from "@material-ui/icons/Security";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {useTranslation} from 'react-i18next';

const Footer = () => {
	const {t} = useTranslation();

    return (
            <div className="footer-class">
                <Paper square  position="relative" style={{bottom:0,backgroundColor:'#021119'}}>
                    <Container  maxWidth="md">
                    <Grid className="footer-container" container  >
								<Grid item xs={6} sm>
									<div className="icon-container">
										<TwitterIcon className="icon-class" />
										<Typography className="link-item">{t('TWITTER')}</Typography>
									</div>
								</Grid>
								<Grid item xs={6} sm>
									<div className="icon-container">
										<LinkedInIcon className="icon-class" />
										<Typography className="link-item">{t('LINKEDIN')}</Typography>
									</div>
								</Grid>
								<Grid item xs={6} sm>
									<div  className="icon-container">
										<EmailIcon className="icon-class" />
										<Typography name="contactUs" className="link-item">
											{t('CONTACT_US')}
										</Typography>
									</div>
								</Grid>
								<Grid item xs={6} sm>
									<div  className="icon-container">
										<SpeakerNotes className="icon-class" />
										<Typography name="siteNotice" className="link-item">
											{t('SITE_NOTICE')}
										</Typography>
									</div>
								</Grid>
								<Grid item xs={6} sm>
									<div  className="icon-container">
										<SecurityIcon className="icon-class" />
										<Typography name="PrivacyPolicy" className="link-item">
											{t('PRIVACY_POLICY')}
										</Typography>
									</div>
								</Grid>
							</Grid>
                    </Container>
                </Paper>
            </div>
        )
};

export default Footer;
