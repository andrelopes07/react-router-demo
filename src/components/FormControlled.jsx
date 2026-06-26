import { useState } from "react";
import styles from "./Form.module.css";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const submitFn = (data) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(console.log(data));
		}, 1000);
	});

export default function FormControlled() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();

		const errors = {};

		if (name.trim().length <= 2) {
			errors.name = "Name must be at least 2 chars";
		}
		if (!email.trim().includes("@") || !email.trim().includes(".")) {
			errors.email = "You must enter a valid email";
		}
		if (!passwordRegex.test(password)) {
			errors.password =
				"Your password must have at least 8 chars, 1 uppercase letter and a number";
		}
		if (
			!confirmPassword.trim() ||
			password?.trim() !== confirmPassword?.trim()
		) {
			errors.confirmPassword = "Passwords don't match";
		}

		const isFormValid = Object.keys(errors).length === 0;

		if (!isFormValid) {
			setErrors(errors);
		} else {
			setIsSubmitting(true);
			setErrors({});

			submitFn({ name, email }).then(() => {
				setIsSubmitting(false);
				setName("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
			});
		}
	};

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.field}>
				<label htmlFor="fc-name">Name</label>
				<input
					type="text"
					id="fc-name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				{errors.name && <span className={styles.error}>{errors.name}</span>}
			</div>

			<div className={styles.field}>
				<label htmlFor="fc-email">Email</label>
				<input
					type="email"
					id="fc-email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{errors.email && <span className={styles.error}>{errors.email}</span>}
			</div>

			<div className={styles.field}>
				<label htmlFor="fc-password">Password</label>
				<input
					type="password"
					id="fc-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{errors.password && (
					<span className={styles.error}>{errors.password}</span>
				)}
			</div>

			<div className={styles.field}>
				<label htmlFor="fc-confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="fc-confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{errors.confirmPassword && (
					<span className={styles.error}>{errors.confirmPassword}</span>
				)}
			</div>

			<button className={styles.submit} type="submit" disabled={isSubmitting}>
				Submit
			</button>
		</form>
	);
}
