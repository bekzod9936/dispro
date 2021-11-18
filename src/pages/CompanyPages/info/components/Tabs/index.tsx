import { useState } from 'react';
import { Container, Appbar, MMTabs, MTab } from './style';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface Props {
  listTabs?: any[];
  active?: number | string;
  Content?: any;
  onActive?: (e: any) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index?: any;
  value?: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const MTabs = ({ listTabs, active, Content, onActive = () => {} }: Props) => {
  const handleChange = (event: any, newValue: any) => {
    onActive(newValue);
    console.log(newValue);
  };

  return (
    <Container>
      <Appbar position='static'>
        <MMTabs
          value={active}
          onChange={handleChange}
          aria-label='simple tabs example'
          variant='scrollable'
          selectionFollowsFocus={true}
        >
          {listTabs?.map((v) => {
            return (
              <MTab
                key={v.day}
                value={v.day}
                label={v.weekday}
                {...a11yProps(v.day)}
              />
            );
          })}
        </MMTabs>
      </Appbar>
      <TabPanel value={active} index={active}>
        <Content />
      </TabPanel>
    </Container>
  );
};

export default MTabs;
