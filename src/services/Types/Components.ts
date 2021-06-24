export interface IClientStatisticFilter {
	title: string;
	inputType: "radio" | "date" | "input" | "checkbox";
	request: string;
	numOfInputs: any[];
	inputHandler?: Function;
	dateFrom?: any;
	dateTo?: any;
	checked?: any;
}
