import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomInput from '../../../components/Custom/CustomInput';
import { Flex } from '../../../styles/BuildingBlocks';
import { CustomButton, ModalComponent, RightSide, UnderSectionButton } from '../../../styles/CustomStyles';
import { LeftWrapper, Papper, RightWrapper } from './InfoPageStyes';
import { Text } from '../../../styles/CustomStyles';
import { useTranslation } from 'react-i18next';
import { AddIcon, CoffeIcon, SaveIcon, SunIcon } from '../../../assets/icons/InfoPageIcons/InfoPageIcons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode"
import { setConstantValue } from 'typescript';
import { Checkbox, FormGroup, Radio, RadioGroup } from '@material-ui/core';
import { useQuery } from 'react-query';
import { fetchAddressInfo } from '../../../services/queries/InfoPageQueries';
import CustomSearchFlexible from '../../../components/Custom/CustomLargeFlexible';
import partnerApi from '../../../services/interceptors/companyInterceptor';
import { setStartDate } from '../../../services/redux/Slices/clientStatistics';
import CustomModal from '../../../components/Custom/CustomModal';
import GoToPhoto from '../../../assets/images/goToPhotos.png'
import { height } from '@material-ui/system';
import { useAppDispatch } from '../../../services/redux/hooks';
import { setCompanyState } from '../../../services/redux/Slices/authSlice';
const inputList = [{
    type: "input",
    name: "address",
    label: "enterLocation",
    aboveInput: "Address",
    notRequired: false,
    aboveLabel: "enterLocationText"
},
{
    type: "input",
    name: "location",
    label: "enterOrientation",
    aboveInput: "addressClarification",
    notRequired: true,
    aboveLabel: "enterOrientationText"
},
{
    type: "input",
    name: "title",
    label: "enterTitle",
    aboveInput: "filialName",
    notRequired: true,
    aboveLabel: "enterTitleText"
},
{
    type: "input",
    name: "phoneNumber",
    label: "phoneNumber",
    aboveInput: null,
    notRequired: false,
    aboveLabel: null
},


]


const days = ["mon", "tue", "wed", "the", "fri", "sat", "san"]


const containerStyle = {
    width: "100%",
    height: '100%'
};

const WORKING_DAYS: any = [
    { day: 1, dayOff: true, wHours: null, bHours: null },
    { day: 2, dayOff: true, wHours: null, bHours: null },
    { day: 3, dayOff: true, wHours: null, bHours: null },
    { day: 4, dayOff: true, wHours: null, bHours: null },
    { day: 5, dayOff: true, wHours: null, bHours: null },
    { day: 6, dayOff: true, wHours: null, bHours: null },
    { day: 6, dayOff: true, wHours: null, bHours: { from: "", to: "" } },
]
interface IAddressSection {
    setSection: any
}

const AddressSection: React.FC<IAddressSection> = ({ setSection }) => {
    let companyId = localStorage.getItem('companyId');
    const [inputListState, setInputListState] = useState(inputList)
    const { t } = useTranslation();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [pickedDay, setPickedDay] = useState("");
    const dispatch = useAppDispatch();
    const [workingHoursState, setWorkinHoursState] = useState<any>(WORKING_DAYS);
    const [currentWHoursS, setCurrentWHourS] = useState<string>("");
    const [currentWHoursE, setCurrentWHourE] = useState<string>("");
    const [currentBHoursS, setCurrentBHourS] = useState<string>("");
    const [currentBHoursE, setCurrentBHourE] = useState<string>("");
    const [listOfAdresses, setlistOfAddresses] = useState<any>([]);
    const [currentFilial, setCurrentFilial] = useState<any>(null);
    const [aroundTheClock, setAroundTheClock] = useState<boolean>(false);
    const [latLang, setLatLang] = useState<any>(null);
    const [permanent, setPermanent] = useState<any>([]);
    const [withRest, setWithRest] = useState(["mon", "tue", "wed", "the", "fri", "sat", "san"]);
    const [addFilialState, setAddFilial] = useState("old");
    const [refetch, setRefetch] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const response = useQuery(["adress", refetch], () => fetchAddressInfo(companyId), {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            // let newTelNumber = {
            //     type: "input",
            //     name: "phoneNumber",
            //     label: "phoneNumber",
            //     aboveInput: null,
            //     notRequired: true,
            //     aboveLabel: null
            // },
            if (data.data.data.length) {
                dispatch(setCompanyState("old"));
            }
            setlistOfAddresses(data.data.data);
            setPermanent(data.data.data);
            if (!data?.data?.data.length) {
                setAddFilial("new");
            }


        }
    })

    const [workHours, setWorkHours] = useState<any>(["mon", "tue", "wed", "the", "fri", "sat", "san"]);
    const [center, setCenter] = useState({
        lat: 41.311081,
        lng: 69.240562
    })
    Geocode.setApiKey("AIzaSyA8nfJOuyd0zwEWyJoKBWJm3JK9UhD3Quw");
    Geocode.setLanguage("ru");
    Geocode.setRegion("uz");

    const onFormSubmit = async (data: any) => {
        let telNumbers = [];
        console.log(data);
        for (let key in data) {
            if (key.includes("phoneNumber") && data[key] !== null) {
                telNumbers.push(data[key]);
            }
        }
        if (addFilialState === "new") {
            await partnerApi.post("/directory/stores", {
                address: data.address0,
                addressDesc: data.location1,
                companyId: companyId,
                location: latLang || currentFilial.location,
                name: data.title2,
                telNumber: telNumbers[0] || "",
                telNumbers: [...telNumbers],
                workingTime: {
                    aroundTheClock: aroundTheClock,
                    work: workingHoursState
                }

            })
        }
        else {
            await partnerApi.put("/directory/company/address", {
                address: data.address0,
                addressDesc: data.location1,
                companyId: companyId,
                location: latLang || currentFilial.location,
                name: data.title2,
                telNumber: telNumbers[0] || "",
                telNumbers: [...telNumbers],
                workingTime: {
                    aroundTheClock: aroundTheClock,
                    work: workingHoursState
                }

            })
        }
        setRefetch(refetch + 1);
        setCurrentFilial(null);
        setAddFilial("old");
        setModalVisible(true);
    }
    const handleMapClick = (e: any) => {
        console.log(e);
        console.log(e.latLng.lat());
        console.log(e.latLng.lng());
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        setLatLang({ lat: lat, lng: lng });
        Geocode.fromLatLng(lat, lng).then(
            (response: any) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                if (address) {
                    setValue('address0', address);
                }
                if (!currentFilial) {
                    setSearchValue(address);
                }


            })
    }
    const handleAddPhoneNumber = () => {
        const newList = [...inputListState, {
            type: "input",
            name: "phoneNumber",
            label: "phoneNumber",
            aboveInput: null,
            notRequired: true,
            aboveLabel: null
        }]
        setInputListState(newList);
    }

    const handleRestChecked = (e: any, checked: boolean, item: string, index: number) => {
        let workingDay = workingHoursState.find((item: any) => item.day === index + 1);
        let copyArray = [...workingHoursState];
        if (workHours.includes(item)) {
            let filteredWorkHour = [...workHours].splice(index, 1);
            setWorkHours(filteredWorkHour);
        }
        if (workingDay) {
            let workingHoursObject = { ...workingDay, dayOff: true, wHours: null, bHours: null }
            copyArray.splice(index, 1, workingHoursObject);
            setWorkinHoursState(copyArray);

        }

        else {
            let workingHoursObject = { day: index + 1, dayOff: true, wHours: null, bHours: null }
            copyArray.push(workingHoursObject);
            setWorkinHoursState(copyArray);
        }



    }


    const checkForRest = (item: string, index: number) => {
        if (workingHoursState[index].dayOff) {
            return true;
        }
        else {
            return false;
        }
    };
    const handleWorkingHourChange = (e: any, item: string, index: number) => {
        if (e.target.name === "workStart") {
            setCurrentWHourS(e.target.value);
        }
        else if (e.target.name === "workEnd") {
            setCurrentWHourE(e.target.value);
        }
    }
    const handleBreakHourChange = (e: any, item: string, index: number) => {
        if (e.target.name === "breakStart") {
            setCurrentBHourS(e.target.value);
        }
        else if (e.target.name === "breakEnd") {
            setCurrentBHourE(e.target.value);
        }
    }
    const handleWorkChecked = (e: any, checked: boolean, item: string, index: number) => {
        let inArray = workHours.includes(item);
        if (checked && !inArray) {
            setWorkHours([...workHours, item]);
        }
        else if (!checked) {
            let filtered = [...workHours].splice(index, 1);
            setWorkHours(filtered);
        }

    }

    const handleCompanyAddressClick = (item: any) => {
        setCurrentFilial(item);
        setWorkinHoursState(item.workingTime.work);
        console.log('clicked!!!');
        // let newArray: any = [];
        // item.telNumbers?.forEach((item: any, index: number) => {
        //     if (index !== 0) {
        //         newArray = [...newArray, {
        //             type: "input",
        //             name: "phoneNumber",
        //             label: "phoneNumber",
        //             aboveInput: null,
        //             notRequired: true,
        //             aboveLabel: null
        //         }];
        //     }

        // })
        // setInputListState([...inputListState, newArray])

        setValue("address0", item.address);
        setValue("location1", item.addressDesc);
        setValue("title2", item.name);
        setValue("phoneNumber3", item.telNumbers[0]);

    }
    const handleRemoveRestClick = (item: string, index: number) => {
        let withoutRest = [...withRest].filter(value => value !== item);
        setCurrentBHourS("");
        setCurrentBHourS("");
        setWithRest(withRest);


    }
    const handleAddRest = (item: string, index: number) => {
        let newWithRest = [...withRest].splice(index, 1, item);
        setWithRest([...newWithRest]);
    }

    const handleApplyForAll = (checked: any, item: string, index: number) => {
        let newWorkingHoursState: any[] = [];
        if (checked) {
            if (workingHoursState.includes(item)) {

                for (let i = 0; i < WORKING_DAYS.length; i++) {
                    let workingHoursObject = { day: i + 1, dayOff: true, wHours: null, bHours: null }
                    newWorkingHoursState = [...newWorkingHoursState, workingHoursObject];

                }
                setWorkinHoursState(newWorkingHoursState);
            }
            else {
                for (let i = 0; i < WORKING_DAYS.length; i++) {
                    let workingHoursObject = { day: i + 1, dayOff: false, wHours: { from: currentWHoursS, to: currentWHoursE }, bHours: { from: currentBHoursS, to: currentBHoursE } }
                    newWorkingHoursState = [...newWorkingHoursState, workingHoursObject];
                }
                setWorkinHoursState(newWorkingHoursState);

            }
        }
    }
    useEffect(() => {

        let searched = [...listOfAdresses]?.filter((item: any) => item.address.toLowerCase().match(searchValue.toLowerCase().trim()))
        if (searchValue !== "") {
            setlistOfAddresses([...searched]);
        }
        else {
            setlistOfAddresses([...permanent]);
        }

    }, [searchValue]);
    const handleDayCLick = (e: any, item: string, index: number) => {
        e.stopPropagation();
        let workingDay = workingHoursState.find((item: any) => item.day === index + 1)
        let copyArray = [...workingHoursState]

        if (pickedDay === item) {
            if (currentWHoursS && currentWHoursE) {
                if (workingDay) {
                    let newObject = {};
                    if (currentBHoursS && currentBHoursE) {
                        newObject = { ...workingDay, wHours: { from: currentWHoursS, to: currentWHoursE }, bHours: { from: currentBHoursS, to: currentBHoursE } }
                    }
                    else {
                        newObject = { ...workingDay, wHours: { from: currentWHoursS, to: currentWHoursE }, bHours: null }
                    }

                    copyArray.splice(index, 1, { ...newObject });
                    setWorkinHoursState(copyArray);
                    setPickedDay("");
                    setCurrentWHourE("");
                    setCurrentWHourS("");

                }
            }
            else {
                setPickedDay("");
            }
        }
        else {
            setPickedDay(item);
        }
    }
    const searchFilial = (e: any) => {
        let temp = listOfAdresses
        setSearchValue(e.target.value);
        let searched = [...listOfAdresses]?.filter((item: any) => item.address.toLowerCase().match(searchValue.toLowerCase().trim()))
        if (searchValue !== "") {
            setlistOfAddresses([...searched]);
        }
        else {
            setlistOfAddresses([...permanent]);
        }


    }
    const addFilial = () => {
        setAddFilial("new");
    }
    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>


                <Flex width="100%" margin="20px 0px 0px 0px" justifyContent="space-evenly" alignItems="flex-start">

                    {(!listOfAdresses || currentFilial || addFilialState === "new") ? (<LeftWrapper>

                        <Flex flexDirection="column" width="100%" justifyContent="space-between" alignItems="center">
                            {inputListState.map((item: any, index) => {
                                return <>
                                    <Controller
                                        name={item.name + index}
                                        control={control}
                                        rules={{ required: !item.notRequired }}
                                        render={({ field }) => {
                                            return <CustomInput
                                                flexStyle={{ width: "100%", alignSelf: "center" }}
                                                centered
                                                field={field}
                                                id={`${index}`}
                                                label={item.label}
                                                type={item.input}
                                                labelWidth={item.notRequired ? '76%' : null}
                                                notRequired={item.notRequired}
                                                aboveInput={item.aboveInput}
                                                aboveLabel={item.aboveLabel}
                                            />
                                        }}
                                    />
                                    {errors[item.name + index]?.type === "required" && <div style={{ width: "80%", alignSelf: "start" }}>
                                        <Text marginLeft="10%" fontSize="12px" fontWeight={300} color="red">
                                            {t("requiredField")}
                                        </Text>
                                    </div>}
                                </>
                            })}
                        </Flex>
                        <div style={{ marginLeft: "7.5%", marginTop: "10px" }} onClick={handleAddPhoneNumber}>
                            <Text fontSize="14px" fontWeight={300} color="#3492FF">
                                {t("addPhoneNumber")}
                            </Text>
                        </div>

                        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Flex width="85%" flexDirection="column" alignItems="flex-start">
                                <div style={{ marginTop: "50px" }}>
                                    <Text fontSize="16px" fontWeight={500}>{t("workingHours")} </Text>
                                </div>
                                <div style={{ marginTop: "13px" }}>
                                    <input type="checkbox" onChange={(e) => {

                                        setAroundTheClock(e.target.checked);


                                    }} /> <Text fontSize="16px" fontWeight={300} marginLeft="10px">{t("24/7")}</Text>
                                </div>
                                {!aroundTheClock && <Flex margin="20px 0px 0px 0px" flexWrap="wrap" justifyContent="start" alignItems="flex-start" width="100%">

                                    {days.map((item, index) => (
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "flex-start" }}>
                                            <div onClick={(e) => handleDayCLick(e, item, index)} style={{
                                                marginRight: "15px",
                                                display: "flex",
                                                justifyContent: "center",
                                                position: "relative",
                                                flex: "1 1 80px",
                                                alignItems: "center",
                                                maxHeight: "45px",
                                                minWidth: "78px",
                                                maxWidth: "78px",
                                                marginTop: "10px",
                                                borderRadius: "14px",
                                                background: "rgba(96, 110, 234, 0.1)"
                                            }}>
                                                {item}
                                                {pickedDay === item && <Papper onClick={(e) => { e.stopPropagation() }}>
                                                    <div style={{ minWidth: "250px", display: "flex", flexDirection: "column" }}>
                                                        <RadioGroup>
                                                            <div><Radio checked={checkForRest(item, index)} value="rest" onChange={(e, checked) => handleRestChecked(e, checked, item, index)} /> <Text>{t("weekend")}</Text>  </div>
                                                            <div><Radio checked={!checkForRest(item, index)} value="work" onChange={(e, checked) => handleWorkChecked(e, checked, item, index)} /> <Text>{t("workingDay")}</Text> </div>
                                                        </RadioGroup>
                                                        {workHours.includes(item) && <>

                                                            <Flex width="100%" justifyContent="space-between">
                                                                <div style={{ width: "50%" }} >
                                                                    <CustomInput name="workStart" onChange={(e: any) => handleWorkingHourChange(e, item, index)} style={{ padding: "8px 12px" }} label="start" />
                                                                </div>
                                                                <div style={{ width: "50%" }}>
                                                                    <CustomInput name="workEnd" onChange={(e: any) => handleWorkingHourChange(e, item, index)} style={{ padding: "8px 12px" }} label="end" />
                                                                </div>
                                                            </Flex>
                                                            <>
                                                                <div>
                                                                    <Text onClick={() => handleAddRest(item, index)}>{t("rest")}</Text> <span onClick={() => handleRemoveRestClick(item, index)} style={{ color: "rgba(24, 144, 255, 1)", fontSize: "7px" }}>x</span>
                                                                </div>
                                                                {withRest.includes(item) && <Flex width="100%" justifyContent="space-between">
                                                                    <div style={{ width: "50%" }} >
                                                                        <CustomInput name="breakStart" onChange={(e: any) => handleBreakHourChange(e, item, index)} style={{ padding: "8px 12px", width: "90%" }} label="start" />
                                                                    </div>
                                                                    <div style={{ width: "50%" }}>
                                                                        <CustomInput name="breakEnd" onChange={(e: any) => handleBreakHourChange(e, item, index)} style={{ padding: "8px 12px", width: "90%" }} label="end" />
                                                                    </div>
                                                                </Flex>}
                                                                <div><Checkbox onChange={(e, checked) => handleApplyForAll(checked, item, index)} /> <Text>{t("applyForAll")}</Text></div>
                                                            </>
                                                        </>}
                                                    </div>


                                                </Papper>}
                                            </div>
                                            {(workingHoursState[index].wHours?.from && workingHoursState[index].wHours?.to) ? (
                                                <div style={{ width: "78px", boxSizing: "border-box", padding: "10px 0px", height: "120px", marginTop: "10px", borderRadius: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", background: 'rgba(96, 110, 234, 0.1)' }}>
                                                    <div>
                                                        {workingHoursState[index].wHours?.from}
                                                    </div>
                                                    {(!workingHoursState[index].bHours?.from || !workingHoursState[index].bHours?.to) ? <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#606EEA" }}>
                                                    </div> : (
                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                                            <div>
                                                                <CoffeIcon />
                                                            </div>
                                                            <Flex flexDirection="column" >
                                                                <div> <Text color="#606EEA" fontSize="14px" fontWeight={300}>
                                                                    {workingHoursState[index].bHours?.from}
                                                                </Text> </div>
                                                                <div><Text color="#606EEA" fontSize="14px" fontWeight={300}>
                                                                    {workingHoursState[index].bHours?.to}
                                                                </Text> </div>
                                                            </Flex>

                                                        </div>
                                                    )
                                                    }
                                                    <div>
                                                        {workingHoursState[index].wHours.to}
                                                    </div>
                                                </div>) : (
                                                <div style={{ width: "78px", boxSizing: "border-box", padding: "10px 0px", height: "120px", marginTop: "10px", borderRadius: "14px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: 'rgba(96, 110, 234, 0.1)' }}>

                                                    <SunIcon />

                                                </div>
                                            )



                                            }
                                        </div>)
                                    )}
                                </Flex>}
                                {/* <div style={{ marginTop: "25px" }} onClick={handleAddPhoneNumber}>

                                </div> */}
                                <CustomButton style={{ marginTop: "20px" }} type="submit">
                                    <SaveIcon />
                                    <Text marginLeft="18px" color="white">{t("save")}</Text>
                                </CustomButton>

                            </Flex>

                        </div>

                    </LeftWrapper>) :
                        (
                            <Flex margin="0px" width="45%" alignItems="center" flexDirection="column" justifyContent="start">
                                <Flex width="100%" justifyContent="space-between" alignItems="flex-start" margin="15px 0px 0px 0px">
                                    <UnderSectionButton style={{ width: "47%" }} onClick={addFilial}>
                                        <AddIcon />
                                        <Text>{t("addFilial")}</Text>
                                    </UnderSectionButton>

                                    <CustomSearchFlexible value={searchValue} placeholder="Поиск по филиалам" onChange={(e: any) => searchFilial(e)} width="47%" padding="14px 8px" margin="0px" />



                                </Flex>
                                <Flex width="90%" flexDirection="column" justifyContent="space-between">
                                    {listOfAdresses.map((item: any) => {
                                        return (
                                            <div onClick={() => handleCompanyAddressClick(item)} style={{ width: "100%", padding: "15px 25px", display: "flex", justifyContent: "space-between", borderRadius: "14px", background: 'white', marginTop: "20px" }}>
                                                <Flex flexDirection="column" justifyContent="space-evenly" alignItems="flex-start" width="30%" margin="0px">
                                                    <div>
                                                        <Text fontSize="16px" fontWeight={500}>{t("companyAddress")}</Text>

                                                    </div>
                                                    <div style={{ marginTop: "10px" }}>
                                                        <Text fontSize="16px" fontWeight={400}>{item.address}</Text>
                                                    </div>

                                                </Flex>
                                                <Flex flexDirection="column" justifyContent="space-evenly" margin="0px">
                                                    {item.telNumbers.filter((item: any) => item !== null).map((item: any) => {
                                                        if (item !== null) {
                                                            return <div > <Text fontSize="14px" fontWeight={400}>{item}</Text> </div>
                                                        }
                                                    })}
                                                </Flex>

                                            </div>
                                        )
                                    })}

                                </Flex>

                            </Flex>
                        )
                    }
                    <RightWrapper>
                        <LoadScript
                            googleMapsApiKey="AIzaSyA8nfJOuyd0zwEWyJoKBWJm3JK9UhD3Quw"

                        >
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={14}
                                onClick={handleMapClick}

                            >

                            </GoogleMap>

                        </LoadScript>




                    </RightWrapper>
                    <CustomModal open={modalVisible}>
                        <ModalComponent style={{ maxHeight: "450px" }}>
                            <div style={{ position: "relative", top: '-120px', alignSelf: "center" }}>
                                <img src={GoToPhoto} alt="" />
                            </div>
                            <Flex flexDirection="column" alignItems="center" style={{ top: "-100px" }}>
                                <div style={{ marginBottom: "15px" }}>
                                    <Text fontSize="18px" fontWeight={700}>Поздравляем вы успешно прошли регистрацию</Text>
                                </div>
                                <div style={{ width: "350px", textAlign: "center", marginBottom: "15px" }}>
                                    <Text fontSize="18px" fontWeight={400}>
                                        Добавьте фотографии вашей компании
                                        для большей лояльности клиентов
                                        в разделе фотографии.
                                    </Text>
                                </div>
                                <div style={{ width: "max-content", display: "flex", justifyContent: "space-evenly", alignItems: "start" }}>

                                    <CustomButton background="white" onClick={() => {
                                        setModalVisible(false)
                                    }}>
                                        <Text >Остаться</Text>
                                    </CustomButton>
                                    <CustomButton onClick={() => setSection("photos")}  >
                                        <Text color="white">
                                            Добафить фото
                                        </Text>
                                    </CustomButton>



                                </div>
                            </Flex>
                        </ModalComponent>

                    </CustomModal>
                </Flex>
            </form>
        </>
    );
}

export default AddressSection;

