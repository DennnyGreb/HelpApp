import Image from "next/image";
import ClientMap from '@/components/Map';
import HelpChat from '@/components/HelpChat';
import styles from "./page.module.scss";
import {Card, CardActions, CardContent, Typography, Button} from "@mui/material";

export default function Home() {
    return (
        <div className={styles.mainLinks}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        ШІ-асистент
                    </Typography>
                    <Typography variant="body2">
                        Допоможе знайти точки благодійної допомоги
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={'/advisor'} size="small">До асистена</Button>
                </CardActions>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Карта допомоги
                    </Typography>
                    <Typography variant="body2">
                        Інтерактивна карта з точками благодійної допомоги
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button href={'/map'} size="small">До карти</Button>
                </CardActions>
            </Card>
        </div>
    );
}
