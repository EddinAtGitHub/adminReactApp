import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const EnhancedTableHead = (props) => {

	const createSortHandler = property => event => {
		console.log(property);
	};

	return (
			<TableHead className="table-head">
				<TableRow>
					{props.columns.map(row =>  (
						<TableCell
							key={row.id}
							padding="default"
							sortDirection={props.orderBy === row.id ? props.order : false}
						>
							{row.id === "assetsUnderManagement" ? (
								row.label
							) : (
								<TableSortLabel
									active={props.orderBy === row.id}
									direction={props.order}
									onClick={createSortHandler(row.id)}
								>
									{row.label}
								</TableSortLabel>
							)}
						</TableCell>
					)
				   )
				 }
				</TableRow>
			</TableHead>
		);
};

export default EnhancedTableHead;
