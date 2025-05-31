import {User} from "@/app/models/User";
import mongoose from "mongoose";
import {connectMongoDB} from "@/lib/mongodb";

export async function POST(req) {
    try {
        await connectMongoDB();
        console.log("MongoDB connected:", mongoose.connection.readyState);
        const body = await req.json();
        const { email, name, surname, middlename, town, street, house, apartment, phoneNumber, birthdate } = body;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    "userdata.name": name,
                    "userdata.surname": surname,
                    "userdata.middlename": middlename,
                    "userdata.birthdate": birthdate,
                    "userdata.town": town,
                    "userdata.street": street,
                    "userdata.house": house,
                    "userdata.apartment": apartment,
                    "userdata.phoneNumber": phoneNumber
                }
            },
            { new: true })
        console.log("Обновленные данные пользователя:", updatedUser);

        if (!updatedUser) {
            return new Response(JSON.stringify({ message: 'Пользователь не найден' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }



        return new Response(JSON.stringify({
            message: 'Данные успешно обновлены',
            user: updatedUser
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        return new Response(JSON.stringify({
            message: 'Ошибка сервера',
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}