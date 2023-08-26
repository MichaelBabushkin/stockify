import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CoinLoader from "./CoinLoader";

interface StockItem {
  company_name: string;
  ticker: string;
  sector: string;
  logo: string;
}

interface ScheduleResponse {
  scheduleData: StockItem[];
}
const StockDash: React.FC = () => {
  const [stocksData, setStocksData] = useState<StockItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStocksData = async () => {
      const { data } = await axios.get<ScheduleResponse>(
        `${window.location.href}/api/sp500stocks`,
        {
          headers: {
            Accept: "application/json",
          },
          timeout: 300000,
        }
      );
      setStocksData(data.scheduleData);
    };
    const fetchStocksDividends = async () => {
      console.log("fetching for dividends");

      const { data } = await axios.get(
        `${window.location.href}/api/get_upcoming_dividends?period=week`
        // {
        //   headers: {
        //     Accept: 'application/json',
        //   },
        //   timeout: 300000,
        // }
      );
      console.log(data);

      // setStocksData(data.scheduleData);
    };
    // fetchStocksData();
    // fetchStocksDividends();
  }, []);

  useEffect(() => {
    if (stocksData.length > 0) {
      console.log("stockdata is full");
    }
    // const fetchStocksData = async () => {
    //   const { data } = await axios.get<ScheduleResponse>(
    //     `${window.location.href}/api/sp500stocks`
    //   );
    //   console.log(data)
    //   setStocksData(data.scheduleData);
    // };
    // fetchStocksData();
  }, [stocksData]);

  const getData = async () => {
    const { data } = await axios.get(`${window.location.href}/api/getLogos`);
    console.log("data", data);
    // await fetch(`${window.location.href}/api/db/getLogos`)
    // await fetch(`${window.location.href}/api/db/logo/addLogo`, {
    //   method: 'POST',
    //   headers: {
    //       'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify({ brand_name: 'aapl' ,brand_svg:'<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><style>.cls-1{fill:#fff;}</style></defs><title>AAPL_Dark_bg</title><path class="cls-1" d="M204.32,156.2c.28,30.3,26.46,40.37,26.74,40.51a108.46,108.46,0,0,1-13.76,28.45c-8.3,12.21-16.88,24.34-30.51,24.62-13.33.21-17.59-7.94-32.85-7.94s-20,7.66-32.63,8.23c-13.13.49-23.06-13.2-31.43-25.33-17.1-24.83-30.15-70.17-12.63-100.82C86,108.74,101.58,99.09,118.47,98.8c12.84-.21,25,8.66,32.85,8.66s22.63-10.78,38.1-9.15c6.53.28,24.69,2.62,36.39,19.86-.92.5-21.71,12.7-21.49,38m-25-74.35c7-8.45,11.64-20.22,10.36-31.93-10,.43-22.13,6.74-29.37,15.18C153.8,72.62,148.2,84.54,149.69,96c11.21.85,22.63-5.75,29.58-14.19"/></svg>'}),
    // .then( res => res.json() )
    // .then( data => {
    //   console.log(data.data.rows);
    // })
    // .catch( err => console.log(err) )
  };

  useEffect(() => {
    // getData()
  }, []);

  return (
    <main>
      <h1 className="title">Stocks Dashboard</h1>
      <div className="container">
        {stocksData && stocksData.length > 0 ? (
          stocksData.map((stock) => (
            <div
              className="race-card"
              key={stock.company_name}
              onClick={() =>
                router.push(`/${encodeURIComponent(stock.ticker)}`)
              }
            >
              <p className="race-card_date">{stock.company_name}</p>
              <h1 className="race-card_venue">{stock.ticker}</h1>
              <h2 className="race-card_venue">{stock.sector}</h2>
              {/* <img className="logo" src={aapl}></img> */}
              <img
                className="logo"
                src={`static/images/stockLogos/${stock.ticker.toLocaleLowerCase()}.svg`}
              ></img>
            </div>
          ))
        ) : (
          // <div className="lds-hourglass"></div>
          <CoinLoader />
        )}
      </div>
    </main>
  );
};

export default StockDash;
