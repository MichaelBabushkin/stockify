import axios from "axios";
import cheerio from "cheerio";
import { db } from '@vercel/postgres';
import imageDownloader from '../../helpers/imageDownloader';

const fs = require('fs');

const getUrl = `https://topforeignstocks.com/indices/components-of-the-sp-500-index`;


async function  saveStockName (stockArr) {
  const client = await db.connect();

stockArr.forEach(stock => {
  let name = stock.ticker.toLowerCase();
  const imageUrl = `https://hellostake.com/api/us/instrument/logo/${name}.svg`;
  const imageName = `public/static/images/stockLogos/${name}.svg`;
  try {
    let logoSVG
    if (fs.existsSync(imageName) ) {
       logoSVG = fs.readFileSync(imageName,'utf8')
    }
    else{
       logoSVG = fs.readFileSync(imageDownloader(imageName),'utf8')
      }
      const { rows } = client.sql`INSERT INTO logos (BRAND_NAME,BRAND_SVG)
      SELECT ${name}, ${logoSVG} WHERE NOT EXISTS(
        SELECT BRAND_NAME from logos 
        WHERE BRAND_NAME = ${name}
      );`;
      
  //      axios.post(`http://localhost:3000/api/db/logo/addLogo`, {
  //       brand_name: name,
  //       brand_svg:logoSVG,
  //       headers: {
  //           'Content-type': 'application/json',
  //       },
  
  // }).then(response =>{
  //     console.log(name)
  //   return
  //   })
  
  
    
  
  } catch(err) {
    console.error(err)
  }
 


});

 
}

export default async function handler(
  req,
  res
) {
  try {

    const { data } = await axios.get(getUrl);

    // Use Cheerio to parse the HTML
    const $ = cheerio.load(data);
    // Select the table element
    const table = $("table");

    // Initialize an empty array to store the table data
    const tableData = [];

    // Iterate over each row of the table using the find and each methods
    table.find("tr").each((i, row) => {
      // Initialize an empty object to store the row data
      const rowData = {};
      if (i != 0) {
        // Iterate over each cell of the row using the find and each methods
        $(row)
          .find("td, th")
          .each((j, cell) => {
            // Add the cell data to the row data object
            if (j === 1) rowData["company_name"] = $(cell).text();
            if (j === 2){
              rowData["ticker"] = $(cell).text();
            } 
            if (j === 3) rowData["sector"] = $(cell).text();
            

          });

        // Add the row data to the table data array
        tableData.push(rowData);
        
      }
    });

    saveStockName(tableData)
    
    res.status(200).json({ scheduleData: tableData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching schedule");
  }
}
