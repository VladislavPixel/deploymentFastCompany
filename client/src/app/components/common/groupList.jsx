import React from "react"
import PropTypes from "prop-types"

const GroupList = ({
	items,
	valueProperty,
	contentProperty,
	onItemSelect,
	selectedItem
}) => {
	return (
		<ul className="list-group">
			{Object.keys(items).map((key, index, array) => {
				return (
					<li
						style={{ cursor: "pointer" }}
						onClick={() => {
							onItemSelect(items[key])
						}}
						key={items[key][valueProperty]}
						className={
							(selectedItem &&
								"list-group-item" +
									(items[key][valueProperty] === selectedItem[valueProperty]
										? " active"
										: "")) ||
							"list-group-item"
						}
					>
						{items[key][contentProperty]}
					</li>
				)
			})}
		</ul>
	)
}
GroupList.defailtProps = {
	valueProperty: "_id",
	contentProperty: "name"
}
GroupList.propTypes = {
	items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	selectedItem: PropTypes.object
}

export default GroupList
