import React from 'react';
import styles from './styles.module.css';
import InteractiveMap from '../../components/InteractiveMap';
import { OpeningTimes } from "./openingTimes";
import window from '../../images/window.jpeg';

const directionsLink = "https://www.google.co.uk/maps/place/The+Coffee+Mill+%26+Cakes/@53.5910664,-1.6532915,17z/data=!4m5!3m4!1s0x487bd87c67fc0001:0x5bdd0dbaaf472c72!8m2!3d53.5913912!4d-1.6530447";

// Location is the page holding the geography & opening time information.
// Each day's opening time & an interactive map is rendered on this page
class Location extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <img src={window} alt={"window"} className={styles.header_image}/>

                <h1 className={styles.title}>{"Hours & Location"}</h1>

                <div className={styles.table_container}>
                    {OpeningTimes.map((day) => {
                        return (
                            <div key={day.day} className={styles.table_row}>
                                <p className={styles.table_column}>{day.day}</p>

                                {(day.open === "" || day.closed === "") ?
                                    <p className={styles.table_double_column}>{"Closed"}</p>
                                    :
                                    <>
                                        <p className={styles.table_column}>{day.open}</p>
                                        <p className={styles.table_column}>{day.closed}</p>
                                    </>
                                }

                            </div>
                        );
                    })}
                </div>

                <div style={{height: '75vh'}}>
                    <InteractiveMap/>
                </div>

                <a
                    className={styles.text}
                    href={directionsLink}
                    target={"_blank"}
                    rel={"noreferrer"}
                >{"Get Directions"}</a>

            </div>
        );
    }
}

export default (Location);
