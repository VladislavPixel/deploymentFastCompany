import React, { useState, useEffect } from "react"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/pagination.jsx"
import GroupList from "../../common/groupList.jsx"
import SearchStatus from "../../ui/searchStatus.jsx"
import UsersTable from "../../ui/usersTable.jsx"
import _ from "lodash"
import Spinner from "../../common/spinner.jsx"
import TextField from "../../common/form/textField.jsx"
import { useSelector } from "react-redux"
import {
	getLoadingProfession,
	getProfessionsData
} from "../../../store/profession"
import { getUsersData, getCurrentUserId } from "../../../store/users"

const UsersListPage = () => {
	const [search, setSearch] = useState("") // State Search input
	const [currentPage, setCurrentPage] = useState(1) // State Pagin
	const pageSize = 4
	const [selectedProf, setSelectedProf] = useState(null) // State active li groupList
	const [sortBy, setSortBy] = useState({ path: "name", order: "asc" }) // state sort
	const users = useSelector(getUsersData())
	const loading = useSelector(getLoadingProfession())
	const professions = useSelector(getProfessionsData())
	const currentUserID = useSelector(getCurrentUserId())
	const handleToggleBookMark = (id) => {
		// Реализовать избранное
		console.log(id)
	}

	// ==============================================
	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}
	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])
	const handleProfessionSelect = (object) => {
		setSelectedProf(object)
		setSearch("")
	}
	const handleSort = (item) => {
		setSortBy(item)
	}
	const handlerSearchUpdate = (target) => {
		setSearch(target.value)
		setSelectedProf(null)
	}
	if (users) {
		function filterUsers(data) {
			const filteredUsers =
			(selectedProf &&
				data.filter(user => user.profession === selectedProf._id)) ||
			(search &&
				data.filter(user => {
					if (user.name.trim().toLowerCase().includes(search.toLowerCase())) {
						return user
					}
					return null
				})) ||
				data // когда мы получали профессии из professionsObject у нас объекты одинаковые, так как users получает из этой же сущности объекты, ссылки одинаковые и мы могли так сравнивать
			return (currentUserID ? filteredUsers.filter(item => item._id !== currentUserID) : filteredUsers)
		}
		const filteredUsers = filterUsers(users)
		const count = filteredUsers.length

		// используем метод из библиотеки Лодаш для сортировки
		const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

		const usersCrop = paginate(sortedUsers, currentPage, pageSize)

		const clearFilter = () => {
			setSelectedProf()
		}
		return (
			<div className="d-flex">
				<div className="d-flex flex-column flex-shrink-0 p-3">
					{(!loading &&
						<React.Fragment>
							<GroupList
								selectedItem={selectedProf}
								contentProperty="name"
								valueProperty="_id"
								items={professions}
								onItemSelect={handleProfessionSelect}
							/>
							<button className="btn btn-secondary mt-2" onClick={clearFilter}>
								Очистить
							</button>
						</React.Fragment>) || <Spinner />}
				</div>
				<div className="d-flex flex-column">
					<SearchStatus length={count} />
					{users.length > 0 && (
						<React.Fragment>
							<TextField
								label=""
								name="search"
								value={search}
								onChange={handlerSearchUpdate}
								placeholder="Search..."
							/>
							{(count > 0 && <UsersTable
								users={usersCrop}
								onSort={handleSort}
								selectedSort={sortBy}
								onToggleBookMark={handleToggleBookMark}
							/>) || <div style={{ color: "green", fontWeight: 600, fontSize: "20px" }}>Попробуйте указать другую фильтрацию</div>}
						</React.Fragment>
					)}
					<div className="d-flex justify-content-center">
						<Pagination
							itemsCount={count}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		)
	}
	return <Spinner />
}

export default UsersListPage
