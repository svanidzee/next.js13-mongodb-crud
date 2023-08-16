import { MongoClient, ObjectId } from 'mongodb';
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

export async function POST(request) {
  let body = await request.json();
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    const database = client.db('test');
    const collection = database.collection('test1');
    const product = await collection.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } finally {
    await client.close();
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  console.log(id);

  const uri =
    'mongodb+srv://svanidzee:NJdEMpx71B5FSxMh@cluster0.ex1531c.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    const database = client.db('test');
    const test1 = database.collection('test1');

    await test1.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
  } finally {
    await client.close();
  }
}
