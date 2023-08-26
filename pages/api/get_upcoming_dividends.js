import { db } from "@vercel/postgres";
import axios from "axios";
import { getDate } from "../../helpers/getDate";

export default async function handler(req, res) {
  let dividendStocks = [];
  let period = 1;
  try {
    let result = await axios.get(
      "http://localhost:3000/api/db/stocks/getAllSp"
    );
    const { spStocksArr } = result.data;
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

    // if(data.status.rCode === 200){
    res.status(200).json({ dividendStocks });

    // }
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
