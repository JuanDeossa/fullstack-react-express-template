// src/types/user.ts
// src/types/user.ts

export interface RefreshJwtPayload {
  sub: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AccessJwtPayload {
  sub: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
