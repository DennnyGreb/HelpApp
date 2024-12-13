'use server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function getAiResponse(message) {
    return openai.chat.completions.create({
        messages: [{role: 'user', content: `Дай відповідь на запитання від внутрішньо переміщеної особи в Україні, 
        що постраждала від війни. Потрібно взяти до уваги контекст української благодійності, отримання допомоги, 
        волонтерських центрів і центрів незламності. Ось запитання: ${message}. Відповідь повинна короткою і практичною.`}],
        model: 'gpt-4o-mini'
    });
}