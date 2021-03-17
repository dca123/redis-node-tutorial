const Redis = require('ioredis');

const redis = new Redis();

async function getRedisData(key) {
    const data = [];

    try {
        // Wrap this in a transaction so don't delete new list items that might get added.
        const result = await redis.multi()
            .lrange(key, 0, -1)
            .del(key)
            .exec();

        // The result of the lrange command (containing the list of history points) is
        // stored in the first element of the result array.  Within this element, the
        // history is stored in the second element.
        const items = result[0][1];

        items.forEach((s) => {
            data.push(JSON.parse(s));
        });
    } catch (error) {
        console.error(error);
    }
    return data;
}

async function main() {
    const key = 'poolTemps';
    const data = await getRedisData(key);
    console.log(data);

    // We have the data and could send it to the cloud from here.

    redis.disconnect();
}

main();