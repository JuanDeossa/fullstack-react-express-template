// src/types/user.ts
// src/types/user.ts

export interface BaseSession {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface SessionResponse extends BaseSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  isActive: boolean;
}
