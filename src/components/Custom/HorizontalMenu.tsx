import { MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { Flex, SectionItem, WrapperOnActiveSection } from '../../styles/BuildingBlocks';
interface IHorizontalMenu {
    menuItemClickHandler: (key: string) => void
    menuItems: {
        key: string,
        title: string,
    }[],
    section: string,

}

const HorizontalMenu: React.FC<IHorizontalMenu> = ({ menuItemClickHandler, menuItems, section }) => {
    //  const [section, setSection] = useState<string>(menuItems[0].key)
    return (
        <Flex justifyContent="space-between" margin="20px 10px 20px 0px" alignItems="center" width="100%">
            {menuItems.map((item: typeof menuItems[0]) => {
                if (item.key === section) {
                    return <WrapperOnActiveSection onClick={() => menuItemClickHandler(item.key)} >
                        {item.title}
                    </WrapperOnActiveSection>


                }
                else {
                    return <SectionItem onClick={() => menuItemClickHandler(item.key)} >{item.title}</SectionItem>
                }
            })}
        </Flex>
    );
}

export default HorizontalMenu;
