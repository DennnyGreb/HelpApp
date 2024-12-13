'use client';

import React from "react";
import { getAiResponse } from '@/app/actions';
import Markdown from "react-markdown";
import Button from '@mui/material/Button';
import styles from "@/app/page.module.scss";
import {TextField, Card, CardContent, Typography} from '@mui/material';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true });

const HelpChat = ({}) => {
    const [question, setQuestion] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [pastQuestions, setPastQuestions] = React.useState([]);

    const askAi = async () => {
        setResponse('');
        setQuestion('');
        setPastQuestions(p => [...p, question]);
        if (question?.length > 5) {
            const stream = await openai.chat.completions.create({
                messages: [{role: 'user', content: `Дай відповідь на запитання від внутрішньо переміщеної особи в Україні, 
                    що постраждала від війни. Потрібно взяти до уваги контекст української благодійності, отримання допомоги, 
                    волонтерських центрів і центрів незламності. 
                    Ось попередні запитання: ${pastQuestions.join(', ')}.
                    Ось запитання: ${question}. Відповідь повинна короткою і практичною, по-можливості з адресами чи контактними даними.`}],
                model: 'gpt-4o-mini',
                stream: true,
            });
            for await (const chunk of stream) {
                setResponse(res => res+=(chunk.choices[0]?.delta?.content || ""));
            }
        }
    };

    return (
        <div className={styles.helpChat}>
            <div className={styles.titleContainer}>
                <p>Задайте запитання про  для ШІ-асистента</p>
            </div>
            <div className={styles.searchField}>
                <TextField
                    className={styles.input}
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <Button onClick={askAi}>Запитати</Button>
            </div>
            {!!pastQuestions?.length && (
                <div className={styles.questionCardContainer}>
                {pastQuestions.map((q, i) => (
                        <Card key={q} className={styles.questionCard}>
                            <CardContent>
                                <Typography key={i}>{q}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {response && (
                <Card className={styles.responseCard}>
                    <CardContent>
                        <Markdown>{response}</Markdown>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default HelpChat;
