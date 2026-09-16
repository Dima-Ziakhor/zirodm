export interface DatabaseConfig {
  pg: {
    host: string;
    port: number;
    user: string;
    password: string;
    db: string;
  };
}
