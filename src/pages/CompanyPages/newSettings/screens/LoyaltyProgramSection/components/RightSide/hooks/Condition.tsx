import { ContentGroup, ContentVariant } from "../../../style";
import { numberWith } from "services/utils";
const Condition = ({ watch, index }: any) => {
  return (
    <>
      {" "}
      {watch(`levels.[${index}].type.value`) && (
        <ContentGroup>
          <ContentVariant>
            <h5>Условия статуса №1</h5>
            <p>
              {watch(`levels.[${index}].type.label`) + ":"}
              {numberWith(watch(`levels.[${index}].amount`), " ")}
            </p>
            {watch(`levels.[${index}].requirements[${0}].condition.value`) ==
              "и" &&
              watch(`levels.[${index}].requirements[${0}].type.value`) && (
                <p>
                  {watch(`levels.[${index}].requirements[${0}].type.label`) +
                    ":"}
                  {numberWith(
                    watch(`levels.[${index}].requirements[${0}].amount`),
                    " "
                  )}
                </p>
              )}
            {watch(`levels.[${index}].requirements[${1}].condition.value`) ==
              "и" &&
              watch(`levels.[${index}].requirements[${1}].type.value`) && (
                <p>
                  {watch(`levels.[${index}].requirements[${1}].type.label`) +
                    ":"}
                  {numberWith(
                    watch(`levels.[${index}].requirements[${1}].amount`),
                    " "
                  )}
                </p>
              )}
          </ContentVariant>

          {watch(`levels.[${index}].requirements[${0}].condition.value`) ==
            "или" ||
          watch(`levels.[${index}].requirements[${1}].condition.value`) ==
            "или" ? (
            <ContentVariant>
              <h5>Условия статуса №2</h5>
              {watch(`levels.[${index}].requirements[${0}].type.label`) && (
                <p>
                  {watch(`levels.[${index}].requirements[${0}].type.label`) +
                    ":"}
                  {numberWith(
                    watch(`levels.[${index}].requirements[${0}].amount`),
                    " "
                  )}
                </p>
              )}
              {watch(`levels.[${index}].requirements[${1}].type.label`) && (
                <p>
                  {watch(`levels.[${index}].requirements[${1}].type.label`) +
                    ":"}
                  {numberWith(
                    watch(`levels.[${index}].requirements[${1}].amount`),
                    " "
                  )}
                </p>
              )}
            </ContentVariant>
          ) : (
            ""
          )}
        </ContentGroup>
      )}
    </>
  );
};
export default Condition;
