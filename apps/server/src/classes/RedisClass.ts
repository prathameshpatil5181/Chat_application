import { Redis } from "ioredis";
import { RedisSearchLanguages } from "redis";

export const publisher = new Redis({
  host: "redis-120b094d-chatapp-redis.a.aivencloud.com",
  port: 12706,
  username: "default",
  password: "AVNS_yk3WRO6oYdzCzEsHDiB",
});




export const Redisclient = new Redis({
  host: "redis-120b094d-chatapp-redis.a.aivencloud.com",
  port: 12706,
  username: "default",
  password: "AVNS_yk3WRO6oYdzCzEsHDiB",
});