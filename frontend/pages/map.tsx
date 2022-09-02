import { addIndoorTo, IndoorMap } from "map-gl-indoor";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Map, { Layer, LayerProps, Source } from 'react-map-gl';
import LevelSelector from "../components/map/levelSelector";

const MapView: NextPage = () => {
    const router = useRouter();
    const { q } = router.query;
    const [map, setMap] = useState<IndoorMap>();
useEffect(() => {
            fetch('/test1.geojson').then(res => res.json()).then(data => {

                const indoor = IndoorMap.fromGeojson(data);
                setMap(indoor);
                    console.log(map?.geojson)
            }).catch(err => {
                console.log(err);
            }
            )
    }, []);
    useEffect(() => {
        if (q) {
            console.log(q);
        }
    }, [q]);

    const layerStyle: LayerProps = {
        id: 'vvvs',
        type: 'fill',
        paint: {
            'fill-color': '#ff0000',
            'fill-opacity': 0.2,
            "fill-outline-color": "#0f0"
        }
        
    };


    const [selectedLevel, setSelectedLevel] = useState<string>("0");
    return (
        <div className="flex-1 flex flex-col relative">
            <div className=" absolute z-50  top-20 flex justify-center w-full px-10">
            <div className=" py-5 px-5 bg-white  rounded-lg shadow-md ">
                <h1>
                    This feature is still in development, right now it only shows a map of the campus with no functionality or rooms
                </h1>
                </div>
            </div>
            {
                map && (
                    <Map
                        onClick={(e) => { console.log(e) }}
                initialViewState={{
                    latitude: 59.618808,
                    longitude: 16.541037,
                    zoom: 18
                }}
                style={{
                    flexGrow: 1,
                    display: 'block',
                }}
                attributionControl={false}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={"pk.eyJ1IjoiYXhkcmEiLCJhIjoiY2t6dmh2ZmltMDM1NTJvczk1MnI5c2UyMSJ9.HZh3hWr1hpzzdQieKwpKpw"}
            >
                        <Source id="test" type="geojson" data={map.geojson}>
                            <Layer {...layerStyle} />
              
                        </Source>
            </Map>
            )}
            <div className="absolute  h-full w-full pointer-events-none p-3">
                <input type="text" className="bg-white border  text-orange pointer-events-auto rounded-full shadow-md shadow-neutral-400/10 px-5 focus:ring-orange-500  focus:border-orange-500 border-gray-200 " placeholder="Search Room" />
                <div className="absolute  bottom-3">
                    <LevelSelector levels={['2', '1', '0']} currentLevel={selectedLevel} onLevelSelect={(level) => setSelectedLevel(level)}/>
                </div>

            </div>
        </div>
    );
}
    
export default MapView;