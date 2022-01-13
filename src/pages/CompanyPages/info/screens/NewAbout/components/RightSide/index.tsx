import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Text, Title } from "../../../../style";
import Input from "components/Custom/Input";
import CompanyLink from "../CompanyLink";
import SocialLinks from "../SocialLinks";
interface Props {
  social: any[];
}
const RightSide = ({ social }: Props) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleSocialChange = () => {};
  const handleSocialDelete = () => {};

  return (
    <div>
      <Title>{t("phone")}</Title>
      <Text>{t("maincompanynumber")}</Text>
      <Controller
        name="telNumber"
        control={control}
        rules={{ required: true, maxLength: 9, minLength: 9 }}
        defaultValue=""
        render={({ field }) => (
          <Input
            label={t("phoneNumber")}
            error={errors.telNumber ? true : false}
            message={t("requiredField")}
            type="tel"
            field={field}
            margin={{
              laptop: "20px 0 25px",
            }}
            inputStyle={{ inpadding: "0 20px 0 0" }}
            maxLength={9}
            IconStart={<div className="inputstyle">+998</div>}
          />
        )}
      />
      <CompanyLink />
      {social?.length > 0 ? <Title>{t("companyLink")}</Title> : null}
      <div>
        {social?.map((v: any) => (
          <SocialLinks
            key={v.name}
            {...v}
            onChange={handleSocialChange}
            onDelete={handleSocialDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSide;
