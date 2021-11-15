import { Container, Column } from "./style";
import { useFieldArray, Controller } from "react-hook-form";
import Input from "components/Custom/Input";
import InputFormat from "components/Custom/InputFormat";

const NestedArray = ({ index, control }: IProps) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `levels.${index}.requirements`,
  });
  return (
    <Container>
      {fields.map((item: any, smallIndex: number) => {
        return (
          <Column key={index}>
            <Controller
              name={`levels.${[index]}.requirements.${[smallIndex]}.amount`}
              control={control}
              render={({ field }) => {
                return (
                  <InputFormat
                    //   defaultValue={numberWith(value?.amount, " ")}
                    variant="standard"
                    //   IconEnd={unitIcon(value.unit)}
                    width={{
                      minwidth: 100,
                    }}
                    field={field}
                    inputStyle={{
                      inpadding: "0 0 5px 2px",
                      border: "none",
                      borderbottom: "1px solid #606EEA",
                      bgcolor: "transparent",
                      radius: 0,
                      fitheight: true,
                    }}
                  />
                );
              }}
            />
          </Column>
        );
      })}
    </Container>
  );
};

export default NestedArray;

interface IProps {
  index: any;
  control: any;
}
