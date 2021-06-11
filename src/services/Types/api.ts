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
