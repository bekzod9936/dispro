import { useState, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";

// assets and styles
import Input from "components/Custom/Input";
import Popover from "components/Custom/Popover";
import Button from "components/Custom/Button";
import { Break, SpinnerDiv } from "../../styles";
import { SearchIcon } from "assets/icons/ClientsPageIcons/ClientIcons";
import { FilledAddIcon } from "assets/icons/SettingsIcons/SettingsPageIcon";
import CustomSelectPopoverComponent from "components/Custom/CustomSelectPopoverComponent";
import {
  CreateBtn,
  IconDiv,
  QRPageWrapper,
  MyHeadAction,
  HeadInput,
  CardContainer,
  CardItem,
  Wrapper,
} from "./styles";

//hooks
import useScroll from "services/hooks/useScroll";
import useQrCode from "./hooks/useQrCode";
import useBranch from "./hooks/useBranch";

//components
import QrActionModal from "./components/QrActionModal";
import QrForBranch from "./components/QrForBranch";
import Spinner from "components/Helpers/Spinner";
// import QrCodeCard from "./components/QrCodeCard";
const QrCodeCard = lazy(() => import("./components/QrCodeCard"));
const BranchQrCode = lazy(() => import("./components/BranchQrCode"));

const QRCodesSection = () => {
  const { t } = useTranslation();
  const { height, handleScroll } = useScroll({
    initialHeight: 20,
    nextHeight: 0,
    scrollTop: 10,
  });
  const {
    isFetching,
    isLoading,
    data,
    searchQR,
    handleSearchQR,
    optionsOpen,
    handleOption,
    optionsListOpen,
    handleCreateQRCode,
    handleDeleteClick,
    handleEditClick,
    setModalVisible,
    setOptionsListOpen,
    setId,
    modalVisible,
    state,
    handleDelete,
    handleSavePromocode,
  } = useQrCode();
  const { closeQr, onSave, qrVisible, openQr } = useBranch();

  const branches = useAppSelector((state) => state.qrSetting.branches);

  const [closeFun, setCloseFun] = useState<any>();
  const handleClose = (e: any) => {
    setCloseFun(e);
  };

  const options = [
    {
      key: "forDownload",
      content: "forDownload",
      handler: () => {
        setModalVisible(true);
        setOptionsListOpen(false);
        closeFun.close();
      },
    },

    {
      key: "forP2p",
      content: "forP2p",
      handler: () => {
        openQr();
        setOptionsListOpen(false);
        closeFun.close();
      },
    },
  ];

  const handleLink = (link: string) => {
    const filteredBranch = link.split("/");
    const myItem = filteredBranch[filteredBranch?.length - 1].split("?");
    const filteredItem = myItem[0];
    return filteredItem;
  };

  return (
    <QRPageWrapper>
      <MyHeadAction>
        <CreateBtn>
          <Popover
            click={
              <Button
                startIcon={<FilledAddIcon />}
                width={{
                  minwidth: 170,
                }}
                buttonStyle={{
                  bgcolor: "white",
                  color: "#223367",
                  height: {
                    desktop: 60,
                    laptop: 60,
                  },
                }}
                // style={{ width: "170px" }}
                onClick={handleCreateQRCode}
              >
                {t("create")}
              </Button>
            }
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            popoverStyle={{ marginTop: "20px" }}
            onClose={handleClose}
          >
            {optionsListOpen && (
              <CustomSelectPopoverComponent
                options={options}
                width="fit-content"
              />
            )}
          </Popover>
        </CreateBtn>
        {/* <HBreak width={25} /> */}
        <HeadInput>
          <Input
            IconStart={
              <IconDiv>
                <SearchIcon />
              </IconDiv>
            }
            inputStyle={{
              border: "none",
              height: {
                mobile: 45,
                laptop: 60,
              },
            }}
            placeholder="Поиск по QR"
            onChange={handleSearchQR}
          />
        </HeadInput>
      </MyHeadAction>
      <Break height={height} />

      {/* QR Code cards  */}
      {isLoading || isFetching ? (
        <SpinnerDiv>
          <Spinner />
        </SpinnerDiv>
      ) : (
        <Suspense
          fallback={
            <SpinnerDiv>
              <Spinner />
            </SpinnerDiv>
          }
        >
          <Wrapper onScroll={handleScroll}>
            <CardContainer>
              {!isLoading &&
                data?.data &&
                data?.data?.data
                  ?.filter((value: any) => {
                    if (searchQR === "") {
                      return true;
                    } else {
                      return value.source.match(searchQR);
                    }
                  })
                  .map((item: any, index: number) => {
                    return (
                      <CardItem key={item?.id}>
                        <QrCodeCard
                          item={item}
                          index={index}
                          handleOption={() => handleOption(item?.id)}
                          optionsOpen={optionsOpen}
                          handleDeleteClick={handleDeleteClick}
                          handleEditClick={handleEditClick}
                          setId={setId}
                        />
                      </CardItem>
                    );
                  })}

              {/* //branches qr code  */}
              {branches?.length
                ? branches
                    ?.filter((value: any) => {
                      if (searchQR === "") {
                        return true;
                      } else {
                        return value.name.match(searchQR);
                      }
                    })
                    ?.map((item: any, index: number) => {
                      const filteredBranch = item?.dynLink?.split("/");
                      const myItem =
                        filteredBranch[filteredBranch?.length - 1].split("?");
                      const filteredItem = myItem[0];
                      if (filteredItem === "null") {
                        return null;
                      }
                      console.log(item);
                      return (
                        <CardItem key={item?.id}>
                          <BranchQrCode
                            item={item}
                            index={index}
                            handleOption={() => handleOption(item?.id)}
                            optionsOpen={optionsOpen}
                            handleDeleteClick={handleDeleteClick}
                            handleEditClick={handleEditClick}
                            setId={setId}
                          />
                        </CardItem>
                      );
                    })
                : null}
            </CardContainer>
          </Wrapper>
        </Suspense>
      )}

      {/* Modal side  */}

      <QrActionModal
        modalVisible={modalVisible}
        state={state}
        setModalVisible={setModalVisible}
        handleDelete={handleDelete}
        handleSavePromocode={handleSavePromocode}
      />

      <QrForBranch qrVisible={qrVisible} onSave={onSave} closeQr={closeQr} />
    </QRPageWrapper>
  );
};

export default QRCodesSection;
