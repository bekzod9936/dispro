import partnerApi from 'services/interceptors/partner_interceptor';

export const saveBonusRewards = ({ companyId, rewards }: any) => {
  const response = partnerApi.post('/bonus/rewards', {
    companyId: companyId,
    rewards: rewards,
  });

  return response;
};
