import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const client = await db.connect();
    const { rows } = await client.sql`SELECT * FROM logos;`;
    res.status(200).json({ name:rows })
}catch(error){
  res.status(404).json({ error })
}
}