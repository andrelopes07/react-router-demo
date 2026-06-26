import { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";

export default function SearchWithDebouceHook({ onSearchChange }) {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 700);

	useEffect(() => {
		onSearchChange(debouncedSearchTerm);
	}, [debouncedSearchTerm, onSearchChange]);

	return (
		<label>
			Search with debounce hook:
			<input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</label>
	);
}
