import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiMenu, HiOutlineHome } from "react-icons/hi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MenuButtons } from "../MenuButtons";
import { MenuContainer } from "./styles";

export function Menu() {
	const [showMenu, setShowMenu] = useState(false);

	const handleMenu = () => {
		showMenu ? setShowMenu(false) : setShowMenu(true);
	};
	return (
		<MenuContainer style={{ width: showMenu ? "15vw" : "2vw" }}>
			<MenuButtons
				icon={<HiOutlineHome size={"1.5em"} />}
				title="Inicio"
				showTitle={showMenu}
				route={"/"}
			/>

			<MenuButtons
				icon={<MdOutlineProductionQuantityLimits size={"1.5em"} />}
				title="Produtos"
				showTitle={showMenu}
				route={"/products"}
			/>

			<MenuButtons
				icon={<AiOutlineUserAdd size={"1.5em"} />}
				title="Usuários"
				showTitle={showMenu}
				route="/users"
			/>
			<button className="menu-button" onClick={handleMenu}>
				<HiMenu size="1.8em" />
			</button>
		</MenuContainer>
	);
}
