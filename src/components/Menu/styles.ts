import styled from "styled-components";

export const MenuContainer = styled.nav`
	position: absolute;
	overflow: auto;
	min-height: 100vh;
	border: 1px solid rgba(204, 204, 204, 0.4);
	background: #fff;
	transition: all ease 0.5s;
	padding-top: 36px;
	.menu-button {
		border: none;
		background: transparent;
		position: absolute;
		right: 5px;
		top: 5px;
	}
`;
