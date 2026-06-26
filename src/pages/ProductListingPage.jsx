import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";

import DebouncedSearch from "../components/DebouncedSearch";
import Search from "../components/Search";
import SearchWithDebounceHook from "../components/SearchWithDebounceHook";
import styles from "./ProductListingPage.module.css";

const mockProducts = [
	{ id: "p1", title: "Product 1" },
	{ id: "p2", title: "Product 2" },
	{ id: "p3", title: "Product 3" },
	{ id: "p4", title: "Product 4" },
	{ id: "p5", title: "Product 5" },
	{ id: "p6", title: "Product 6" },
];

export default function ProductListingPage() {
	const [filteredProducts, setFilteredProducts] = useState(mockProducts);
	const lastSearchTermRef = useRef("");

	const onSearchChange = useCallback((searchTerm) => {
		if (searchTerm === lastSearchTermRef.current) return;

		lastSearchTermRef.current = searchTerm;

		if (!searchTerm) {
			setFilteredProducts(mockProducts);
			return;
		}

		const filteredProducts = mockProducts.filter((product) =>
			product.title.includes(searchTerm),
		);
		setFilteredProducts(filteredProducts);
	}, []);

	return (
		<>
			<h1>The Products Page</h1>

			<section className={styles.searchSection}>
				<Search onSearchChange={onSearchChange} />
				<DebouncedSearch onSearchChange={onSearchChange} />
				<SearchWithDebounceHook onSearchChange={onSearchChange} />
			</section>

			<ul className={styles.grid}>
				{filteredProducts.map((product) => (
					<li key={product.id} className={styles.card}>
						<Link to={product.id}>{product.title}</Link>
					</li>
				))}
			</ul>

			<p>
				Go to <Link to="/">the Home page</Link>.
			</p>
		</>
	);
}
