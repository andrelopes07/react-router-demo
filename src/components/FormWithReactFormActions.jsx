import { useActionState } from "react";

import styles from "./Form.module.css";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const submitMock = (formData) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(console.log(formData));
		}, 1000);
	});

const FormWithReactFormActions = () => {
	const [state, formAction, isPending] = useActionState(
		async (_prevState, formData) => {
			const name = formData.get("name");
			const email = formData.get("email");
			const password = formData.get("password");
			const confirmPassword = formData.get("confirmPassword");

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

			if (Object.keys(errors).length) {
				return { errors, values: { email, password, confirmPassword } };
			}

			await submitMock({ email, password, confirmPassword });

			return {
				errors: {},
				values: { email: "", password: "", confirmPassword: "" },
			};
		},
		{ errors: {}, values: { email: "", password: "", confirmPassword: "" } },
	);

	return (
		<form className={styles.form} action={formAction}>
			<div className={styles.field}>
				<label htmlFor="frfa-name">Name</label>
				<input
					type="text"
					id="frfa-name"
					name="name"
					value={state.values.name}
				/>
				{state.errors.name && (
					<span className={styles.error}>{state.errors.name}</span>
				)}
			</div>

			<div className={styles.field}>
				<label htmlFor="frfa-email">Email</label>
				<input
					type="email"
					id="frfa-email"
					name="email"
					defaultValue={state.values.email}
				/>
				{state.errors.email && (
					<span className={styles.error}>{state.errors.email}</span>
				)}
			</div>

			<div className={styles.field}>
				<label htmlFor="frfa-password">Password</label>
				<input
					type="password"
					id="frfa-password"
					name="password"
					defaultValue={state.values.password}
				/>
				{state.errors.password && (
					<span className={styles.error}>{state.errors.password}</span>
				)}
			</div>

			<div className={styles.field}>
				<label htmlFor="frfa-confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="frfa-confirmPassword"
					name="confirmPassword"
					defaultValue={state.values.confirmPassword}
				/>
				{state.errors.confirmPassword && (
					<span className={styles.error}>{state.errors.confirmPassword}</span>
				)}
			</div>

			<button className={styles.submit} type="submit" disabled={isPending}>
				Submit
			</button>
		</form>
	);
};

export default FormWithReactFormActions;
