export enum SOCKET_EVENT {
    REFRESH_CLIENT_QR_CODE = "refresh_qrcode",

    // send message to chat
    CHAT_TO_SERVER = "chat_to_server",

    // chat listen events
    CHAT_CLIENT_TO_PARTNER = "chat_client_to_partner",
    CHAT_PARTNER_TO_CLIENT = "chat_partner_to_client",
    CHAT_CLIENT_TO_MODERATOR = "chat_client_to_moderator",
    CHAT_MODERATOR_TO_CLIENT = "chat_moderator_to_client",
    CHAT_PARTNER_TO_MODERATOR = "chat_partner_to_moderator",
    CHAT_MODERATOR_TO_PARTNER = "chat_moderator_to_partner",
}

export enum USER_TYPES {
    CUSTOMER = 1,
    PARTNER_ADMIN = 2,
    CASHIER = 3,
    MANAGER = 4,
    WORKER = 5,
}

export enum CHAT_TYPES {
    CLIENT_TO_PARTNER = 1,
    PARTNER_TO_CLIENT = 2,
    CLIENT_TO_MODERATOR = 3,
    MODERATOR_TO_CLIENT = 4,
    PARTNER_TO_MODERATOR = 5,
    MODERATOR_TO_PARTNER = 6,
}