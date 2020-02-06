import React, { Fragment, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "./Form";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import actions from "../../actions";

export default (props) => {

	const {organization} = props;
	const [isFormValid, setIsFormValid] = useState(false);
	const [formValues, setFormValues] = useState({});

	const handleFormSubmit = () => {
		if (formValues.assetsUnderManagement && formValues.assetsUnderManagement.value === 0) {
			delete formValues.assetsUnderManagement;
		}
		if (formValues.scopeOrganisationType === 'INTERNAL') {
			//delete formValues.personalAdvisor;
			delete formValues.signUpType;
		}
		if ('personalAdvisor' in formValues && formValues.personalAdvisor !== undefined) {
			formValues.personalAdvisor = formValues.personalAdvisor.userId;
		}

		formValues.address = {
			...formValues.address,
			'country': {'code': formValues.address.country.code}
		};

		console.log(formValues);

		if (organization) {
			//formValues.personalAdvisor =  "cc004cb2-53a4-4350-8eb8-40bab59f2955";
			actions.putEditOrganisation(formValues, `/${organization.id}`).then(()=> {
				props.onClose()
			})
		} else {
			actions.postCreateOrganisation(formValues).then(() => {
				props.onClose()
			});
		}
	};

	const getFormValues = (values) => {
		setFormValues({...values});
	};

	const getCanBeSubmittedValue = (value) => {
		setIsFormValid(value);
	};

	return (
		<Fragment>
			<Dialog open={props.open} onClose={props.onClose} >
				<DialogTitle>{(typeof organization === 'undefined') ? 'Create': 'Edit' } organisation</DialogTitle>
				<DialogContent>
					<Form
						getFormValues={getFormValues}
						getCanBeSubmittedValue={getCanBeSubmittedValue}
						organization={( typeof organization !== 'undefined' || organization !== null ) ? organization : undefined}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onClose} variant="contained">
						Cancel
					</Button>
					<Button
						onClick={handleFormSubmit}
						disabled={!isFormValid}
						variant="contained"
						color="primary"
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};