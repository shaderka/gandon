import { connectMongoDB } from "@/lib/mongodb";
import {User} from  "../../models/User"

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        await connectMongoDB();

        const newUser = new User({ name, email, password });
        await newUser.save();

        return Response.json({ success: true });
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        return Response.json({ success: false, message: "Данный пользователь уже существует!" }, { status: 500 });
    }
}