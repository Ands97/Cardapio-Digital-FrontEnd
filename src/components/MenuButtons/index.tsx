import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonContainer, Container } from "./styles";

interface MenuButtonsProps {
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: ReactElement<any, any>;
	showTitle: boolean;
	route: string;
}

export function MenuButtons({
	icon,
	title,
	showTitle,
	route,
}: MenuButtonsProps) {
	const navigate = useNavigate();
	const [maxWidth, setMaxWidth] = useState("0vw");
	const handleWidht = () => {
		if (showTitle) {
			setMaxWidth("15vw");
		} else {
			setTimeout(() => {
				setMaxWidth("0vw");
			}, 200);
		}
	};

	const handleRoute = () => {
		navigate(route);
	};

	useEffect(() => {
		handleWidht();
	}, [showTitle]);
	console.log(showTitle);
	return (
		<Container>
			<ButtonContainer type="button" onClick={handleRoute}>
				<span className="icon">{icon}</span>
				<span className="titleButton" style={{ maxWidth: maxWidth }}>
					{title}
				</span>
			</ButtonContainer>
		</Container>
	);
}
