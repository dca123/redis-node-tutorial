const Redis = require("ioredis");

const redis = new Redis()

async function main() {
    let key = 'team1'
    try {
        const points = await redis.incr(key);
        console.log(points);
    }catch(err){
        console.log(err);
    }

    key = 'veggies'
    const vegetable = ['tomata', 'corn', 'eggplant']
    try {
        const result = await redis.rpush(key, ...vegetable)
    } catch(err){
        console.log(err)
    }

    try {
        const result = await redis.rpush(key, ...vegetable)
    } catch(err){
        console.log(err)
    }

    const veggies = await redis.lrange(key, 0, -1);

    await redis.rpop(key)

    const shamu = {
        type: 'killer whale',
        age: 5,
        lastFeedData: 'Jan 06 2018'
    }

    key = 'shamu';

    for (const prop in shamu){
        console.log(prop, shamu[prop]);
        const result = await redis.hset(key, prop, shamu[prop])
        console.log(result);
    }

    const lobby = {
        lobbyID: 123,
        lobbyName: "lobby 1",
        players: {"playe1": 1234, "player2":5678}
    }

    key = 'lobby';

    const result = await redis.set(key, JSON.stringify(lobby));
    console.log(JSON.parse(await redis.get(key)));

    redis.disconnect();
}
redis.connect(() => console.log('Connected to redis server'))
main();