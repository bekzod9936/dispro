import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./Slices/clientSlice";
import clientStatistics from "./Slices/clientStatistics";
import partner from "./Slices/partnerSlice";
import statistics from "./Slices/statistics";
export const store = configureStore({
	reducer: {
		partner: partner,
		statistics: statistics,
		clientStatistics: clientStatistics,
		clients: clientSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
