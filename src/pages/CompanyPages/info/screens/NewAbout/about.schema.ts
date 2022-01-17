import * as yup from "yup";

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

export const aboutSchema = yup.object().shape({
  logo: yup.string().required("addinfologo"),
  name: yup.string().max(30, "maxcharacters").required("requiredField"),
  annotation: yup.string().max(30, "maxcharacters").required("requiredField"),
  description: yup.string().max(800, "maxcharacters").required("requiredField"),
  category: yup.string().ensure().required("Topic is required!"),
  keywordsValue: yup
    .string()
    .nullable(true)
    .transform((value) => value.trim())
    .required(),
  companyLink: yup
    .string()
    .nullable(true)
    .transform((value) => value.trim())
    .required("requiredField"),
  link: yup
    .string()
    .nullable(true)
    .transform((value) => value.trim())
    .required("requiredField"),
});
