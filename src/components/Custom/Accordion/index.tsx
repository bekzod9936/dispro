import React from 'react';
import {
  MAccordion,
  MAccordionSummary,
  MAccordionDetails,
  Container,
  DownIcon,
} from './style';

interface Props {
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: (e: any) => void;
  square?: boolean;
  expandIcon?: any;
  IconButtonProps?: Object;
  list?: { title?: string; content?: any }[];
}

const Accordion = ({
  defaultExpanded,
  disabled,
  expanded,
  onChange = () => {},
  square,
  expandIcon,
  IconButtonProps,
  list,
}: Props) => {
  const [expanded1, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Container>
      {list?.map((v: any) => (
        <MAccordion
          square
          expanded={expanded1 === v.title}
          onChange={handleChange(v.title)}
          key={v.title}
        >
          <MAccordionSummary expandIcon={<DownIcon />}>
            {v.title}
          </MAccordionSummary>
          <MAccordionDetails>{v.content}</MAccordionDetails>
        </MAccordion>
      ))}
    </Container>
  );
};

export default Accordion;
