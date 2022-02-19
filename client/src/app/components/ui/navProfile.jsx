import React, { useState } from "react"
import { Link } from "react-router-dom"
import ImageSnippet from "../common/imageSnippet"
import { useSelector } from "react-redux"
import { getCurrentUser } from "../../store/users"

const NavProfile = () => {
	const [isOpen, setOpen] = useState(false)
	const currentUser = useSelector(getCurrentUser())
	const toggleMenu = () => { setOpen(prevState => !prevState) }
	if (!currentUser) return "Loading..."
	return (
		<div className="dropdown" onClick={toggleMenu}>
			<div className="btn dropdown-toggle d-flex align-items-center">
				<div style={{ color: "#0d6efd", fontWeight: 700 }} className="me-2">{currentUser.name}</div>
				<ImageSnippet width="50" height="50" classes="img-responsive rounded-circle" urlQuery={currentUser.image} />
			</div>
			<div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
				<Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
				<Link to="/logout" className="dropdown-item">Log Out</Link>
			</div>
		</div>
	)
}

export default NavProfile
