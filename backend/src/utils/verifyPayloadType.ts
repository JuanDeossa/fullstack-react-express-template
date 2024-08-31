import { AccessJwtPayload, RefreshJwtPayload } from "../modules/auth/auth.interfaces";

export const isRefreshJwtPayload = (
  payload: any
): payload is RefreshJwtPayload => {
  return (
    typeof payload === "object" &&
    typeof payload.sub === "object" &&
    typeof payload.sub.id === "string" &&
    typeof payload.sub.name === "string" &&
    typeof payload.sub.email === "string" &&
    typeof payload.sub.role === "string"
  );
};

export const isAccessJwtPayload = (
  payload: any
): payload is AccessJwtPayload => {
  return (
    typeof payload === "object" &&
    typeof payload.sub === "object" &&
    typeof payload.sub.id === "string" &&
    typeof payload.sub.name === "string" &&
    typeof payload.sub.email === "string" &&
    typeof payload.sub.role === "string"
  );
};
