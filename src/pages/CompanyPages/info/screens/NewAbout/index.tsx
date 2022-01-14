import Spinner from "components/Custom/Spinner";
import useLayout from "components/Layout/useLayout";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import useNewAbout from "./useNewAbout";
import { SaveButton } from "components/Custom/Buttons/Save";
import ExitButton from "../../components/Buttons/ExitButton";
import { setExitModal } from "services/redux/Slices/info/info";
import { Form, UpSide, DownSide, Container, Wrap } from "./style";
import { aboutSchema } from "./about.schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormProps {
  logo: string;
  upload: string;
  deletelogo: string;
  options: any[];
  category: any[];
  keyWords: any[];
  keywordsValue: string;
  telNumber: string;
  links: any[];
}

const NewAbout = () => {
  const methods = useForm<FormProps>({
    resolver: yupResolver(aboutSchema),
  });

  const dispatch = useAppDispatch();

  const companyId: any = sessionStorage.getItem("companyId");
  const { resHeader } = useLayout({ id: companyId });
  const { resCategory, defSocial } = useNewAbout();

  const [social, setSocial] = useState(defSocial);

  const data = useAppSelector((state) => state.info.data);

  const regFilled = useAppSelector((state) => {
    return state.auth.regFilled;
  });

  const fill =
    (data?.filled && data?.filledAddress) ||
    (regFilled?.filled && regFilled?.filledAddress);

  useEffect(() => {
    const tel: string = String(data?.telNumber).slice(4);
    methods.reset({
      ...data,
      deletelogo: data?.logo,
      keyWords: Boolean(data?.keyWords) ? data?.keyWords?.split(",") : [],
      telNumber: tel,
    });
    const newSocial: any = social.map((v: any) => {
      const link = data?.socialLinks?.find((i: any) => i.name === v.name);
      return {
        ...v,
        value: link?.value || "",
      };
    });
    setSocial(newSocial);
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

  if (resHeader.isLoading) {
    return <Spinner />;
  }

  return (
    <FormProvider {...methods}>
      <Form>
        <UpSide>
          <Container>
            <Wrap>
              <LeftSide />
            </Wrap>
            <Wrap>
              <RightSide social={social} />
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
