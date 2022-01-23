enum PartnerActions {
  statistics = "statistics",
  clients = "clients",
  orders = "orders",
  services = "services",
  feedback = "feedback",
  news = "news",
  staff = "staff",
  proposals = "proposals",
  finances = "finances",
  notifications = "notifications",
  info = "info",
  settings = "settings",
  support = "support",
}

export const handleAction = (url: string) => {
  if (url.includes(`/${PartnerActions.statistics}`)) {
    return PartnerActions.statistics;
  } else if (url.includes(`/${PartnerActions.clients}`)) {
    return PartnerActions.clients;
  } else if (url.includes(`/${PartnerActions.orders}`)) {
    return PartnerActions.orders;
  } else if (url.includes(`/${PartnerActions.services}`)) {
    return PartnerActions.services;
  } else if (url.includes(`/${PartnerActions.feedback}`)) {
    return PartnerActions.feedback;
  } else if (url.includes(`/${PartnerActions.news}`)) {
    return PartnerActions.news;
  } else if (url.includes(`/${PartnerActions.staff}`)) {
    return PartnerActions.staff;
  } else if (url.includes(`/${PartnerActions.proposals}`)) {
    return PartnerActions.proposals;
  } else if (url.includes(`/${PartnerActions.finances}`)) {
    return PartnerActions.finances;
  } else if (url.includes(`/${PartnerActions.notifications}`)) {
    return PartnerActions.notifications;
  } else if (url.includes(`/${PartnerActions.info}`)) {
    return PartnerActions.info;
  } else if (url.includes(`/${PartnerActions.settings}`)) {
    return PartnerActions.settings;
  } else if (url.includes(`/${PartnerActions.support}`)) {
    return PartnerActions.support;
  } else return "";
};
