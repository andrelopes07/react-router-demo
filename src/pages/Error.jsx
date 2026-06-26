import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const REDIRECT_DELAY = 3;

export default function ErrorPage() {
	const navigate = useNavigate();
	const [remainingSeconds, setRemainingSeconds] = useState(REDIRECT_DELAY);

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingSeconds((prevState) => {
				if (prevState <= 1) {
					clearInterval(interval);
					navigate("/");
					return 0;
				}
				return prevState - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [navigate]);

	return (
		<>
			<MainNavigation />
			<main>
				<h1>An error occurred!</h1>
				<p>Could not find this page!</p>
				<p>You'll be redirected in {remainingSeconds} seconds</p>
			</main>
		</>
	);
}
