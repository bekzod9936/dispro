import { ContentGroup, ContentVariant } from "../../../style";
import { numberWith } from "services/utils";
const Condition = ({ watch, index }: any) => {

  let condition=watch(`levels.[${index}].type.label`);
  let amount=watch(`levels.[${index}].amount`);
  let conditionFirstValue=watch(`levels.[${index}].requirements[${0}].condition.value`);
  let conditionFirstTypeValue=watch(`levels.[${index}].requirements[${0}].type.value`);
  let conditionFirstTypeLabel=watch(`levels.[${index}].requirements[${0}].type.label`);
  let conditionFirstTypeAmount=watch(`levels.[${index}].requirements[${0}].amount`);

  let conditionSecondValue=watch(`levels.[${index}].requirements[${1}].condition.value`);
  let conditionSecondTypeValue=watch(`levels.[${index}].requirements[${1}].type.value`);
  let conditionSecondTypeLabel=watch(`levels.[${index}].requirements[${1}].type.label`);
  let conditionSecondTypeAmount=watch(`levels.[${index}].requirements[${1}].amount`);

  return (
    <>
      {" "}
      {watch(`levels.[${index}].type.value`) && (
        <ContentGroup>
          <ContentVariant>
            <h5>Условия статуса №1</h5>
            <p>
              {condition + ":"}
              {numberWith(amount, " ")}
            </p>
            {conditionFirstValue ==
              "и" &&
              conditionFirstTypeValue && (
                <p>
                  {conditionFirstTypeLabel +
                    ":"}
                  {numberWith(
                    conditionFirstTypeAmount,
                    " "
                  )}
                </p>
              )}
            {conditionSecondValue ==
              "и" &&
              conditionSecondTypeValue && (
                <p>
                  {conditionSecondTypeLabel +
                    ":"}
                  {numberWith(
                    conditionSecondTypeAmount,
                    " "
                  )}
                </p>
              )}
          </ContentVariant>

          {conditionFirstValue ==
            "или" ||
            conditionSecondValue ==
            "или" ? (
            <ContentVariant>
              <h5>Условия статуса №2</h5>
              {conditionFirstTypeLabel && (
                <p>
                  {conditionFirstTypeLabel +
                    ":"}
                  {numberWith(
                    conditionFirstTypeAmount,
                    " "
                  )}
                </p>
              )}
              {conditionSecondTypeLabel && (
                <p>
                  {conditionSecondTypeLabel +
                    ":"}
                  {numberWith(
                    conditionSecondTypeAmount,
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
