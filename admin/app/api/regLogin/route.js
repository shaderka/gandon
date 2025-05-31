import {connectMongoDB} from "@/lib/mongodb";
import {User} from "../../models/User"
export async function POST(req) {
    try {
        const { email, password } = await req.json();
        await connectMongoDB();


        const user = await User.findOne({ email });

        if (!user) {
            return Response.json(
                { message: "Пользователь не найден" },
                { status: 404 }
            );
        }


        if (user.password !== password) {
            return Response.json(
                { message: "Неверный пароль" },
                { status: 401 }
            );
        }

        const { password: _, ...userData } = user.toObject();
        return Response.json({ user: userData });

    } catch (error) {
        console.error("Ошибка при входе:", error);
        return Response.json(
            { message: "Произошла ошибка при авторизации" },
            { status: 500 }
        );
    }
}