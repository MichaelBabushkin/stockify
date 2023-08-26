import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    try {
      const client = await db.connect();
      const stockToDelete = req.query.stock ;
      console.log( req.query.stock);
      const { rows } = await client.sql`DELETE FROM logos WHERE logos.BRAND_NAME = ${stockToDelete};`;
          res.status(200).json({ name:rows })
  }catch(error){
    res.status(500).json({ error })
  }
  }