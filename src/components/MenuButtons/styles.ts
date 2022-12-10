import styled from "styled-components";

export const Container = styled.div`
	overflow: hidden;
`;

export const ButtonContainer = styled.button`
	background: #fff;
	border: none;
	height: 56px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	position: relative;
	.titleButton {
		overflow: hidden;
		white-space: nowrap;
		font-size: 16px;
		display: flex;
		justify-content: center;
		flex: 1;
	}
	.icon {
		margin-left: 5px;
	}
	& + button {
		margin-top: 8px;
	}
	:hover {
		background: #fafafa;
		border-left: 4px solid #d73035;
	}
`;
