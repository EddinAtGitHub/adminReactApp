import React, {Fragment, useEffect, useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { KeyboardDatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useTranslation} from 'react-i18next';

import actions from "../../actions";
import moment from "moment";

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-between",
		marginLeft: '0px'
	}
});

const Form = (props) => {
	const {t} = useTranslation();
	const {getCanBeSubmittedValue, getFormValues} = props;
	const moduleLicences = useRef([]);
	const [countries, setCountries] = useState([]);
	const [organisationTypes, setOrganisationTypes] = useState([]);
	const [personalAdvisors, setPersonalAdvisors] = useState([]);
	const [licences, setLicences] = useState([]);

	const classes = useStyles();

	const currencies = [
		{
		   code: 'EUR',
		   name: t('EURO')
	    },
		{
			code: 'GBP',
			name: t('GBP')
		},
		{
			code: 'USD',
			name: t('USD')
		},
		{
			code: 'CHF',
			name: t('CHF')
		}
	];

	const getInitState = () => {
		const {organization} = props;
		return {
			name: (organization) ? organization.name: '',
			scopeOrganisationType: (organization) ? organization.scopeOrganisationType: '',
			accountType: (organization) ? organization.accountType : 'NONE',
			signUpType: (organization) ? organization.signUpType || '' : '',
			personalAdvisor: (organization) ? organization.personalAdvisor.userId : {},
			type: (organization) ? organization.type : '',
			phone: (organization) ? organization.phone : '',
			email: (organization) ? organization.email : '',
			maxNumberOfUsers: (organization && organization.maxNumberOfUsers) ? organization.maxNumberOfUsers : 0,
			website: (organization) ? organization.website : '',
			assetsUnderManagement:
				(organization && organization.assetsUnderManagement && Object.keys(organization.assetsUnderManagement).length > 0) ? {
				currency: organization.assetsUnderManagement.currency,
				asOfDate: moment(new Date(organization.assetsUnderManagement.asOfDate), moment.ISO_8601),
				value: organization.assetsUnderManagement.value
			} : {
				currency: '',
				asOfDate: moment(new Date(), moment.ISO_8601),
				value: 0
			},
			address: (organization) ? organization.address : {
				addressLine: '',
				country: {},
				city: '',
				zip: ''
			},
			moduleLicences: (organization) ? organization.moduleLicences : []
		};
	};

	const [values, setValues] = useState(getInitState());

	const canBeSubmitted = (values) => {
		const isValidOrganisationType = () => {
			return values.scopeOrganisationType === 'EXTERNAL'
				? values.signUpType.length > 0 &&
				Object.keys(values.personalAdvisor).length > 0 &&
				values.accountType.length > 0 && values.accountType !== 'NONE'
				: values.signUpType === '';
		};
		const areFieldsValuesValid = () => (values.name.length > 0 &&
			values.scopeOrganisationType.length > 0 &&
			Object.keys(values.address.country).length > 0 &&
			values.address.city.length > 0 &&
			values.moduleLicences.length > 0 &&
			values.type.length > 0);
		return  areFieldsValuesValid() && isValidOrganisationType();
	};

	const handleDateChange = (asOfDate) => {
		setValues({...values,
			'assetsUnderManagement': {
			...values.assetsUnderManagement, 'asOfDate': moment(asOfDate, moment.ISO_8601)
		}});
	};

	const shouldLicenceBeDisabled = (licence) => {
		const licenceItem = licences.find(item => item.licence === licence);
		const scopeOrganisationTypes = licenceItem ? licenceItem.scopeOrganisationTypes : [];
		const orgaType = props.organization ? props.organization.scopeOrganisationType : values.scopeOrganisationType;
		return (orgaType.length > 0) ? !scopeOrganisationTypes.includes(orgaType) : false;
	};

	const handleModuleLicenceChange = e => {
		const {value} = e.target;
		moduleLicences.current = moduleLicences.current.includes(value)
			? moduleLicences.current.filter(c => c !== value)
			: [...moduleLicences.current, value];
		setValues({...values, 'moduleLicences': moduleLicences.current});
	};

	const handleOnChange = e => {
		const {name, value} = e.target;
		setValues({...values, [name]: value});
	};

	useEffect(() => {
		getCanBeSubmittedValue(canBeSubmitted(values));
		getFormValues(values);
	}, [values]);

	useEffect(() => {
		actions.getCountries()
			.then(res => {
				setCountries(res.data);
			}).catch(error => {});

		actions.getOrganisationTypes()
			.then(res => {
				setOrganisationTypes(res.data);
			}).catch(error => {});

		actions.getPersonalAdvisors()
			.then(res => {
				setPersonalAdvisors(res.data);
				if (props.organization) {
					setValues({...values, 'personalAdvisor': res.data.find(v => v.userId === props.organization.personalAdvisor.userId)});
				}
		}).catch(error => {});

		actions.getLicences()
			.then(res => {
				setLicences(res.data);
			}).catch(error => {});
	}, []);

	const getAccountOptionsToRender = () => {
		return <Fragment>
			<Grid item xs={12} sm={6}>
				<TextField
					select
					fullWidth
					required
					label= {t('SELECT_SIGN_UP_OPTION')}
					margin="dense"
					name="signUpType"
					disabled={(!!props.organization)}
					onChange={handleOnChange}
					value={values.signUpType}
				>
					{[{key: 'DIGITAL', name: t('DIGITAL')}, {key: 'PAPER_FORM', name: t('PAPER')}].map(option => (
						<MenuItem key={option.key} value={option.key}>
							{option.name}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12}>
				<FormControl fullWidth component="fieldset">
					<FormLabel required component="legend">{t('ACCOUNT_OPTIONS')}</FormLabel>
					<RadioGroup name="accountType" value={values.accountType} onChange={handleOnChange}>
						<FormControlLabel
							value="PERSONAL_ACCOUNT"
							control={<Radio color="primary" />}
							label={t('SINGLE_USER_BUSINESS_ACCOUNT')}
							classes={classes}
							labelPlacement="start"
						/>
						{values.accountType === 'PERSONAL_ACCOUNT' ?
							<TextField
								label={t('ADDITIONAL_USER_ACCOUNTS')}
								margin="dense"
								name="maxNumberOfUsers"
								onChange={(e) => {
									const {value} = e.target;
									if (value.length > 0) {
										setValues({...values,
											'maxNumberOfUsers': parseInt(value)
										});
									}
								}}
								value={values.maxNumberOfUsers}
							/>
							: null
						}
						<FormControlLabel
							value="GROUP_USER_STANDARD"
							control={<Radio color="primary" />}
							label={t('GROUP_USER_BUSINESS_ACCOUNT_STA')}
							classes={classes}
							labelPlacement="start"
						/>
						<FormControlLabel
							value="GROUP_USER_PREMIUM"
							control={<Radio color="primary" />}
							label={t('GROUP_USER_BUSINESS_ACCOUNT_PRE')}
							classes={classes}
							labelPlacement="start"
						/>
					</RadioGroup>
				</FormControl>
			</Grid>
		</Fragment>
	};

	return (
		<form>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						required
						autoFocus
						margin="dense"
						label={t('NAME')}
					    name="name"
						value={values.name}
						onChange={handleOnChange}
						fullWidth
					/>
					<FormControl
						required
						fullWidth
					>
						<InputLabel>{t('SCOPE_ORGANISATION_TYPE')}</InputLabel>
						<Select
							value={values.scopeOrganisationType}
							disabled={(!!props.organization)}
							name="scopeOrganisationType"
							onChange={(e) => {
								const {name, value} = e.target;
								setValues({...values,
									[name]: value,
									'signUpType': value === 'INTERNAL' ? '' : values.signUpType,
									'accountType': value === 'INTERNAL' ? 'NONE' : values.accountType,
									'personalAdvisor': value === 'INTERNAL' ? '' : values.personalAdvisor
								});
							}}
						>
							<MenuItem value="EXTERNAL">{t('EXTERNAL')}</MenuItem>
							<MenuItem value="INTERNAL">{t('INTERNAL')}</MenuItem>
						</Select>
					</FormControl>

					<Autocomplete
						options={organisationTypes}
						getOptionLabel={option => option.name}
						value={{name: values.type}}
						onChange={(event, newValue) => {
							setValues({...values, 'type': newValue ? newValue.name : ''});
						}}
						renderInput={params =>
							<TextField
								required
								name="type"
								{...params}
								label={t('TYPE')}
								margin="normal"
								fullWidth
							/>}
					/>

					{values.scopeOrganisationType === 'EXTERNAL' ?
						<Autocomplete
							options={personalAdvisors}
							getOptionLabel={option => Object.keys(option).length > 0 ? option.firstName + ' ' + option.name : ''}
							value= {values.personalAdvisor}
							onChange={(event, newValue) => {
								setValues({...values, 'personalAdvisor': newValue ? newValue : ''});
							}}
							renderInput={params =>
								<TextField
									required
									name="type"
									{...params}
									label={t('PERSONAL_ADVISOR')}
									margin="normal"
									fullWidth
								/>}
						/>
						: null
					}
				</Grid>
				<Grid style={{ marginTop: "15px" }} item xs={12}>
					<TextField
						margin="dense"
						label={t('TELEPHONE')}
						name ="phone"
						value={values.phone}
						onChange={handleOnChange}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="email"
						onChange={handleOnChange}
						type="email"
						value={values.email}
						label={t('EMAIL')}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="website"
						value={values.website}
						onChange={handleOnChange}
						label={t('WEBSITE')}
						fullWidth
					/>
					<Autocomplete
						options={countries}
						getOptionLabel={option =>  {
							return 	Object.keys(option).length > 0
								? option.name : ''
						}}
						value={{...values.address.country}}
						onChange={(event, newValue) => {
							setValues({...values,
								'address': {...values.address,
									'country': newValue ? newValue : {}
							}});
						}}
						renderInput={params =>
							<TextField
								required
								name="country"
								{...params}
								label={t('SELECT_COUNTRY')}
								margin="normal"
								fullWidth
							/>}
					/>
					<TextField
						margin="dense"
						name="addressLine"
						value={values.address.addressLine}
						label={t('ADDRESS')}
						onChange={(e) => {
							const {value} = e.target;
							setValues({...values,
								'address': {...values.address, 'addressLine': value}
							});
						}}
						fullWidth
					/>
					<TextField
						margin="dense"
						label={t('CITY')}
						name="city"
						value={values.address.city}
						onChange={(e) => {
							const {value} = e.target;
							setValues({...values,
								'address': {...values.address, 'city': value}
							});
						}}
						required
						fullWidth
					/>
					<TextField
						margin="dense"
						name ="zip"
						value={values.address.zip}
						label={t('POSTAL_CODE')}
						onChange={(e) => {
							const {value} = e.target;
							setValues({...values,
								'address': {...values.address, 'zip': value}
							});
						}}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						margin="dense"
						label={t('ASSETS_UNDER_MANAGEMENT')}
						value={values.assetsUnderManagement.value}
						onChange={(e) => {
							const {value} = e.target;
							if (!value || 0 === value.length) {
								setValues({...values,
									'assetsUnderManagement': {
										currency: '',
										asOfDate: moment(new Date()).format(),
										value: 0
									}
								});

							} else {
								setValues({...values,
									'assetsUnderManagement': {...values.assetsUnderManagement, 'value': parseInt(value)}
								});
							}
						}}
						name= "aumValue"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						select
						fullWidth
						disabled={!values.assetsUnderManagement.value}
						label={t('SELECT')}
						margin="dense"
						name="currency"
						helperText={t('SELECT_CURRENCY')}
						onChange={(e) => {
							const {value} = e.target;
							setValues({...values,
								'assetsUnderManagement': {...values.assetsUnderManagement, 'currency': value}
							});
						}}
						value={values.assetsUnderManagement.currency}
					>
						{currencies.map(option => (
							<MenuItem key={option.code} value={option.code}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} sm={6}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							variant="inline"
							disabled={!values.assetsUnderManagement.value}
							format="MM/dd/yyyy"
							name ="asOfDate"
							margin="normal"
							label={t('AS_OF_DATE')}
							value={values.assetsUnderManagement.asOfDate}
							onChange={date => handleDateChange(date)}
						/>
					</MuiPickersUtilsProvider>
				</Grid>
				<Grid item xs={12}>
					<FormControl required component="fieldset">
						<FormLabel component="legend">Platform module allocation</FormLabel>
						<FormGroup>
							<FormControlLabel
								value="ANALYTICALOPERATIONS_MODULE"
								disabled={shouldLicenceBeDisabled('ANALYTICALOPERATIONS_MODULE')}
								control={<Checkbox checked={values.moduleLicences.includes('ANALYTICALOPERATIONS_MODULE')} onChange={handleModuleLicenceChange} color="primary" />}
								label={t('ANALYTICALOPERATIONS_MODULE')}
							/>
							<FormControlLabel
								value="INVESTORHUB_MODULE"
								control={<Checkbox checked={values.moduleLicences.includes('INVESTORHUB_MODULE')} onChange={handleModuleLicenceChange} color="primary" />}
								label={t('INVESTORHUB_MODULE')}
							/>
							<FormControlLabel
								value="RISKANALYSIS_MODULE"
								control={<Checkbox checked={values.moduleLicences.includes('RISKANALYSIS_MODULE')} onChange={handleModuleLicenceChange}  color="primary" />}
								label={t('RISKANALYSIS_MODULE')}
							/>
						</FormGroup>
					</FormControl>
				</Grid>
				{values.scopeOrganisationType === 'EXTERNAL' ?
					getAccountOptionsToRender()
					: null
				}
			</Grid>
		</form>
	);
};

export default Form;
