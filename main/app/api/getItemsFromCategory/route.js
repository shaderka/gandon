import { connectMongoDB } from '@/lib/mongodb'
import { Category } from '@/app/models/Category'
import {Item} from "@/app/models/Item"
export async function POST(req) {
    try {
        const { catId } = await req.json();

        if (!catId) {
            return Response.json(
                { error: "Не указан catId" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const items = await Item.find({ category: catId }).lean();

        if (!items || items.length === 0) {
            return Response.json(
                {
                    message: "Товары не найдены",
                    items: []
                },
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                items
            },

            { status: 200 }
        );

    } catch (error) {
        console.error("Ошибка при получении товаров:", error);
        return Response.json(
            {
                error: "Внутренняя ошибка сервера",
                details: error.message
            },
            { status: 500 }
        );
    }
}