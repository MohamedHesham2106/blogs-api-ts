export interface TokenPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// For token pairs
export interface TokenPair {
  accessToken: string;
}

// Token configuration
export interface TokenConfig {
  secret: string;
  expiresIn: string | number;
}
