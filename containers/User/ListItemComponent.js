import React from "react";
import { ListItem,Grid,Divider } from "@material-ui/core";
export default function ListItemComponent(props) {
    const {name,value,valueClass=""} = props;
	return (
		<React.Fragment>
			<ListItem>
				<Grid style={{ paddingTop: 7, paddingBottom: 7 }} container>
					<Grid className={`user-list-item-name`} item md={4}>
						{name}
					</Grid>
					<Grid className={`${valueClass}`} item md={8}>
						{value}
					</Grid>
				</Grid>
			</ListItem>
			<Divider component="li" />
		</React.Fragment>
	);
}
