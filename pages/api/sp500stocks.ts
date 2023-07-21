import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";
import { syncWriteFile,asyncWriteFile } from "../../helpers/fileReadWrite";

const https = require('https');
const fs = require('fs');

const getUrl = `https://topforeignstocks.com/indices/components-of-the-sp-500-index`;


const saveImage = (name: string) => {
  const imageUrl = `https://hellostake.com/api/us/instrument/logo/${name}.svg`;
  const imageName = `public/static/images/stockLogos/${name}.svg`;
  
  try {
    if (fs.existsSync(imageName)) {
      console.log("file exists");
      return
    }
  } catch(err) {
    console.error(err)
  }


  const file = fs.createWriteStream(imageName);
  
  https.get(imageUrl, response => {
    response.pipe(file);
  
    file.on('finish', () => {
      file.close();
      console.log(`Image downloaded as ${imageName}`);
    });
  }).on('error', err => {
    fs.unlink(imageName);
    console.error(`Error downloading image: ${err.message}`);
  });
}

export default async function getSchedule(
  req: NextApiRequest,
  res: NextApiResponse
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
              saveImage($(cell).text().toLocaleLowerCase())
            } 
            if (j === 3) rowData["sector"] = $(cell).text();
            

          });

        // Add the row data to the table data array
        tableData.push(rowData);
      }
    });
    
    asyncWriteFile("test",'test text')
    res.status(200).json({ scheduleData: tableData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching schedule");
  }
}
