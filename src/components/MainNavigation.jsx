import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
	return (
		<header className={classes.header}>
			<nav>
				<ul className={classes.list}>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) => (isActive ? classes.active : "")}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="products"
							className={({ isActive }) => (isActive ? classes.active : "")}
						>
							Products
						</NavLink>
					</li>
					<li>
						<NavLink
							to="registration"
							className={({ isActive }) => (isActive ? classes.active : "")}
						>
							Registration Forms
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
