import { useState } from "react";
import styles from "./Form.module.css";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const submitMock = (data) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(console.log(data));
		}, 1000);
	});

export default function FormWithFormData() {
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formEl = e.target;
		const formData = new FormData(formEl);

		const enteredData = {
			name: formData.get("name").trim(),
			email: formData.get("email").trim(),
			password: formData.get("password").trim(),
			confirmPassword: formData.get("confirmPassword").trim(),
		};

		const errors = {};

		if (enteredData.name.length <= 2) {
			errors.name = "Name must be at least 2 chars.";
		}
		if (
			!enteredData?.email?.includes("@") ||
			!enteredData?.email?.includes(".")
		) {
			errors.email = "Please enter a valid email address.";
		}
		if (!passwordRegex.test(enteredData.password)) {
			errors.password =
				"Your password must have at least 8 chars, including an uppercase letter and a number.";
		}
		if (
			!enteredData.confirmPassword ||
			enteredData.password !== enteredData.confirmPassword
		) {
			errors.confirmPassword = "Your passwords don't match.";
		}

		if (Object.keys(errors).length) {
			setErrors(errors);
		} else {
			setIsLoading(true);

			submitMock(enteredData).then(() => {
				formEl.reset();
				setErrors({});
				setIsLoading(false);
			});
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.field}>
				<label htmlFor="ffd-name">Name</label>
				<input type="text" id="ffd-name" name="name" />
				{errors.name && <span className={styles.error}>{errors.name}</span>}
			</div>

			<div className={styles.field}>
				<label htmlFor="ffd-email">Email</label>
				<input type="email" id="ffd-email" name="email" />
				{errors.email && <span className={styles.error}>{errors.email}</span>}
			</div>

			<div className={styles.field}>
				<label htmlFor="ffd-password">Password</label>
				<input type="password" id="ffd-password" name="password" />
				{errors.password && (
					<span className={styles.error}>{errors.password}</span>
				)}
			</div>

			<div className={styles.field}>
				<label htmlFor="ffd-confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="ffd-confirmPassword"
					name="confirmPassword"
				/>
				{errors.confirmPassword && (
					<span className={styles.error}>{errors.confirmPassword}</span>
				)}
			</div>

			<button className={styles.submit} type="submit" disabled={isLoading}>
				Submit
			</button>
		</form>
	);
}
