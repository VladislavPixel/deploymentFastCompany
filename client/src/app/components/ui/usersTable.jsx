import React from "react"
import PropTypes from "prop-types"
import BookMark from "../common/bookmark.jsx"
import Qualities from "./qualities"
import Table, { TableBody, TableHeader } from "../common/table"
import Profession from "./profession"

const UsersTable = ({
	users,
	onSort,
	selectedSort,
	onToggleBookMark
}) => {
	const columns = {
		name: { path: "name", name: "Имя" },
		qualities: {
			name: "Качества",
			component: (item) => <Qualities qualities={item.qualities} />
		},
		professions: {
			name: "Профессия",
			component: (item) => <Profession id = {item.profession} />
		},
		completedMeetings: { path: "completedMeetings", name: "Кол-во встреч" },
		rate: { path: "rate", name: "Рейтинг" },
		bookmark: {
			path: "bookmark",
			name: "Избранное",
			component: (user) => (
				<BookMark
					status={user.bookmark}
					// onClick={() => onToggleBookMark(user._id)}
				/>
			)
		}
	}
	return (
		<Table
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}
		>
			<TableHeader {...{ onSort, selectedSort, columns }} />
			<TableBody {...{ columns, data: users }} />
		</Table>
	)
}

UsersTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	rest: PropTypes.object,
	selectedSort: PropTypes.object,
	onToggleBookMark: PropTypes.func.isRequired
}

export default UsersTable
