import React, { Component } from "react";
import mapboxgl from 'mapbox-gl';
import { BrowserView } from "react-device-detect";
import logo from '../../images/simple_logo.png';

const MapboxAccessToken = "pk.eyJ1Ijoiam9zaHVhamFtZXNoZWxsIiwiYSI6ImNrN2kzcHJscjBjM3kzZnByZTg3MWE1aHkifQ.ux_g44SHiS6gYkPJG1Rltw";
mapboxgl.accessToken = MapboxAccessToken;

const styles = {
    infoBox: {
        position: 'relative',
        float: 'left',
        zIndex: 20,
        padding: 10,
        marginBottom: -60,
        marginLeft: 15,
        backgroundColor: 'white',
        border: '1px solid #505050'
    },
    mapBox: {
        position: 'relative',
        float: 'left',
        width: '100%',
        height: '100%'
    }
};

export default class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -1.6530447,
            lat: 53.5914512,
            zoom: 14,
            ctrl: false,
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });
        map.scrollZoom.disable();

        map.on('load', function() {
            map.loadImage(
                logo,
                function(error, image) {

                    document.addEventListener("keydown", event => {
                        if (event.code === 'ControlLeft' || event.code === 'Control')  {
                            map.scrollZoom.enable(true);
                        }
                    });
                    document.addEventListener("keyup", event => {
                        if (event.code === 'ControlLeft' || event.code === 'Control')  {
                            map.scrollZoom.disable();
                        }
                    });


                    if (error) throw error;
                    map.addImage('marker', image);
                    map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [-1.6530447, 53.5914512]
                                    }
                                }
                            ]
                        }
                    });
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'marker',
                            'icon-size': 0.1
                        }
                    });
                });
        });
    }

    render() {
        return (
            <>
                <BrowserView>
                    <p style={styles.infoBox}>{"CTRL to Zoom"}</p>
                </BrowserView>

                <div
                    style={styles.mapBox}
                    ref={el => this.mapContainer = el}
                />
            </>

        )
    }
}
