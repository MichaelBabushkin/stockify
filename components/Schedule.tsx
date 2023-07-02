import axios from "axios";
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import aapl from '../public/static/images/stockLogos/aapl.svg'
interface ScheduleItem {
  company_name: string;
  ticker: string;
  sector: string;
  logo: string;
}

interface ScheduleResponse {
    scheduleData: ScheduleItem[];
  }
const Schedule: React.FC = () => {
  const [stocksData, setStocksData] = useState<ScheduleItem[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchStocksData = async () => {
      const { data } = await axios.get<ScheduleResponse>(
        `${window.location.href}/api/sp500stocks`
      );
      console.log(data)
      setStocksData(data.scheduleData); 
    };
    fetchStocksData();
  }, []);

  return (
    <main>
      <h1 className="title">S&P500 Stocks</h1>
      <div className="container">
        {stocksData && stocksData.length > 0 ? (
          stocksData.map((stock) => (
            <div className="race-card" key={stock.company_name} onClick={() => router.push(`/${encodeURIComponent(stock.ticker)}`)}>
              <p className="race-card_date">{stock.company_name}</p>
              <h1 className="race-card_venue">{stock.ticker}</h1>
              <h2 className="race-card_venue">{stock.sector}</h2>
              {/* <img className="logo" src={aapl}></img> */}
              <img className="logo" src={`static/images/stockLogos/${stock.ticker.toLocaleLowerCase()}.svg`}></img>
            </div>
          ))
        ) : (
          <div className="lds-hourglass"></div>
        )}
      </div>
    </main>
  );
};

export default Schedule;
