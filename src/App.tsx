import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStyles } from "./styles/GlobalStyles";

import { Header } from "./components/Header";
import { Orders } from "./pages/Orders";
import { Route, Routes } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Products } from "./pages/Products";

function App() {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Menu />
			<ToastContainer position="bottom-center" />
			<Routes>
				<Route path="/" element={<Orders />} />
				<Route path="/products" element={<Products />} />
			</Routes>
		</>
	);
}

export default App;
