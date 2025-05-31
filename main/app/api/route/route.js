import { connectMongoDB } from "@/lib/mongodb";
import { Item } from "../../models/Item"
import { NextResponse } from 'next/server';
import Admin from "@/app/models/Admin";
import {User} from "@/app/models/User";

export async function GET() {
    await connectMongoDB();
    const items = await Item.aggregate([{ $sample: { size: 8 } }]);

  
    return NextResponse.json(items);

}