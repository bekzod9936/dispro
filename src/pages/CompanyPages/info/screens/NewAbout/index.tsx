import Spinner from "components/Custom/Spinner";
import useLayout from "components/Layout/useLayout";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import useNewAbout from "./useNewAbout";
import { SaveButton } from "components/Custom/Buttons/Save";
import ExitButton from "../../components/Buttons/ExitButton";
import { setExitModal } from "services/redux/Slices/info/info";
import { Form, UpSide, DownSide, Container, Wrap } from "./style";

export interface FormProps {
  category: any[];
  logo: string;
  upload: string;
  deletelogo: string;
  options: any[];
  keywordsValue: string;
  telNumber: string;
  links: any[];
  companyLink: string;
  link: string;
}

const NewAbout = () => {
  const methods = useForm<FormProps>({
    mode: "onChange",
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const dispatch = useAppDispatch();

  const companyId: any = localStorage.getItem("companyId");
  const { resHeader } = useLayout({ id: companyId });
  const { resCategory } = useNewAbout();

  const data = useAppSelector((state) => state.info.data);

  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });

  const fill =
    (data?.filled && data?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  useEffect(() => {
    methods.reset({
      ...data,
      deletelogo: data?.logo,
      telNumber: String(data?.telNumber).slice(4),
    });
  }, [data]);

  useEffect(() => {
    if (resHeader.isSuccess && resCategory.isSuccess) {
      const newArr = resCategory.data?.filter((v: any) =>
        data?.categories?.find((i: any) => i === v.value)
      );
      methods.setValue("options", resCategory.data);
      methods.setValue("category", newArr);
    }
  }, [resCategory, data]);

  const handleSubmit = (v: any) => {
    if (v.keywordsValue?.length > 0) {
      methods.setError("keywordsValue", { message: "shouldsavekeyword" });
    }
    if (v.link?.length > 0) {
      methods.setError("link", { message: "shouldsavelink" });
    }
  };

  if (resHeader.isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleSubmit)}>
        <UpSide>
          <Container>
            <Wrap>
              <LeftSide />
            </Wrap>
            <Wrap>
              <RightSide />
            </Wrap>
          </Container>
        </UpSide>
        <DownSide>
          <div>
            {fill ? null : (
              <ExitButton
                onClick={() => dispatch(setExitModal(true))}
                mobile={true}
                margin={{
                  laptop: "0 10px 0 0",
                }}
              />
            )}
            <SaveButton margin={{ laptop: "0" }} />
          </div>
        </DownSide>
      </Form>
    </FormProvider>
  );
};

export default NewAbout;
