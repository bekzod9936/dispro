import { SectionModal } from "pages/CompanyPages/services/components/Modals/Sections";
import { TitleAndDescription } from "pages/CompanyPages/services/components/TitleAndDescription";
import {
  initialState,
  reducer,
} from "pages/CompanyPages/services/hooks/CreatePageHooks/reducer";
import { useEditItem } from "pages/CompanyPages/services/hooks/EditPageHooks";
import { useEffect, useReducer, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Buttons,
  Durations,
  Photos,
  Selects,
  Switches,
  Variants,
} from "../../components";
import { FormStyled, Container } from "./style";
import { TextField } from "@material-ui/core";
import Input from "components/Custom/Input";

export const Form: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // const form = useEditItem();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      loyaltyType: "aadadvdva",
      titles: [
        {
          title: "test",
          desc: "reavdav",
          lang: "avafv",
        },
      ],
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "titles",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    setTimeout(() => {
      form.setValue("titles", [
        { title: "test", desc: "desc", lang: "reus" },
        { title: "test", desc: "desc", lang: "reus" },
      ]);
    }, 5000);
  }, []);

  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container>
          {fields.map((item, index) => (
            <div key={item.id}>
              <Controller
                name={`titles.${index}.title`}
                control={form.control}
                render={({ field }) => <input {...field} />}
              />
              <Controller
                name={`titles.${index}.desc`}
                control={form.control}
                render={({ field }) => <input {...field} />}
              />
            </div>
          ))}
          <Controller
            name={"loyaltyType"}
            control={form.control}
            render={({ field }) => <input {...field} />}
          />
          {/* <Selects handleOpen={handleOpen} />
            <Switches dispatch={dispatch} state={state} />
            <Variants disabled={state.loyaltyType !== 1} /> */}
          {/* <Durations /> */}
          {/* <Photos /> */}
          {/* <Buttons isLoading={false} /> */}
        </Container>
      </form>
      {/* <SectionModal isSingle onClose={handleClose} isOpen={modal} /> */}
    </div>
  );
};
