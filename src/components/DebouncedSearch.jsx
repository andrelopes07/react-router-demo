import { useEffect, useRef, useState } from "react";

export default function DebouncedSearch({ onSearchChange }) {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncerRef = useRef(null);

	const handleChange = (event) => {
		setSearchTerm(event.target.value);

		clearTimeout(debouncerRef.current);

		debouncerRef.current = setTimeout(() => {
			onSearchChange(event.target.value);
		}, 700);
	};

	useEffect(() => {
		return () => clearTimeout(debouncerRef.current);
	}, []);

	return (
		<label>
			Search with debounce:
			<input value={searchTerm} onChange={handleChange} />
		</label>
	);
}
