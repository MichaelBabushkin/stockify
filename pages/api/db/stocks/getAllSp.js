import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const client = await db.connect();
    //TODO: change it to dedicated stock db later
    const { rows } = await client.sql`SELECT Brand_name FROM logos;`;
    let spStocksArr = [];
    rows.map(row => spStocksArr.push( row.brand_name )) 
    res.status(200).json({ spStocksArr })
}catch(error){
  res.status(404).json({ error })
}
}