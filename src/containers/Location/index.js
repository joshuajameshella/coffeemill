import React from 'react';
import styles from './styles.module.css';
import InteractiveMap from '../../components/InteractiveMap';
import { OpeningTimes } from "./openingTimes";
import window from '../../images/window.jpeg';

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
            </div>
        );
    }
}

export default (Location);
