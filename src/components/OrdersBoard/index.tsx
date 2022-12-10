import { toast } from "react-toastify";

import { useState } from "react";
import { useApi } from "../../hooks/useApi";

import { IOrders } from "../../interfaces/IOrders";
import { OrderModal } from "../OrderModal";
import { Board, OrdersContainer } from "./styles";

interface OrdersBoardProps {
	icon: string;
	title: string;
	orders: IOrders[];
	onCancelOrder(orderId: string): void;
	onChangeOrderStatus(orderId: string, status: IOrders["status"]): void;
}

export function OrdersBoard({
	icon,
	title,
	orders,
	onCancelOrder,
	onChangeOrderStatus,
}: OrdersBoardProps) {
	const api = useApi();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedOrder, setSelectedorder] = useState<IOrders | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleOpenModal = (order: IOrders) => {
		setIsModalVisible(true);
		setSelectedorder(order);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
		setSelectedorder(null);
	};

	const handleChangeOrderStatus = async () => {
		setIsLoading(true);
		const newStatus =
			selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

		await api.changeOrderStatus(selectedOrder?._id as string, newStatus);

		toast.success(
			`O pedido da mesa ${selectedOrder?.table} teve o status alterado !`
		);
		onChangeOrderStatus(selectedOrder?._id as string, newStatus);
		setIsLoading(false);
		setIsModalVisible(false);
	};

	const handleCancelOrder = async () => {
		setIsLoading(true);
		await api.removeOrder(selectedOrder?._id as string);

		toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
		onCancelOrder(selectedOrder?._id as string);
		setIsLoading(false);
		setIsModalVisible(false);
	};
	return (
		<Board>
			<OrderModal
				visible={isModalVisible}
				order={selectedOrder}
				onClose={handleCloseModal}
				onCancelOrder={handleCancelOrder}
				isLoading={isLoading}
				onChangeOrderStatus={handleChangeOrderStatus}
			/>

			<header>
				<span>{icon}</span>
				<strong>{title}</strong>
				<span>({orders.length})</span>
			</header>

			<OrdersContainer>
				{orders.map((order) => (
					<button
						key={order._id}
						type="button"
						onClick={() => handleOpenModal(order)}
					>
						<strong>Mesa {order.table}</strong>
						<span>
							{order.products.length} ite
							{order.products.length > 1 ? "ns" : "m"}
						</span>
					</button>
				))}
			</OrdersContainer>
		</Board>
	);
}
