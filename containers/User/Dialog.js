import React, { Fragment, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "./Form";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export default (props) => {
	const [isFormValid, setIsFormValid] = useState(false);

	const handleFormSubmit = () => {

	};

	return (
		<Fragment>
			<Dialog open={props.open} onClose={props.onClose} >
				<DialogTitle>Create user</DialogTitle>
				<DialogContent>
					<Form  />
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