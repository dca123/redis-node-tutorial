const Redis = require('ioredis');

const redis = new Redis();

const getData = () => [
    { t: '1/6/2018 10:01', v: 75.59 },
    { t: '1/6/2018 10:02', v: 75.60 },
    { t: '1/6/2018 10:03', v: 75.63 },
];

async function populateWithHistory(key, data) {
    // Seed with data
    try {
        let strData = [];
        data.forEach(d => strData.push(JSON.stringify(d)));
        const result = await redis.rpush(key, ...strData);
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    const key = 'poolTemps';
    const data = getData();
    const result = await populateWithHistory(key, data);
    console.log(result);
    redis.disconnect();
}

main();