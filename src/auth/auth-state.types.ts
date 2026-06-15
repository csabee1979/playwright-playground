export type CachedAuthState = {
  expiresAt: string;
};

export type RestfulAuthState = CachedAuthState & {
  apiKey: string;
  token: string;
  tokenType: string;
  email: string;
};
