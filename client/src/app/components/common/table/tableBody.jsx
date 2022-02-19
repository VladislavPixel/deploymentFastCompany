import React from "react"
import PropTypes, { array, object } from "prop-types"
import _ from "lodash"
import { Link } from "react-router-dom"

const TableBody = ({ data, columns }) => {
	const renderContent = (item, column) => {
		if (columns[column].component) {
			const component = columns[column].component
			if (typeof component === "function") {
				return component(item)
			}
			return component
		}
		return _.get(item, columns[column].path)
	}
	return (
		<tbody>
			{data.map((item, index, arr) => {
				return (
					<tr key={item._id}>
						{Object.keys(columns).map((column, i, ar) => {
							return (
								(column === "name" && (
									<td key={column}>
										<Link to={`/users/${item._id}`}>
											{renderContent(item, column)}
										</Link>
									</td>
								)) || <td key={column}>{renderContent(item, column)}</td>
							)
						})}
					</tr>
				)
			})}
		</tbody>
	)
}
TableBody.propTypes = {
	data: PropTypes.oneOfType([array, object]).isRequired,
	columns: PropTypes.object.isRequired
}

export default TableBody
