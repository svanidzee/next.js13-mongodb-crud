import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db('test');
    const collection = database.collection('test1');
    const query = {};
    const product = await collection.find(query).toArray();
    return NextResponse.json({ success: true, product });
  } finally {
    await client.close();
  }
}
