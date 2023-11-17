import React from "react";
import StockTable from "../../components/table/StockTable";

let data = [
  {
    id: 1,
    name: "Jordyn Friesen",
    firstName: "Jordyn",
    lastName: "Friesen",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/562.jpg",
    city: "New Rhett",
    street: "Hahn Pike",
    postcode: "66334",
    email: "Michael.White4@gmail.com",
    phone: "457.438.1900 x922",
    gender: "male",
    age: 26,
    stars: 5291,
    followers: 3097,
    rating: 3,
    progress: 81,
    amount: "47220.44",
    company: "Kuvalis, Kovacek and Wolff",
  },
];

function portfolio() {
  return <StockTable data />;
}

export default portfolio;
