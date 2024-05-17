import React from "react";
import styles from "@/app/page.module.scss";

const Links = ({setModal}) => {
    return (
        <div className={styles.grid}>
            <div
                className={styles.card}
                onClick={() => setModal('city')}
            >
                <h2>
                    Змінити місто <span>-&gt;</span>
                </h2>
                <p>Оберіть місто, у якому зацікавлені в потриманні допомоги</p>
            </div>

            <div
                className={styles.card}
                onClick={() => setModal('contacts')}
            >
                <h2>
                    Контакти <span>-&gt;</span>
                </h2>
                <p>
                    Отримайте контакти розробників платформи
                </p>
            </div>
        </div>
    )
};

export default Links;
