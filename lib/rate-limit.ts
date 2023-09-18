import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function rateLimit(identifier: string) {
    const ratelimit = new Ratelimit({
        //creates a new RateLimit instance and configure it with several options
        redis: Redis.fromEnv(),
        //create a redis client
        limiter: Ratelimit.slidingWindow(10, "10 s"),
        /*sets the rate limiting algorithm to a sliding window with a limit of 10 
        request per 10 sec which means that the system will allow up to 10 requests*/
        analytics: true,
        //implies that analytics of statistics related to rate limiting will be tracked
        prefix: "@upstash/ratelimit",
        //specifies a prefix for the keys used in Redis for rate limiting
    });

    return await ratelimit.limit(identifier);
};