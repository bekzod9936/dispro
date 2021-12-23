
import { Flex } from "../../style";
import Button from "components/Custom/Button";
import { AddIcon } from "assets/icons/InfoPageIcons/InfoPageIcons";
import Input from "components/Custom/Input";
import DatePcker from "components/Custom/DatePicker";
import { SearchIcon } from "components/Layout/Header/style";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "services/redux/hooks";
import {
 
  useLocation,
 
} from "react-router-dom";
interface FilterNews{
    handleOpenNews:()=>void,
    searchNews:(e:any)=>void,
    filterByDate?:(e:any)=>void,
}

export const LaptopFilterNews=({handleOpenNews,searchNews,filterByDate}:FilterNews)=>{
  const location = useLocation();
    const { t } = useTranslation();
    const query = useAppSelector((state) => state.news.query);
    return (
        <Flex
        width="95%"
        justifyContent="flex-start"
        alignItems="center"
        margin="0"
      >
        <div style={{display:'flex'}}>
        <div>
        <Button
          onClick={handleOpenNews}
          buttonStyle={{
            bgcolor: "#FFFFFF",
            color: "#223367",
            weight: 500,
            height: { desktop: 50,
                planshet:45, },
          }}
          margin={{
            desktop: "0 25px 0 0",
            laptop: "0 25px 0 0",
            planshet: "0 0 0px 25px",
        
          }}
          startIcon={<AddIcon />}
        >
          {t("Создать")}
        </Button>
        </div>
        {filterByDate &&   <div style={{ width: "20px" }} />}
        <div>
    
        {filterByDate &&   <DatePcker       showoldvalue={true} margin="0 0 20px 0"
         height={{
            planshet:45,
         }
        
         }
            onChange={async (e: any) => {filterByDate(e)}}
          />}
          </div>
          <div style={{ width: "20px" }} />
          {location.pathname === "/news/waiting" ? 
          <div>
        <Input
        inputStyle={{ border: "none", height: { desktop: 50 } }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        placeholder="Поиск по новостям"
        onChange={(e) => searchNews(e)}
        width={{minwidth:300,width:'560px',maxwidth:560 }}
      />
       </div>:<div>
        <Input
        inputStyle={{ border: "none", height: { desktop: 50 } }}
        IconStart={<SearchIcon style={{ marginLeft: 20 }} />}
        value={query}
        placeholder="Поиск по новостям"
        onChange={(e) => searchNews(e)}
        width={{minwidth:300, maxwidth: 500 }}
      />
       </div>}
       </div>
      </Flex>
    )
}