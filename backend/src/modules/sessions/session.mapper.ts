import { SessionResponse, SessionWithUser } from "./session.interfaces";

export const sessionMapper = (session: SessionWithUser): SessionResponse => {
  return {
    id: session.id,
    user: session.user,
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at,
    isActive: session.is_active,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
  };
};
