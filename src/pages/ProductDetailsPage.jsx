import { Link, useParams } from "react-router-dom";

export default function ProductDetailsPage() {
	const { productId } = useParams();

	return (
		<>
			<h1>The Product Details Page</h1>
			<p>Product ID: {productId}</p>
			<p>
				Go to{" "}
				<Link to=".." relative="path">
					the list of products
				</Link>
				.
			</p>
		</>
	);
}
