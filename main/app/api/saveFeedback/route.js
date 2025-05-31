import { connectMongoDB } from '@/lib/mongodb';
import { Feedback } from '../../models/Feedbacks'; // Импортируем модель

export async function POST(req) {
    try {
        const { feedback} = await req.json();


        if (!feedback || typeof feedback !== 'string') {
            return new Response(JSON.stringify({
                error: 'Valid feedback text is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }


        await connectMongoDB();


        const newFeedback = new Feedback({

            feedback : feedback.trim()
        });

        const savedFeedback = await newFeedback.save();


        return new Response(JSON.stringify({
            success: true,
            message: 'Feedback saved successfully',
            data: savedFeedback,
            id: savedFeedback._id
        }), {
            status: 201, // Используем 201 для созданных ресурсов
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error saving feedback:', error);
        return new Response(JSON.stringify({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}