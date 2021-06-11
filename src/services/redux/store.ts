import { configureStore } from "@reduxjs/toolkit";
import partner from "./Slices/partnerSlice";
import statistics from "./Slices/statistics";
export const store = configureStore({
	reducer: {
		partner: partner,
		statistics: statistics,
	},
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
