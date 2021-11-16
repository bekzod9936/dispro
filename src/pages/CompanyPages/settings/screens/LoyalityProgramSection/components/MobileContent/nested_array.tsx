import { Row, Column } from "./style";
import { useFieldArray, Controller } from "react-hook-form";
import InputFormat from "components/Custom/InputFormat";

const NestedArray = ({ index, control }: IProps) => {
  const { append, remove, fields } = useFieldArray({
    control,
    name: `levels.${index}.requirements`,
  });
  return (
    <Row>
      {fields.map((item: any, smallIndex: number) => {
        return (
          <Column key={index}>
            <Controller
              name={`levels.${[index]}.requirements.${[smallIndex]}.amount`}
              control={control}
              render={({ field }) => {
                return (
                  <InputFormat
                    width={{
                      width: "100%",
                    }}
                    field={field}
                  />
                );
              }}
            />
          </Column>
        );
      })}
    </Row>
  );
};

export default NestedArray;

interface IProps {
  index: any;
  control: any;
}
