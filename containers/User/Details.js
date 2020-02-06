import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import actions from "../../actions";
import Button from "@material-ui/core/Button";
import { List } from "@material-ui/core";
import Star from "@material-ui/icons/Star";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ListItemComponent from "./ListItemComponent";
import TopNavigation from "../../components/TopNavigation";
import {useTranslation} from 'react-i18next';

const styles = {
	button: {
		marginLeft: '10px'
	},
	dummy: {
		height: 150,
		width: 150,
		backgroundColor: "#e5e5e5",
		marginRight: 20
	}
};

const Details = (props) => {
	const {t} = useTranslation();
	const { id, userId } = props.match.params;

	const [userData, setUserData] = useState({});

	useEffect(() => {
		actions.getUserDetails(`/${id}/users/${userId}`).then(res => {
			setUserData(res.data);
		}).catch(error => {});
	}, []);

	const getAdminRightValue = value => {
		if (value === false) {
			return t('NO');
		} else {
			return t('YES');
		}
	};

	const getAccountTypeToRender = () => {
		let htmlFor = '';
		switch (userData.accountType) {
			case 'PERSONAL_ACCOUNT':
				htmlFor = <div className="account-container so-user-personal">
					<PermIdentityIcon fontSize="small" />
					<p className="font-size-12">{t(userData.accountType+'_DETAIL')}</p>
				</div>;
				break;
			case 'GROUP_USER_STANDARD':
				htmlFor = <div className="account-container group-standard">
					<PeopleOutlineIcon fontSize="small" />
					<p className="font-size-12">{t(userData.accountType+'_DETAIL')}</p>
				</div>;
				break;
			case 'GROUP_USER_PREMIUM':
				htmlFor = <div className="account-container group-premium">
					<Star fontSize="small" />
					<p className="font-size-12">{t(userData.accountType+'_DETAIL')}</p>
				</div>;
				break;
			default:
				htmlFor = '';
		}
		return <div>
			<div style={{ display: "flex" }}>
				<p className="font-size-18">{userData.firstName +' '+ userData.name}</p>
				{htmlFor}
			</div>
			<div>
				<p className="font-size-15"> {userData.jobTitle} </p>
			</div>
		</div>;
	};

	return (
			<div className="comp-root-body-fix">
				<TopNavigation />
				<div className="root-container-color user-detail">
					<Container maxWidth="md">
						<div className="user-details-button">
							<Button variant="outlined" style={styles.button}>
								{t('EDIT')}
							</Button>
							<Button variant="outlined" style={styles.button}>
								{t('DISABLE')}
							</Button>
						</div>
						<Paper className="user-image-container" square>
							<div
								style={styles.dummy}
							>
                                <img alt="profile" style={{ height: 150, width: 150,}} src="https://cvbay.co.uk/wp-content/uploads/2017/03/dummy-image.jpg" />

                            </div>
							{getAccountTypeToRender()}
						</Paper>
						<div className="center-line-container">
							<p className="center-text-line">
								<span>{t('PERSONAL_INFORMATION')}</span>
							</p>
						</div>
						<Paper>
							<List className="user-list-detail">
								<ListItemComponent
									name={t('TELEPHONE')}
									value={userData.phone}
								/>
								<ListItemComponent
									valueClass="add-blue-color"
									name={t('EMAIL_ADDRESS')}
									value={userData.email}
								/>
								<ListItemComponent
									name={t('JOB_TITLE')}
									value={userData.jobTitle}
								/>
								<ListItemComponent
									name={t('JOB_FUNCTION')}
									value={userData.jobFunction}
								/>
								{userData.roles && userData.roles.length > 0 ? <ListItemComponent
									name={t('ROLE')}
									value={userData.roles && userData.roles.map(val => " " + val).toString()}
								/>: null
								}
								<ListItemComponent
									name={t('ADMINISTRATION_RIGHTS')}
									value={getAdminRightValue(userData.administrativeRights)}
								/>
								<ListItemComponent
									name={t('PLATFORM_MODULE_ALLOCATION')}
									value={
										userData.moduleLicences &&
										userData.moduleLicences
											.map(val => " " + t(val))
											.toString()
									}
								/>
							</List>
						</Paper>
					</Container>
				</div>
			</div>
		);
};

export default Details;