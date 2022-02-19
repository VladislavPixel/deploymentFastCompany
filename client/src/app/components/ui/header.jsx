import React from "react"
import { Link, useHistory } from "react-router-dom"
import NavProfile from "./navProfile"
import { useSelector } from "react-redux"
import { getIsLoggedInStatus } from "../../store/users"

const Header = () => {
	const isLogged = useSelector(getIsLoggedInStatus())
	const history = useHistory()
	const handlerBtnEntrance = () => {
		history.push("/login")
	}
	return (
		<div className="header">
			<nav className="header__navbar navbar">
				<div className="container-fluid">
					<ul className="nav">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/">
								Main
							</Link>
						</li>
						{(isLogged &&
							<li className="nav-item">
								<Link className="nav-link" to="/users">
									Users
								</Link>
							</li>) ||
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						}
					</ul>
					<div className="d-flex">
						{(isLogged &&
							<NavProfile />) ||
							<button onClick={handlerBtnEntrance} className="btn btn-success">Вход</button>
						}
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Header
