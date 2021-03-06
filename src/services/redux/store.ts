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
import qrSetting from './Slices/qrSetting';
import financeSlice from './Slices/finance';
import firebaseSlice from './Slices/firebase';
import NewsSlice from './Slices/news';
import NewsSettingSlice from './Slices/setting';
import { permissionsSlice } from './Slices/permissions';

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
    news: NewsSlice,
    qrSetting: qrSetting,
    finance: financeSlice,
    firebaseSlice: firebaseSlice,
    newsetting: NewsSettingSlice,
    permissions: permissionsSlice.reducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
