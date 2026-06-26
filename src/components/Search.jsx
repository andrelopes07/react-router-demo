import { useEffect, useState } from "react";

export default function Search({ onSearchChange }) {
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			onSearchChange(searchTerm);
		}, 700);

		return () => clearTimeout(timeout);
	}, [searchTerm, onSearchChange]);

	return (
		<label>
			Search:
			<input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</label>
	);
}
