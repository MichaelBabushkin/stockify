import { db } from "@vercel/postgres";
import axios from "axios";
import { getDate } from "../../helpers/getDate";
import Redis from "ioredis";

export default async function handler(req, res) {
  let dividendStocks = [];
  let period = 1;
  try {
    let redis = new Redis(process.env.REDIS_URL);

    let start = Date.now();
    let cache = await redis.get("all_dividends");
    cache = JSON.parse(cache);
    let result = {};
    if (cache) {
      result.dividendStocks = cache;
      result.type = "redis";
      result.latency = Date.now() - start;
      return res.status(200).json(result);
    } else {
      start = Date.now();

      let tickers = await axios.get(
        "http://localhost:3000/api/db/stocks/getAllSp"
      );
      const { spStocksArr } = tickers.data;
      switch (req.query.period) {
        case "day":
          period = 1;
          break;
        case "week":
          period = 7;
          break;
        case "month":
          period = 30;
          break;

        default:
          period = 1;
      }
      for (let i = 1; i < period; i++) {
        dividendStocks.push(...(await getDividendDataPerDay(i, spStocksArr)));
      }
      result.dividendStocks = dividendStocks;
      result.type = "api";
      result.latency = Date.now() - start;
      redis.set("all_dividends", JSON.stringify(result.dividendStocks), "EX", 60*60*24);
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ error });
  }
}

const getDividendDataPerDay = async (day, spStocksArr) => {
  const dividendUrl = `https://api.nasdaq.com/api/calendar/dividends?date=${getDate(
    day
  )}`;
  let dividendStocksPerDay = [];
  let { data } = await axios.get(dividendUrl);
  let thisDayDividends = data.data.calendar.rows || [];
  thisDayDividends.map((row) => {
    if (spStocksArr.includes(row.symbol.toLowerCase())) {
      dividendStocksPerDay.push(row);
    }
  });
  return dividendStocksPerDay;
};
