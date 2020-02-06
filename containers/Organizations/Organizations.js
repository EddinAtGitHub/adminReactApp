import React from "react"
import { useEffect, useState } from 'react';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import EnhancedTableHead from "../../components/EnhancedTableHead";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import actions from "../../actions";
import { getSorting, stableSort, getStatusColorClass, showMaxString } from "../../utils";
import TopNavigation from "../../components/TopNavigation";
import CreateDialog from "./Dialog";
import {useTranslation} from 'react-i18next';

const Organizations = (props) => {
	const {t} = useTranslation();

	const order = "asc";
	const orderBy = "";
	const [isNotCollapsed, setIsNotCollapsed] = useState(true);
    const [externalOrganizations, setExternalOrganizations] = useState([]);
	const [internalOrganizations, setInternalOrganizations] = useState([]);
	const [tabValue, setTabValue] = useState(0);
	const [externalTotal, setExternalTotal] = useState(0);
	const [internalTotal, setInternalTotal] = useState(0);
	const [internalOrgSummary, setInternalOrgSummary] = useState({});
	const [externalOrgSummary, setExternalOrgSummary] = useState({});
	const [toggleCreateDialog, setToggleCreateDialog] = useState(false);

	let columns = [
		{ id: "name", label: t('NAME')},
		{ id: "type", label: t('TYPE')},
		{ id: "registrationDate", label: t('REGISTRATION_DATE')},
		{ id: "assetsUnderManagement", label: t('ASSETS_UNDER_MANAGEMENT')},
		{ id: "address", label: t('COUNTRY')},
		{ id: "state", label: t('STATUS')}
	];

	const toggleExpand = () => {
		setIsNotCollapsed(prevState => (!prevState));
	};

	const onChangeTab = (event, value) => {
		setTabValue(value);
	};

	const onRowClick = (type, row) => () => {
		props.history.push(`/organisations/${row.id}`)
	};

	const onClickCreateOrga = () => {
		setToggleCreateDialog(true);
	};

	const handleClose = () => {
		setToggleCreateDialog(false);
	};

	useEffect(() => {
		actions.getExtenalOrganizations().then(res => {
			setExternalOrganizations(res.data);
			setExternalTotal(res.total);
		}).catch(error => {});
	}, [toggleCreateDialog]);

	useEffect(() => {
		actions.getInternalOrganizations().then(res => {
			setInternalOrganizations(res.data);
			setInternalTotal(res.total);
		}).catch(error => {});
	}, [toggleCreateDialog]);

	useEffect(() => {
		actions.getOrganisationsSummaryExternal().then(res => {
			setExternalOrgSummary(res.data);
		}).catch(error => {});
	}, []);

	useEffect(() => {
		actions.getOrganisationsSummaryInternal().then(res => {
			setInternalOrgSummary(res.data);
		}).catch(error => {});
	}, []);

	const getInternalOrgsSummaryDataToRender = summary => {
		const usersInfo = summary.usersStatistics;
		const organisationsInfo = summary.organisationsStatistics;
		let data = [];
		if (usersInfo || organisationsInfo) {
			data = [
				{ name: t('ORGANISATIONS_REG'),value: organisationsInfo.accountsTotalCount},
				{ name: t('TOTAL_USERS'), value: usersInfo.usersTotalCount || 0 },
				{ name: t('ACTIVE_USERS'), value: usersInfo.activeUsersCount || 0 },
				{ name: t('DISABLED_USERS'), value: usersInfo.disabledUsersCount || 0 }
			];
		}
		return data;
	};

	const getExternalOrgsSummaryDataToRender = summary => {
		const usersInfo = summary.usersStatistics;
		const organisationsInfo = summary.organisationsStatistics;
		let data = [];
		if (usersInfo || organisationsInfo) {
			data = [
				{ name: t('ORGANISATIONS_REG'),value: organisationsInfo.accountsTotalCount},
				{ name: t('GROUP_USER_BUSINESS_ACCOUNT_STA'),value: organisationsInfo.standardAccountsCount},
				{ name: t('GROUP_USER_BUSINESS_ACCOUNT_PRE'),value: organisationsInfo.premiumAccountsCount},
				{ name: t('SINGLE_USER_BUSINESS_ACCOUNT'),value: organisationsInfo.personalAccountsCount},
				{ name: t('TOTAL_USERS'), value: usersInfo.usersTotalCount || 0 },
				{ name: t('ACTIVE_USERS'), value: usersInfo.activeUsersCount || 0 },
				{ name: t('DISABLED_USERS'), value: usersInfo.disabledUsersCount || 0 }
			];
		}
		return data;
	};

	const internalOrgSummaryViewData = getInternalOrgsSummaryDataToRender(internalOrgSummary);
	const externalOrgSummaryViewData = getExternalOrgsSummaryDataToRender(externalOrgSummary);

	return (
			<div className="comp-root-body-fix">
				<TopNavigation />
		
			<div className="root-container-color">
				<Container maxWidth="xl">
					<div className="navpillandtable">
					<Box style={{ textAlign: "right", marginBottom: 20 }}>
						<Button variant="contained" color="primary" onClick={onClickCreateOrga}>
							{t('CREATE_ORGANIZATION')}
						</Button>
						<CreateDialog open={toggleCreateDialog} onClose={handleClose} />
					</Box>
					<Paper square style={{ backgroundColor: "#fff" }}>
						<Tabs
							value={tabValue}
							indicatorColor="primary"
							onChange={onChangeTab}
						>
							<Tab label={t('EXTERNAL_ORGANIZATIONS') + ` (${externalTotal})`} />
							<Tab label={t('INTERNAL_ORGANIZATIONS') + ` (${internalTotal})`} />
						</Tabs>
						<div>
							<div className="border-line">
								{isNotCollapsed ? (
									<ExpandLessIcon onClick={toggleExpand} className="collapsable-icon" />
								) : (
									<ExpandMoreIcon onClick={toggleExpand} className="collapsable-icon" />
								)}
							</div>
							{tabValue === 0 && (
								<div>
									<div className="collapsable-view">
										<Collapse in={isNotCollapsed}>
											<Grid spacing={2} style={{ marginTop: 5 }} container>
												{externalOrgSummaryViewData.map(item => (
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
									<Table aria-labelledby="tableTitle" className="static-table">
										<EnhancedTableHead
											order="asc"
											rowCount={externalOrganizations.length}
											columns={[...columns, { id: "accountType", label: t('ORGANISATION_TYPE')}]}
										/>
										<TableBody>
											{stableSort(externalOrganizations, getSorting(order, orderBy)).map((record, i) => {
												return (
													<TableRow
														hover
														tabIndex={-1}
														key={i}
														className="tabel-row"
														onClick={onRowClick("external",record)}
													>
														<TableCell className="name-color" scope="row">
															{showMaxString(record.name)}
														</TableCell>
														<TableCell>{showMaxString(record.type)}</TableCell>
														<TableCell>
															{moment(record.registrationDate).format("DD/MM/YYYY")}
														</TableCell>
														<TableCell>
															{record.assetsUnderManagement.value
																? `${record.assetsUnderManagement.value} ${record.assetsUnderManagement.currency}`
																: "-"}
														</TableCell>
														<TableCell>
															{record.address && record.address.country && record.address.country.name}
														</TableCell>
														<TableCell  className={`ad-text-capital ${getStatusColorClass(record.state)}`}>
															{t(record.state)}
														</TableCell>
														<TableCell className="ad-text-capital">
															{showMaxString(t(record.accountType))}
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</div>
							)}
							{tabValue === 1 && (
								<div>
									<div className="collapsable-view">
										<Collapse in={isNotCollapsed}>
											<Grid spacing={2} style={{ marginTop: 5 }} container>
												{internalOrgSummaryViewData.map(item => (
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
									<Table aria-labelledby="tableTitle"  className="static-table">
										<EnhancedTableHead
											order={order}
											orderBy={orderBy}
											rowCount={internalOrganizations.length}
											columns={columns}
										/>
										<TableBody>
											{stableSort(internalOrganizations, getSorting(order, orderBy)).map((record, i) => {
												return (
													<TableRow
														hover
														tabIndex={-1}
														key={i}
														className="tabel-row"
														onClick={onRowClick("internal",record)}
													>
														<TableCell className="name-color" scope="row">
															{showMaxString(record.name)}
														</TableCell>
														<TableCell>
															{showMaxString(record.type)}
														</TableCell>
														<TableCell>
															{moment(record.registrationDate).format("DD/MM/YYYY")}
														</TableCell>
														<TableCell>
															{record.assetsUnderManagement.value
																? `${record.assetsUnderManagement.value} ${record.assetsUnderManagement.currency}`
																: "-"}
														</TableCell>
														<TableCell>
															{record.address && record.address.country && record.address.country.name}
														</TableCell>
														<TableCell  className={`ad-text-capital ${getStatusColorClass(record.state)}`}>
															{t(record.state)}
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</div>
							)}
						</div>
					</Paper>
				  </div>
			  </Container>
			</div>
		 </div>
		);
};

export default Organizations;