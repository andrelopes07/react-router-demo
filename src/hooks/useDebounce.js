import { useEffect, useState } from "react";

export default function useDebounce(value, delayInMs = 300) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delayInMs);

		return () => clearTimeout(timer);
	}, [value, delayInMs]);

	return debouncedValue;
}
