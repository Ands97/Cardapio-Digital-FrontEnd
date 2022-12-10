import axios from "axios";
import { config } from "../config";
import { IOrders } from "../interfaces/IOrders";

const api = axios.create({
	baseURL: config.api.url,
});

export function useApi() {
	return {
		getOrders: async () => {
			const { data }: { data: IOrders[] } = await api.get("/orders");
			return data;
		},

		removeOrder: async (orderId: string) => {
			const { data } = await api.delete(`/orders/${orderId}`);
			return data;
		},

		changeOrderStatus: async (
			orderId: string,
			newStatus: IOrders["status"]
		) => {
			const { data } = await api.patch(`/orders/${orderId}`, {
				status: newStatus,
			});
			return data;
		},
	};
}
