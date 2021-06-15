type error = {
	isFriendly: boolean;
	errId: number;
	errMsg: string;
};

export interface IAdminLogin {
	data: {
		accessToken: string;
		refreshToken: string;
		roleId: number;
		workerId: number;
	} | null;
	error: error | null;
	success: boolean;
}

export interface IAuthToken {
	data: {
		accessToken: string;
	} | null;
	error: error | null;
	success: boolean;
}

export interface IClientStatistics {
	clientCount: number;
	maleCount: number;
	femaleCount: number;
	ageAvg: number;
	chequeCount: number;
	uniqueChequeClient: number;
	paidWithMoney: number;
	paidWithPoint: number;
	pointSum: number;
	chequeAvg: number;
	cashbackSum: number;
	discountSum: number;
	couponAmountSum: number;
	couponDiscountSum: number;
	allClientParkCards: number;
	filter: {
		gender: {
			id: number;
			name: string | null;
		}[];

		referal: {
			name: string | null;
			refIds: number[] | null;
		}[];

		levels: {
			number: number;
			name: string | null;
		}[];
	};
}
