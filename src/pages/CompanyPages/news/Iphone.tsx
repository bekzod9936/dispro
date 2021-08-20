import { FONT_SIZE, FONT_WEIGHT } from "../../../services/Types/enums";
import { Flex } from "../../../styles/BuildingBlocks";
import { Text } from "../../../styles/CustomStyles"
interface IPros {
    image: string,
    description: string,
    title: string
}
const Iphone: React.FC<IPros> = ({ image, description, title }) => {
    return (
        <div style={{ width: "73mm", border: "1px solid #c4c4c4", height: "140mm", padding: "12px", background: "#f4f4f4", borderRadius: "55px" }}>
            <div style={{ width: "100%", overflow: "hidden", height: "100%", background: "white", borderRadius: "40px", position: "relative" }}>
                <div style={{

                    width: "50%",
                    height: "23px",
                    borderRadius: "0px 0px 17px 17px",
                    zIndex: 10,
                    background: "#f4f4f4",
                    transform: "",
                    position: "absolute",
                    top: "0px",
                    left: "25%",

                }}>
                    <Flex width="100%" margin="0px" justifyContent="space-evenly" alignItems="center">
                        <div className="camera"
                            style={{ width: "9px", boxShadow: "inset 1px 1px 1px #ccc", height: "9px", borderRadius: "50%", background: "white" }}
                        ></div>
                        <div className="camera"
                            style={{ width: "9px", boxShadow: "inset 1px 1px 1px #ccc", height: "9px", borderRadius: "50%", background: "white" }}
                        ></div>
                        <div style={{ width: "30%", boxShadow: "inset 2px 2px 2px #ccc", height: "8px", borderRadius: "6px", background: "white", }}></div>
                        <div className="camera"
                            style={{ width: "9px", boxShadow: "inset 1px 1px 1px #ccc", height: "9px", borderRadius: "50%", background: "white" }}
                        ></div>
                        <div className="camera"
                            style={{ width: "9px", boxShadow: "inset 1px 1px 1px #ccc", height: "9px", borderRadius: "50%", background: "white" }}
                        ></div>
                    </Flex>



                </div>
                <div style={{ zIndex: 0, width: "100%", height: "47%" }} className="image">
                    <img src={image} width="100%" height="100%" alt="" />
                </div>
                <div style={{ height: "62%", top: "38%", width: "100%", position: "absolute", zIndex: 10, borderRadius: "20px", background: "#fafafa", padding: "20px", boxSizing: "border-box" }}>
                    <div>
                        <Text fontSize={FONT_SIZE.mediumPlus} fontWeight={FONT_WEIGHT.bold}>
                            {title}
                        </Text>
                    </div>
                    <div style={{ marginTop: "15px" }}>
                        <Text fontSize={FONT_SIZE.meduim} fontWeight={400}>
                            {description}
                        </Text>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Iphone;
