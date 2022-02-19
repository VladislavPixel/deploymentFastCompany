import React from "react"
import PropTypes from "prop-types"
import TableHeader from "./tableHeader.jsx"
import TableBody from "./tableBody.jsx"

const Table = ({ onSort, selectedSort, columns, data, children }) => {
	return (
		<table className="table">
			{children || (
				<React.Fragment>
					<TableHeader {...{ onSort, selectedSort, columns }} />
					<TableBody {...{ columns, data }} />
				</React.Fragment>
			)}
		</table>
	)
}

Table.propTypes = {
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	columns: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	children: PropTypes.array
}

export default Table
