// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { YMaps, Map, ZoomControl, GeolocationControl } from "react-yandex-maps";
// import axios from "axios";
// import {
//   getCity,
//   fetchCreateAddress,
//   setSelectedMapAddressName,
//   setLongitude,
//   setLatitude,
// } from "../../redux/actions/User";
// import { setVenueLimit } from "../../redux/actions/Menus";
// import LocationIconStolik from "@assets/LocationIconStolik.png";
// import { coordinates } from "@assets/js/polygondata";
// import { config } from "../../config";
// import {
//   Cross,
//   MapImg,
//   CrossEl,
//   BorderMdal,
//   OneAddress,
//   ButtonClear,
//   ModalWrapper,
//   ModalContainer,
//   AddressListItem,
//   ButtonContainer,
//   YandexSearchInput,
//   ContentAddressMap,
//   SetAddresContainer,
//   MobileSelecteButton,
//   ContainerAddressMap,
//   YandexSearchAddressList,
// } from "./styles";

// const defaultToshkentAddress = [41.32847446609404, 69.24298268717716];

// const ModalMakeOrder = ({ isTheMapOpen, setIsTheMapOpen }) => {
//   const modalRef = useRef(null);
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

//   const lon = useSelector(({ User }) => User.lon);
//   const lat = useSelector(({ User }) => User.lat);
//   const token = useSelector(({ User }) => User.token);
//   const tokenType = useSelector(({ User }) => User.tokenType);

//   const [yandexRef, setYandexRef] = useState(null);
//   const [addressLatAndLon, setAddressLatAndLon] = useState({lon: null, lat: null});
//   const [searchAddressList, setSearchaddressList] = useState(null);
//   const [searchAddress, setSearchAddress] = useState("");
//   const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);

//   const [isborderErrorBlock, setIsBorderErrorBlock] = useState(false);
//   const [sellectAdress, setSellectAdress] = useState(false);
//   const [confirmTheSelectedAddress, setConfirmTheSelectedAddress] = useState(false);
//   const [mapAddress, setMapAddress] = useState(() => {
//     let mapData = localStorage.getItem("map");
//     if (mapData) {
//       mapData = JSON.parse(mapData);
//       return {
//         name: mapData.name,
//         building: mapData.building,
//         podez: mapData.podez,
//         floor: mapData.floor,
//         apartment: mapData.apartment,
//       };
//     } else
//       return {
//         name: "",
//         podez: "",
//         building: "",
//         floor: "",
//         apartment: "",
//       };
//   });

//   const [widthAndHight, setWidthAndHight] = useState({
//     width: window.innerWidth < 769 ? 100 : 60,
//     height: window.innerWidth < 769 ? 90 : 62,
//   });

//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       const element = document.getElementById("my-new-map158");
//       if (element)
//         element.addEventListener("touchmove", (event) => {
//           setSellectAdress(false);
//           setConfirmTheSelectedAddress(false);
//         });
//     }
//   }, [document.getElementById("my-new-map158")]);

//   useEffect(() => {
//     window.addEventListener("resize", (props) => {
//       if (window.innerWidth < 769) setWidthAndHight({ width: 100, height: 90 });
//       else setWidthAndHight({ width: 60, height: 62 });
//     });

//     const handle = (event:any) => {
//       if (typeof event.target.dataset.trash !== "undefined") return;
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         setIsTheMapOpen(false);
//       }
//     };
//     document.removeEventListener("click", handle, true);
//     document.addEventListener("click", handle);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const timeOutId = setTimeout(() => {
//       if (searchAddress) {
//         fetchYandexAddressSearch(searchAddress);
//       }
//     }, 1000);
//     return () => clearTimeout(timeOutId);
//   }, [searchAddress]);
//   [Forwarded from Ahror Yuldoshev]
// const fetchYandexAddressName = (lat, lon) => {
//     axios.get(https://geocode-maps.yandex.ru/1.x?apikey=${config.YANDEX_MAP_KEY}&format=json&geocode=${lat},${lon})
//       .then((res) =>setMapAddress({...mapAddress,name: res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name}))
//   };

//   const fetchYandexAddressSearch = (searchName) => {
//     const newSearchName = "Ташкент, " + searchName;
//     axios.get(https://geocode-maps.yandex.ru/1.x?apikey=${config.YANDEX_MAP_KEY}&format=json&geocode=${newSearchName})
//       .then((res) => setSearchaddressList(res.data.response.GeoObjectCollection.featureMember.slice(0, 5)))
//   };

//   // full address set
//   const handleSendAddress = () => {
//     if (isBorder([addressLatAndLon.lat, addressLatAndLon.lon])) {
//       window.localStorage.setItem(
//         "map",
//         JSON.stringify({ ...mapAddress, ...addressLatAndLon })
//       );
//       localStorage.setItem("current-address", JSON.stringify(addressLatAndLon));
//       dispatch(setSelectedMapAddressName(mapAddress.name));
//       setIsTheMapOpen(false);
//       dispatch(getCity(addressLatAndLon.lon, addressLatAndLon.lat));
//       dispatch(setLongitude(addressLatAndLon.lon));
//       dispatch(setLatitude(addressLatAndLon.lat));
//       dispatch(setVenueLimit(12));
//       if (token && tokenType === "USER") {
//         const stringName = ${mapAddress.name}, Дом: ${mapAddress.building}, Код двери: ${mapAddress.podez}, Этаж: ${mapAddress.apartment}, Квартира: ${mapAddress.floor};
//         dispatch(fetchCreateAddress({ name: stringName, ...addressLatAndLon }));
//       }
//     }
//   };

//   // input address change
//   const hundleAdressChange = (event) => {
//     setMapAddress({
//       ...mapAddress,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const isBorder = (latAndlon) => {
//     let i = 0;
//     let j = coordinates.length - 1;
//     let result = false;
//     while (i < coordinates.length) {
//       if (
//         coordinates[i][0] > latAndlon[1] !== coordinates[j][0] > latAndlon[1] &&
//         latAndlon[0] <
//           ((coordinates[j][1] - coordinates[i][1]) *
//             (latAndlon[1] - coordinates[i][0])) /
//             (coordinates[j][0] - coordinates[i][0]) +
//             coordinates[i][1]
//       ) {
//         result = !result;
//       }
//       j = i++;
//     }
//     return result;
//   };

//   const onBoundsChange = (e) => {
//     const latAndlot = e.get("target").getCenter();
//     fetchYandexAddressName(latAndlot[1], latAndlot[0]);
//     if (isBorder(latAndlot)) setIsBorderErrorBlock(false);
//     else setIsBorderErrorBlock(true);
//     setAddressLatAndLon({ lon: latAndlot[1], lat: latAndlot[0] });
//   };

//   const searchSelectedAddress = (item) => {
//     setSearchAddress(item.GeoObject.name);
//     const coordinates = item.GeoObject.Point.pos.split(" ");
//     yandexRef.setCenter([coordinates[1], coordinates[0]], 18);
//     setIsSearchInputFocus(false);
//   };
//   [Forwarded from Ahror Yuldoshev]
//   return (
//       <ModalWrapper modal={isTheMapOpen}>
//         <ModalContainer modal={isTheMapOpen} ref={modalRef}>
//           <Cross onClick={() => setIsTheMapOpen(false)}>
//             <CrossEl style={{ transform: "rotate(45deg)" }} />
//             <CrossEl style={{ transform: "rotate(-45deg) translate(2px, -1px)" }}/>
//           </Cross>
//           <div style={{ position: "relative", }}>
//             <YandexSearchInput
//               visibled={true}
//               placeholder={t("map.search")}
//               onChange={(e) => {
//                 if (!e.target.value) setSearchaddressList(null);
//                 setSearchAddress(e.target.value);
//               }}
//               onFocus={() => setIsSearchInputFocus(true)}
//               value={searchAddress}
//             />
//             <YandexSearchAddressList disabled={!(searchAddressList && isSearchInputFocus)}>
//               {searchAddressList &&
//                 searchAddressList.map((item) => (
//                   <AddressListItem
//                     onClick={() => searchSelectedAddress(item)}
//                   >{${item.GeoObject.name}}</AddressListItem>
//                 ))}
//             </YandexSearchAddressList>
//             <YMaps
//               query={{
//                 load: "Map,control.GeolocationControl",
//                 apikey: config.YANDEX_MAP_KEY,
//               }}
//             >
//               <Map
//                 id="my-new-map158"
//                 width={${widthAndHight.width}vw}
//                 height={${widthAndHight.height}vh}
//                 instanceRef={(ref) => setYandexRef(ref)}
//                 defaultState={{
//                   center: lat && lon ? [lat, lon] : defaultToshkentAddress,
//                   zoom: 16,
//                 }}
//                 onBoundsChange={onBoundsChange}
//               >
//                 <MapImg
//                   none={confirmTheSelectedAddress && window.innerWidth < 769}
//                   src={LocationIconStolik}
//                 />
//                 <BorderMdal block={isborderErrorBlock}>
//                   {t("map.borderModalErr")}
//                 </BorderMdal>
//                 <GeolocationControl />
//                 <ZoomControl options={{ float: "right" }} />
//               </Map>
//             </YMaps>
//           </div>

//           <ContainerAddressMap sellectAdress={confirmTheSelectedAddress}>
//             <MobileSelecteButton
//               enabled={
//                 widthAndHight.width === 100 &&
//                 !confirmTheSelectedAddress &&
//                 !isborderErrorBlock
//               }
//               onClick={() => setConfirmTheSelectedAddress(true)}
//             >
//               {t("map.mobileButton")}
//             </MobileSelecteButton>
//             <div className="my-map-1234567">
//               <ContentAddressMap sellectAdress={sellectAdress}>
//                 <div className="my__container">
//                   <div className="my__blockmobile">
//                     <div>
//                       {mapAddress.name ? t("map.isName") : t("map.isNotName")}
//                     </div>
//                   </div>
//                   <div className="my__content">
//                     <div>
//                       <div>
//                         <input
//                           disabled={
//                             widthAndHight.width === 100 &&
//                             !confirmTheSelectedAddress
//                           }
//                           value={mapAddress.name}
//                           onChange={hundleAdressChange}
//                           name="name"
//                           type="text"
//                           placeholder={t("map.namePlaceholder")}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </ContentAddressMap>
//               [Forwarded from Ahror Yuldoshev]
// <SetAddresContainer>
//               <OneAddress>
//                 <div>
//                   <p>{t("map.home")}</p>
//                 </div>
//                 <div>
//                   <input
//                     value={mapAddress.building}
//                     type="number"
//                     name="building"
//                     onChange={hundleAdressChange}
//                   />
//                 </div>
//               </OneAddress>
//               <OneAddress>
//                 <div>
//                   <p>{t("map.entranceCode")}</p>
//                 </div>
//                 <div>
//                   <input
//                     value={mapAddress.podez}
//                     type="number"
//                     name="podez"
//                     onChange={hundleAdressChange}
//                   />
//                 </div>
//               </OneAddress>
//               <OneAddress>
//                 <div>
//                   <p>{t("map.floor")}</p>
//                 </div>
//                 <div>
//                   <input
//                     value={mapAddress.floor}
//                     type="number"
//                     name="floor"
//                     onChange={hundleAdressChange}
//                   />
//                 </div>
//               </OneAddress>
//               <OneAddress>
//                 <div>
//                   <p>{t("map.apartment")}</p>
//                 </div>
//                 <div>
//                   <input
//                     value={mapAddress.apartment}
//                     type="number"
//                     name="apartment"
//                     onChange={hundleAdressChange}
//                   />
//                 </div>
//               </OneAddress>
//             </SetAddresContainer>
//             <ButtonContainer>
//               <ButtonClear
//                 disabled={!isBorder([addressLatAndLon.lat, addressLatAndLon.lon])}
//                 onClick={handleSendAddress}
//               >
//                 {t("map.add")}
//               </ButtonClear>
//             </ButtonContainer>
//           </div>
//         </ContainerAddressMap>
//       </ModalContainer>
//     </ModalWrapper>
//   );
// };

// export default ModalMakeOrder;
import React from 'react';

const OrdersPage = () => {
  return <div></div>;
};

export default OrdersPage;
