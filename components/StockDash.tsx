import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CoinLoader from "./CoinLoader";
import Image from "next/image";
import {convertUsDateToEuropeDate} from '../helpers/getDate'

interface StockItem {
  company_name: string;
  ticker: string;
  sector: string;
  logo: string;
}

interface DividendItem {
  announcement_Date: string;
  companyName: string;
  dividend_Ex_Date: string;
  dividend_Rate: number;
  indicated_Annual_Dividend: number;
  payment_Date: string;
  record_Date: string;
  symbol: string;
}

interface ScheduleResponse {
  scheduleData: StockItem[];
}
const StockDash: React.FC = () => {
  const [stocksData, setStocksData] = useState<StockItem[]>([]);
  const [dividendsData, setDividendsData] = useState<DividendItem[]>([]);
  // const [dividendsData, setDividendsData] = useState<DividendItem[]>([
  //   {
  //     companyName: "Skyworks Solutions, Inc. Common Stock",
  //     symbol: "SWKS",
  //     dividend_Ex_Date: "8/28/2023",
  //     payment_Date: "9/19/2023",
  //     record_Date: "8/29/2023",
  //     dividend_Rate: 0.68,
  //     indicated_Annual_Dividend: 2.48,
  //     announcement_Date: "8/07/2023",
  //   },
  //   {
  //     companyName: "KeyCorp Common Stock",
  //     symbol: "KEY",
  //     dividend_Ex_Date: "8/28/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/29/2023",
  //     dividend_Rate: 0.205,
  //     indicated_Annual_Dividend: 0.82,
  //     announcement_Date: "7/11/2023",
  //   },
  //   {
  //     companyName: "Yum! Brands, Inc.",
  //     symbol: "YUM",
  //     dividend_Ex_Date: "8/28/2023",
  //     payment_Date: "9/08/2023",
  //     record_Date: "8/29/2023",
  //     dividend_Rate: 0.605,
  //     indicated_Annual_Dividend: 2.42,
  //     announcement_Date: "8/17/2023",
  //   },
  //   {
  //     companyName: "Electronic Arts Inc. Common Stock",
  //     symbol: "EA",
  //     dividend_Ex_Date: "8/29/2023",
  //     payment_Date: "9/20/2023",
  //     record_Date: "8/30/2023",
  //     dividend_Rate: 0.19,
  //     indicated_Annual_Dividend: 0.76,
  //     announcement_Date: "7/31/2023",
  //   },
  //   {
  //     companyName: "Fox Corporation Class A Common Stock",
  //     symbol: "FOXA",
  //     dividend_Ex_Date: "8/29/2023",
  //     payment_Date: "9/27/2023",
  //     record_Date: "8/30/2023",
  //     dividend_Rate: 0.26,
  //     indicated_Annual_Dividend: 0.5,
  //     announcement_Date: "8/02/2023",
  //   },
  //   {
  //     companyName: "Fox Corporation Class B Common Stock",
  //     symbol: "FOX",
  //     dividend_Ex_Date: "8/29/2023",
  //     payment_Date: "9/27/2023",
  //     record_Date: "8/30/2023",
  //     dividend_Rate: 0.26,
  //     indicated_Annual_Dividend: 0.5,
  //     announcement_Date: "8/02/2023",
  //   },
  //   {
  //     companyName: "NextEra Energy, Inc. Common Stock",
  //     symbol: "NEE",
  //     dividend_Ex_Date: "8/29/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/30/2023",
  //     dividend_Rate: 0.4675,
  //     indicated_Annual_Dividend: 1.87,
  //     announcement_Date: "7/27/2023",
  //   },
  //   {
  //     companyName: "CSX Corporation Common Stock",
  //     symbol: "CSX",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.11,
  //     indicated_Annual_Dividend: 0.44,
  //     announcement_Date: "7/12/2023",
  //   },
  //   {
  //     companyName: "Newell Brands Inc. Common Stock",
  //     symbol: "NWL",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.07,
  //     indicated_Annual_Dividend: 0.28,
  //     announcement_Date: "8/08/2023",
  //   },
  //   {
  //     companyName: "QUALCOMM Incorporated Common Stock",
  //     symbol: "QCOM",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/21/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.8,
  //     indicated_Annual_Dividend: 3.2,
  //     announcement_Date: "7/05/2023",
  //   },
  //   {
  //     companyName: "Home Depot, Inc. (The) Common Stock",
  //     symbol: "HD",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/14/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 2.09,
  //     indicated_Annual_Dividend: 8.36,
  //     announcement_Date: "8/17/2023",
  //   },
  //   {
  //     companyName: "Goldman Sachs Group, Inc. (The) Common Stock",
  //     symbol: "GS",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/28/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 2.75,
  //     indicated_Annual_Dividend: 11,
  //     announcement_Date: "7/19/2023",
  //   },
  //   {
  //     companyName: "Union Pacific Corporation Common Stock",
  //     symbol: "UNP",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 1.3,
  //     indicated_Annual_Dividend: 5.2,
  //     announcement_Date: "7/26/2023",
  //   },
  //   {
  //     companyName: "Estee Lauder Companies, Inc. (The) Common Stock",
  //     symbol: "EL",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.66,
  //     indicated_Annual_Dividend: 2.64,
  //     announcement_Date: "8/18/2023",
  //   },
  //   {
  //     companyName: "Corning Incorporated Common Stock",
  //     symbol: "GLW",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/28/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.28,
  //     indicated_Annual_Dividend: 1.12,
  //     announcement_Date: "6/21/2023",
  //   },
  //   {
  //     companyName: "FactSet Research Systems Inc. Common Stock",
  //     symbol: "FDS",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/21/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.98,
  //     indicated_Annual_Dividend: 3.92,
  //     announcement_Date: "8/03/2023",
  //   },
  //   {
  //     companyName: "Allstate Corporation (The) Common Stock",
  //     symbol: "ALL",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.89,
  //     indicated_Annual_Dividend: 3.56,
  //     announcement_Date: "7/14/2023",
  //   },
  //   {
  //     companyName: "Dover Corporation Common Stock",
  //     symbol: "DOV",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.51,
  //     indicated_Annual_Dividend: 2.04,
  //     announcement_Date: "8/03/2023",
  //   },
  //   {
  //     companyName: "Xylem Inc. Common Stock New",
  //     symbol: "XYL",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/28/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.33,
  //     indicated_Annual_Dividend: 1.32,
  //     announcement_Date: "8/17/2023",
  //   },
  //   {
  //     companyName: "Dow Inc. Common Stock ",
  //     symbol: "DOW",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/08/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.7,
  //     indicated_Annual_Dividend: 2.8,
  //     announcement_Date: "8/09/2023",
  //   },
  //   {
  //     companyName: "Cboe Global Markets, Inc. Common Stock",
  //     symbol: "CBOE",
  //     dividend_Ex_Date: "8/30/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "8/31/2023",
  //     dividend_Rate: 0.55,
  //     indicated_Annual_Dividend: 2.2,
  //     announcement_Date: "8/16/2023",
  //   },
  //   {
  //     companyName: "C.H. Robinson Worldwide, Inc. Common Stock",
  //     symbol: "CHRW",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.61,
  //     indicated_Annual_Dividend: 2.44,
  //     announcement_Date: "8/10/2023",
  //   },
  //   {
  //     companyName: "eBay Inc. Common Stock",
  //     symbol: "EBAY",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.25,
  //     indicated_Annual_Dividend: 1,
  //     announcement_Date: "7/24/2023",
  //   },
  //   {
  //     companyName: "PepsiCo, Inc. Common Stock",
  //     symbol: "PEP",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 1.265,
  //     indicated_Annual_Dividend: 5.06,
  //     announcement_Date: "7/20/2023",
  //   },
  //   {
  //     companyName: "Teradyne, Inc. Common Stock",
  //     symbol: "TER",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/25/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.11,
  //     indicated_Annual_Dividend: 0.44,
  //     announcement_Date: "8/21/2023",
  //   },
  //   {
  //     companyName: "The Kraft Heinz Company Common Stock",
  //     symbol: "KHC",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.4,
  //     indicated_Annual_Dividend: 1.6,
  //     announcement_Date: "8/02/2023",
  //   },
  //   {
  //     companyName: "McDonald's Corporation Common Stock",
  //     symbol: "MCD",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/18/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 1.52,
  //     indicated_Annual_Dividend: 6.08,
  //     announcement_Date: "7/25/2023",
  //   },
  //   {
  //     companyName: "Lockheed Martin Corporation Common Stock",
  //     symbol: "LMT",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/22/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 3,
  //     indicated_Annual_Dividend: 12,
  //     announcement_Date: "6/22/2023",
  //   },
  //   {
  //     companyName: "Arthur J. Gallagher & Co. Common Stock",
  //     symbol: "AJG",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.55,
  //     indicated_Annual_Dividend: 2.2,
  //     announcement_Date: "7/26/2023",
  //   },
  //   {
  //     companyName: "Ball Corporation Common Stock",
  //     symbol: "BALL",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.2,
  //     indicated_Annual_Dividend: 0.8,
  //     announcement_Date: "7/26/2023",
  //   },
  //   {
  //     companyName: "Universal Health Services, Inc. Common Stock",
  //     symbol: "UHS",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.2,
  //     indicated_Annual_Dividend: 0.8,
  //     announcement_Date: "7/20/2023",
  //   },
  //   {
  //     companyName: "Kellogg Company Common Stock",
  //     symbol: "K",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.6,
  //     indicated_Annual_Dividend: 2.4,
  //     announcement_Date: "7/28/2023",
  //   },
  //   {
  //     companyName: "Hartford Financial Services Group, Inc. (The) Common Stock",
  //     symbol: "HIG",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "10/03/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.425,
  //     indicated_Annual_Dividend: 1.7,
  //     announcement_Date: "7/19/2023",
  //   },
  //   {
  //     companyName: "Weyerhaeuser Company Common Stock",
  //     symbol: "WY",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.19,
  //     indicated_Annual_Dividend: 0.76,
  //     announcement_Date: "8/10/2023",
  //   },
  //   {
  //     companyName: "Tyson Foods, Inc. Common Stock",
  //     symbol: "TSN",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.48,
  //     indicated_Annual_Dividend: 1.92,
  //     announcement_Date: "5/11/2023",
  //   },
  //   {
  //     companyName: "Dominion Energy, Inc. Common Stock",
  //     symbol: "D",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/20/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.6675,
  //     indicated_Annual_Dividend: 2.67,
  //     announcement_Date: "8/02/2023",
  //   },
  //   {
  //     companyName: "McKesson Corporation Common Stock",
  //     symbol: "MCK",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.62,
  //     indicated_Annual_Dividend: 2.48,
  //     announcement_Date: "7/24/2023",
  //   },
  //   {
  //     companyName: "Interpublic Group of Companies, Inc. (The) Common Stock",
  //     symbol: "IPG",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.31,
  //     indicated_Annual_Dividend: 1.24,
  //     announcement_Date: "7/31/2023",
  //   },
  //   {
  //     companyName: "Baxter International Inc. Common Stock",
  //     symbol: "BAX",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.29,
  //     indicated_Annual_Dividend: 1.16,
  //     announcement_Date: "7/18/2023",
  //   },
  //   {
  //     companyName: "Trane Technologies plc",
  //     symbol: "TT",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.75,
  //     indicated_Annual_Dividend: 3,
  //     announcement_Date: "6/02/2023",
  //   },
  //   {
  //     companyName: "Martin Marietta Materials, Inc. Common Stock",
  //     symbol: "MLM",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.74,
  //     indicated_Annual_Dividend: 2.96,
  //     announcement_Date: "8/10/2023",
  //   },
  //   {
  //     companyName: "Molson Coors Beverage Company Class B Common Stock",
  //     symbol: "TAP",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.41,
  //     indicated_Annual_Dividend: 1.64,
  //     announcement_Date: "7/13/2023",
  //   },
  //   {
  //     companyName: "M&T Bank Corporation Common Stock",
  //     symbol: "MTB",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 1.3,
  //     indicated_Annual_Dividend: 5.2,
  //     announcement_Date: "8/15/2023",
  //   },
  //   {
  //     companyName: "BorgWarner Inc. Common Stock",
  //     symbol: "BWA",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.11,
  //     indicated_Annual_Dividend: 0.44,
  //     announcement_Date: "6/26/2023",
  //   },
  //   {
  //     companyName: "Realty Income Corporation Common Stock",
  //     symbol: "O",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.2555,
  //     indicated_Annual_Dividend: 3.066,
  //     announcement_Date: "8/15/2023",
  //   },
  //   {
  //     companyName: "Regions Financial Corporation Common Stock",
  //     symbol: "RF",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.24,
  //     indicated_Annual_Dividend: 0.96,
  //     announcement_Date: "7/19/2023",
  //   },
  //   {
  //     companyName: "Bank of America Corporation Common Stock",
  //     symbol: "BAC",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.24,
  //     indicated_Annual_Dividend: 0.96,
  //     announcement_Date: "7/19/2023",
  //   },
  //   {
  //     companyName: "General Motors Company Common Stock",
  //     symbol: "GM",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/14/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.09,
  //     indicated_Annual_Dividend: 0.36,
  //     announcement_Date: "7/24/2023",
  //   },
  //   {
  //     companyName: "Fortive Corporation Common Stock ",
  //     symbol: "FTV",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.07,
  //     indicated_Annual_Dividend: 0.28,
  //     announcement_Date: "8/17/2023",
  //   },
  //   {
  //     companyName: "Corteva, Inc. Common Stock ",
  //     symbol: "CTVA",
  //     dividend_Ex_Date: "8/31/2023",
  //     payment_Date: "9/15/2023",
  //     record_Date: "9/01/2023",
  //     dividend_Rate: 0.16,
  //     indicated_Annual_Dividend: 0.64,
  //     announcement_Date: "7/21/2023",
  //   },
  //   {
  //     companyName: "Analog Devices, Inc. Common Stock",
  //     symbol: "ADI",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "9/14/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 0.86,
  //     indicated_Annual_Dividend: 3.44,
  //     announcement_Date: "8/22/2023",
  //   },
  //   {
  //     companyName: "Ross Stores, Inc. Common Stock",
  //     symbol: "ROST",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "9/29/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 0.335,
  //     indicated_Annual_Dividend: 1.34,
  //     announcement_Date: "8/16/2023",
  //   },
  //   {
  //     companyName: "Stanley Black & Decker, Inc. Common Stock",
  //     symbol: "SWK",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "9/19/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 0.81,
  //     indicated_Annual_Dividend: 3.24,
  //     announcement_Date: "7/27/2023",
  //   },
  //   {
  //     companyName: "Nike, Inc. Common Stock",
  //     symbol: "NKE",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 0.34,
  //     indicated_Annual_Dividend: 1.36,
  //     announcement_Date: "8/03/2023",
  //   },
  //   {
  //     companyName: "L3Harris Technologies, Inc. Common Stock",
  //     symbol: "LHX",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "9/19/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 1.14,
  //     indicated_Annual_Dividend: 4.56,
  //     announcement_Date: "7/21/2023",
  //   },
  //   {
  //     companyName: "Brown Forman Inc Class B Common Stock",
  //     symbol: "BF.B",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "10/02/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 0.2055,
  //     indicated_Annual_Dividend: 0.822,
  //     announcement_Date: "7/27/2023",
  //   },
  //   {
  //     companyName: "Linde plc Ordinary Shares",
  //     symbol: "LIN",
  //     dividend_Ex_Date: "9/01/2023",
  //     payment_Date: "9/19/2023",
  //     record_Date: "9/05/2023",
  //     dividend_Rate: 1.275,
  //     indicated_Annual_Dividend: 5.1,
  //     announcement_Date: "7/24/2023",
  //   },
  // ]);
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
      );
      console.log(data.data);

      setDividendsData(data.dividendStocks);
    };
    // fetchStocksData();
    fetchStocksDividends();
  }, []);

  console.log("dividends ", dividendsData);

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
        <div className="dividend-container">
          {dividendsData && dividendsData.length > 0 ? (
            dividendsData.map((stock) => (
              <div
                className="dividend-card"
                key={stock.companyName}
                // onClick={() =>
                //   router.push(`/${encodeURIComponent(stock.symbol)}`)
                // }
                >
                <h1 className="dividend-card_venue">{stock.symbol}</h1>
                <p className="dividend-card_date">Company Name: {stock.companyName}</p>
                <p className="dividend-card_date">Dividend ExDate : {convertUsDateToEuropeDate(stock.dividend_Ex_Date)}</p>
                <p className="dividend-card_date">Payment Date : {convertUsDateToEuropeDate(stock.payment_Date)}</p>
                <p className="dividend-card_date">Record Date: {convertUsDateToEuropeDate(stock.record_Date)}</p>
                <p className="dividend-card_date">Dividend Rate: {stock.dividend_Rate}</p>
                <p className="dividend-card_date">Indicated Annual Dividend: {stock.indicated_Annual_Dividend}</p>
                <p className="dividend-card_date">Announcement Date: {convertUsDateToEuropeDate(stock.announcement_Date)}</p>
              </div>
            ))
          ) : (
            <CoinLoader />
          )}
        </div>
      </div>
    </main>
  );
};

export default StockDash;

// //         {stocksData && stocksData.length > 0 ? (
//   stocksData.map((stock) => (
//     <div
//       className="race-card"
//       key={stock.company_name}
//       onClick={() =>
//         router.push(`/${encodeURIComponent(stock.ticker)}`)
//       }
//     >
//       <p className="race-card_date">{stock.company_name}</p>
//       <h1 className="race-card_venue">{stock.ticker}</h1>
//       <h2 className="race-card_venue">{stock.sector}</h2>
//       {/* <img className="logo" src={aapl}></img> */}
//       <Image
//         className="logo"
//         alt="logo"
//         src={`static/images/stockLogos/${stock.ticker.toLocaleLowerCase()}.svg`}
//       />
//     </div>
//   ))
// ) : (
//   <CoinLoader />
// )}
