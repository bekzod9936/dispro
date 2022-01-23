import { Container, Link } from "./style";
import { useRef,useEffect } from "react";
import useWindowWidth from "services/hooks/useWindowWidth";
interface Props {
  list?: { path?: string; text?: string }[];
  margin?: string;
  padding?: string;
  vertical?: boolean;
}

export const activeStyle = {
  color: "white",
  background: "#606EEA",
  boxShadow: "0px 4px 9px rgba(96, 110, 234, 0.46)",
};

const NavBar = ({ list, margin, padding, vertical }: Props) => {
  const parentRef = useRef<null | HTMLDivElement>(null);
  const linkRef = useRef<null | Map<number, any>>(null)
  const { width } = useWindowWidth()
  const handleClick = (e: any, index: number) => {
    const map = getMap();
    const node = map.get(index);
    node?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: width > 600 ? "nearest" : "center"
    })
  };

  const getMap = () => {
    if (!linkRef.current) {
      linkRef.current = new Map()
    }
    return linkRef.current
  }


  return (
    <Container
      ref={parentRef}
      vertical={vertical}
      listlength={list?.length}
      margin={margin}
      padding={padding}
    >
      {list?.map((v, index: number) => (
        <Link
          ref={(node) => {
            const map = getMap();
            if (node) {
              map.set(index, node)
            } else map.delete(index)
          }}
          onClick={(e: any) => handleClick(e, index)}
          to={`${v.path}`}
          exact
          activeStyle={activeStyle}
        >
          {v.text}
        </Link>
      ))}
    </Container>
  );
};

export default NavBar;
