import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { IOrders } from "../../interfaces/IOrders";
import { OrdersBoard } from "../../components/OrdersBoard";
import { OrdersContainer } from "./styles";
import socketIo from "socket.io-client";
import { config } from "../../config";
import { toast } from "react-toastify";

export function Orders() {
	const api = useApi();
	const [orders, setOrders] = useState<IOrders[]>([]);

	const handleOrders = async () => {
		const orders = await api.getOrders();
		setOrders(orders);
	};

	const handleOrderStatusChange = (
		orderId: string,
		status: IOrders["status"]
	) => {
		setOrders((prevState) =>
			prevState.map((order) =>
				order._id == orderId ? { ...order, status } : order
			)
		);
	};

	const handleCancelOrder = (orderId: string) => {
		setOrders((prevState) =>
			prevState.filter((order) => order._id !== orderId)
		);
	};

	const waiting = orders.filter((order) => order.status === "WAITING");
	const inProduction = orders.filter(
		(order) => order.status === "IN_PRODUCTION"
	);
	const done = orders.filter((order) => order.status === "DONE");

	useEffect(() => {
		const socket = socketIo(config.api.url, {
			transports: ["websocket"],
		});

		socket.on("newOrder", (order: IOrders) => {
			toast.info(`Novo pedido na mesa ${order.table}`);
			setOrders((prevState) => prevState.concat(order));
		});
	}, []);

	useEffect(() => {
		handleOrders();
	}, []);

	return (
		<OrdersContainer>
			<OrdersBoard
				icon="⌚"
				title="Fila de espera"
				orders={waiting}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
			<OrdersBoard
				icon="👳"
				title="Em preparação"
				orders={inProduction}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
			<OrdersBoard
				icon="✅"
				title="Pronto"
				orders={done}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
		</OrdersContainer>
	);
}
