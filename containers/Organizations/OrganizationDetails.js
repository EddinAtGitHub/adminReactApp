import React, { Fragment, useEffect, useState } from "react";
import actions from "../../actions";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { TableHead } from "@material-ui/core";
import moment from "moment";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getStatusColorClass } from "../../utils";
import TopNavigationComponent  from "../../components/TopNavigation";
import {useTranslation} from 'react-i18next';

import EditDialog from "./Dialog";
import CreateUser from "../User/Dialog";

const OrganizationDetails = (props) => {
	const {t} = useTranslation();

	// Organization id
	const { id } = props.match.params;
	const [isNotCollapsed, setIsNotCollapsed] = useState(true);
	const [orgData, setOrgData] = useState({});
	const [orgUsers, setOrgUsers] = useState([]);
	const [orgSummary, setOrgSummary] = useState({});
	const [toggleCreateUser, setToggleCreateUser] = useState(false);
	const [toggleEditOrga, setToggleEditOrga] = useState(false);

	useEffect(() => {
		actions.getOrganizationDetails(`/${id}`)
			.then(res => {
				setOrgData(res.data);
			})
			.catch(error => {});
	}, [toggleEditOrga]);

	useEffect(() => {
		actions.getSingleOrganizationSummary(`/${id}`)
			.then(res => {
				setOrgSummary(res.data);
			})
			.catch(error => {});
	}, []);

	useEffect(() => {
		actions.getOrganizationUsers(`/${id}/users`)
			.then(res => {
				setOrgUsers(res.data);
			})
			.catch(error => {});
	}, []);

	const toggleExpand = () => {
		setIsNotCollapsed(prevState => (!prevState));
	};

	const goToOrganisations = () => {
		props.history.goBack();
	};

	const getOrganisationDataToRender = orgData => {
		let orgDetailsData = [];
		if (orgData.name) {
			orgDetailsData = [
				{ name: t('NAME'), val: orgData.name },
				{ name: t('TYPE'), val: orgData.type },
				{ name: t('TELEPHONE'), val: orgData.phone },
				{ name: t('EMAIL_ADDRESS'), val: orgData.email },
				{ name: t('WEBSITE'), val: orgData.website },
				{ name: t('COUNTRY'), val: orgData.address.country.name },
				{ name: t('ADDRESS'), val: orgData.address.addressLine },
				{ name: t('CITY'), val: orgData.address.city },
				{ name: t('POSTAL_CODE'), val: orgData.address.zip },
				{ name: t('ASSETS_UNDER_MANAGEMENT'), val: orgData.assetsUnderManagement.value ?
					`${orgData.assetsUnderManagement.value} ${orgData.assetsUnderManagement.currency}`: ""
				},
				{ name: t('AS_OF_DATE'), val:
						(orgData.assetsUnderManagement && orgData.assetsUnderManagement.asOfDate) ?
						moment( orgData.assetsUnderManagement.asOfDate).format("MM/YYYY") : ''
				},
				{ name: t('PLATFORM_MODULE_ALLOCATION'),
					val: orgData.moduleLicences.map(
						val => " " + t(val)
					).toString()
				},
				{ name: t('STATUS'), val: t(orgData.state)},
				{ name: t('PERSONAL_ADVISOR'), val: orgData.personalAdvisor.name },
				{ name: t('ACCOUNT_TYPE'), val: t(orgData.accountType)},
				{ name: t('SIGN_UP_OPTION'), val: (orgData.signUpType) ? t(orgData.signUpType) : t('NOT_REQUIRED')}
			];
		}
		return orgDetailsData;
	};

	const getOrgSummaryDataToRender = orgSummary => {
		const usersInfo = orgSummary.usersStatistics;
		const orgaInfo = orgSummary.organisationStatistics;
		let data = [];
		if (usersInfo || orgaInfo) {
			data = [
				{ name: t('TOTAL_USERS'), value: usersInfo.usersTotalCount || 0 },
				{ name: t('ACTIVE_USERS'), value: usersInfo.activeUsersCount || 0 },
				{ name: t('UNCONFIRMED_USERS'), value: usersInfo.unconfirmedUsersCount || 0 },
				{ name: t('DISABLED_USERS'), value: usersInfo.disabledUsersCount || 0 },
				{ name: t('REGISTRATION_DATE'),value: orgaInfo.registrationDate ? moment(orgaInfo.registrationDate).format("DD/MM/YYYY"): "-"},
				{ name: t('DISABLED_DATE'), value: orgaInfo.disabledDate ? moment(orgaInfo.disabledDate).format("DD/MM/YYYY") : "-" }
			];
		}
		return data;
	};

	const onClickEditOrga = () => {
		setToggleEditOrga(true);
	};

	const onCloseEditOrga = () => {
		setToggleEditOrga(false);
	};

	const onCloseCreateUser = () => {
		setToggleCreateUser(false);
	};

	const onClickCreateUser = () => {
		setToggleCreateUser(true);
	};

	const goToUserDetail = user => () => {
		if (props.match && props.match.params && props.match.params.id) {
			const { id } = props.match.params;
			props.history.push(`/organisations/${id}/users/${user.userId}`);
		}
	};

	const orgSummaryViewData = getOrgSummaryDataToRender(orgSummary);
	const orgDetailsData = getOrganisationDataToRender(orgData);

	return (
			<div className="comp-root-body-fix">
				<TopNavigationComponent />
				<div className="root-container-color org-detail">
					<Container maxWidth="xl">
						<div className="org-detail-btn-grp">
							<div>
								<Button onClick={goToOrganisations} variant="outlined">
									<ArrowBackIcon /> &nbsp;&nbsp;
									{t('ORGANIZATIONS')}
								</Button>
							</div>
							<div>
								<Button variant="contained" color="primary" onClick={onClickCreateUser}>
									{t('CREATE_USER')}
								</Button>
								<CreateUser open={toggleCreateUser} onClose={onCloseCreateUser} />
								<Button variant="outlined" style={{ marginLeft: 10 }} onClick={onClickEditOrga}>
									{t('EDIT')}
								</Button>
								<EditDialog
									open={toggleEditOrga}
									organization={orgData}
									onClose={onCloseEditOrga}
								/>
								<Button variant="outlined" style={{ marginLeft: 10 }}>
									{t('DISABLE')}
								</Button>
								<Button variant="outlined" style={{ marginLeft: 10 }}>
									{t('CHANGE_ADMIN')}
								</Button>
							</div>
						</div>
						<div>
							<div className="container-paper">
								<div className="org-detail-border-line">
									<Typography>{t('ORGANISATION_SUMMARY')}</Typography>
									{isNotCollapsed ? (
										<ExpandLessIcon
											onClick={toggleExpand}
											className="collapsable-icon cur-pnt"
										/>
									) : (
										<ExpandMoreIcon
											onClick={toggleExpand}
											className="collapsable-icon cur-pnt"
										/>
									)}
								</div>
								<div className="collapsable-view">
									<Collapse in={isNotCollapsed}>
										<Grid spacing={2} style={{ marginTop: 5 }} container>
											{orgSummaryViewData.map(item => (
												<Grid key={item.name} xs={6} sm={4} md={3} item>
													<div>
														<p className="summary-item-header">{item.name + ":"}</p>
														<div className="summary-item border ">{item.value}</div>
													</div>
												</Grid>
											))}
										</Grid>
									</Collapse>
								</div>
								<Grid container spacing={3}>
									<Grid item sm={4}>
										<div className="org-list">
											<List className="org-list-detail">
												{orgDetailsData.map((detail, i) => (
													<Fragment key={detail.name}>
														<ListItem className={i === 0 ? "list-paper" : ""}>
															<div className="org-detail-class-name">
																<Typography className="typo-name">{detail.name}</Typography>
															</div>
															<div className="org-detail-class-name ad-text-capital">
																<Typography
																	className={`type-val ${
																		detail.name === t('STATUS')
																			? getStatusColorClass(detail.val)
																			: ""
																	}`}
																	varient="caption"
																>
																	{detail.val && detail.val.toLowerCase()}
																</Typography>
															</div>
														</ListItem>
														<Divider component="li" />
													</Fragment>
												))}
											</List>
										</div>
									</Grid>
									<Grid item sm={8}>
										<div className="org-detail-table-container">
											<Table className="table-cell-right">
												<TableHead>
													<TableRow>
														<TableCell>{t('NAME')}</TableCell>
														<TableCell>{t('EMAIL_ADDRESS')}</TableCell>
														<TableCell>{t('TYPE')}</TableCell>
														<TableCell>{t('REGISTRATION_DATE')}</TableCell>
														<TableCell>{t('STATUS')}</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{orgUsers.map(user => (
														<TableRow
															onClick={goToUserDetail(user)}
															className="tabel-row-cursor"
															hover
															key={user.userId}
														>
															<TableCell className="name-color">{user.firstName + ' ' +user.name}</TableCell>
															<TableCell>{user.email}</TableCell>
															<TableCell>
																{user.administrativeRights ? 'Admin' : t(user.userType)}
															</TableCell>
															<TableCell>
																{moment(user.registrationDate).format("DD/MM/YYYY")}
															</TableCell>
															<TableCell
																className={`ad-text-capital status-unconfirm-close ${getStatusColorClass(
																	user.status
																)}`}
															>
																{t(user.status)}
																{user.status === "UNCONFIRMED" && (
																	<CloseIcon className="close-unconfirm" />
																)}
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</div>
									</Grid>
								</Grid>
							</div>
						</div>
					</Container>
				</div>
			</div>
		);
};

export default OrganizationDetails;
