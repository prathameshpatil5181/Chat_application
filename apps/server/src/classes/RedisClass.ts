import { Redis } from "ioredis";

export const publisher = new Redis({
  host: "redis-120b094d-chatapp-redis.a.aivencloud.com",
  port: 12706,
  username: "default",
  password: "AVNS_yk3WRO6oYdzCzEsHDiB",
});




export default Redis;