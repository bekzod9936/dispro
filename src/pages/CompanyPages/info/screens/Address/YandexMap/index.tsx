import { YMaps, ZoomControl, Placemark, Map } from "react-yandex-maps";

interface Props {
  onBoundsChange?: any;
  handleRef?: (e: any) => void;
  place?: any;
  onClickPlaceMark?: (e: any) => void;
  onClickLocation?: (lat: any, lng: any) => void;
  placeOptions?: any[];
}

const YandexMap = ({
  onBoundsChange,
  handleRef = () => {},
  place,
  onClickPlaceMark = () => {},
  placeOptions = [],
}: Props) => {
  const defaultToshkentAddress = [41.32847446609404, 69.24298268717716];

  const handlePlaceMark = (e: any) => {
    onClickPlaceMark(e);
  };

  return (
    <YMaps
      query={{
        ns: "use-load-option",
        apikey: "fd83ecfe-efaa-4ff2-b7ce-1bd8cac8f127",
        load: "Map,control.GeolocationControl,control.FullscreenControl",
      }}
    >
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        defaultState={{
          center: defaultToshkentAddress,
          zoom: 11,
        }}
        instanceRef={(ref: any) => {
          handleRef(ref);
        }}
        onBoundsChange={onBoundsChange}
        onClick={handlePlaceMark}
      >
        {place?.length !== 0 ? (
          <Placemark
            geometry={place}
            options={{
              iconColor: "#606EEA",
            }}
          />
        ) : (
          placeOptions.map((v: any) => {
            return (
              <Placemark
                geometry={[v.lat, v.lng]}
                properties={{
                  balloonContent: v.address,
                  id: v.lat,
                }}
                modules={["geoObject.addon.balloon"]}
                options={{
                  iconColor: "#606EEA",
                }}
              />
            );
          })
        )}
        <ZoomControl options={{ float: "right" }} />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
