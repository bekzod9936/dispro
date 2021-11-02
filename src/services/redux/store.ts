import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './Slices/clients';
import clientStatistics from './Slices/clientStatistics';
import partner from './Slices/partnerSlice';
import statistics from './Slices/statistics/statistics';
import feedbackSlice from './Slices/FeedbackSlice';
import authSlice from './Slices/authSlice';
import settingsSlice from './Slices/settingsSlice/index';
import infoSlice from './Slices/infoSlice';
import loyalitySlice from './Slices/loyalitySlice';
import proposalsSlice from './Slices/proposals/proposals';
import feedbackPostSlice from './Slices/feedback/index';
import staffs from './Slices/staffs';
import info from './Slices/info/info';

export const store = configureStore({
  reducer: {
    partner: partner,
    statistics: statistics,
    clientStatistics: clientStatistics,
    clients: clientSlice,
    feedback: feedbackSlice,
    auth: authSlice,
    settings: settingsSlice,
    infoSlice: infoSlice,
    loyalitySlice: loyalitySlice,
    feedbackPost: feedbackPostSlice,
    proposals: proposalsSlice,
    staffs: staffs,
    info: info,
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
