import React, { useState } from 'react';
import {
  MAccordion,
  MAccordionSummary,
  MAccordionDetails,
  Container,
  DownIcon,
  Content,
} from './style';

interface Props {
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: (e: any) => void;
  square?: boolean;
  expandIcon?: any;
  IconButtonProps?: Object;
  list?: { title?: string; content?: any, value?: any }[];
}

const Accordion = ({
  defaultExpanded,
  disabled,
  expanded,
  onChange = () => { },
  square,
  expandIcon,
  IconButtonProps,
  list,
}: Props) => {
  const [isExpanded, setExpanded] = useState<string>('');

  const handleClick = (str: string) => {
    setExpanded((prev) => (str === prev ? '' : str));
  };

  return (
    <Container>
      {list?.map((v: any) => (
        <MAccordion expanded={isExpanded === v.title} square key={v.title}>
          <MAccordionSummary
            onClick={() => handleClick(v.title)}
            expandIcon={<DownIcon />}
          >
            <Content>
              <p>{v.title}</p><span>{v.value || ""}</span>
            </Content>
          </MAccordionSummary>
          <MAccordionDetails>{v.content}</MAccordionDetails>
        </MAccordion>
      ))}
    </Container>
  );
};

export default Accordion;
