import FormControlled from "../components/FormControlled";
import FormWithFormData from "../components/FormWithFormData";
import FormWithReactFormActions from "../components/FormWithReactFormActions";
import styles from "./Home.module.css";

export const RegistrationPage = () => {
	return (
		<div className={styles.formsGrid}>
			<div>
				<h3>Form (Controlled)</h3>
				<FormControlled />
			</div>

			<div>
				<h3>Form (Uncontrolled, with formAction)</h3>
				<FormWithFormData />
			</div>

			<div>
				<h3>Form (React Form Actions)</h3>
				<FormWithReactFormActions />
			</div>
		</div>
	);
};

export default RegistrationPage;
