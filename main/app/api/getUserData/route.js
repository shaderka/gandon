import { User } from "@/app/models/User";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(request) {
    try {
        await connectMongoDB();

        const { email } = await request.json();
        const user = await User.findOne({ email }).select('userdata');

        if (!user) {
            return Response.json(
                { message: 'Пользователь не найден' },
                { status: 404 }
            );
        }

        return Response.json({
            userdata: user.userdata || {}
        });

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return Response.json(
            { message: 'Ошибка сервера', error: error.message },
            { status: 500 }
        );
    }
}