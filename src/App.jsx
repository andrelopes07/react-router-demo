import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListingPage from "./pages/ProductListingPage";
import RegistrationPage from "./pages/RegistrationPage";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "products", element: <ProductListingPage /> },
			{ path: "products/:productId", element: <ProductDetailsPage /> },
			{ path: "registration", element: <RegistrationPage /> },
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
