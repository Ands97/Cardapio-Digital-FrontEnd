export interface IOrders {
	_id: string;
	table: string;
	status: "WAITING" | "IN_PRODUCTION" | "DONE";
	products: IProducts[];
}

interface IProducts {
	_id: string;
	quantity: number;
	product: IProduct;
}

interface IProduct {
	name: string;
	imagePath: string;
	price: number;
}
