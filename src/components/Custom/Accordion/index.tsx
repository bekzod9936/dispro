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
  return (
    <Container>
      {list?.map((v: any) => (
        <MAccordion square key={v.title}>
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
