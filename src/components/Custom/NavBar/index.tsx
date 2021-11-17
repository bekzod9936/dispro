import { Container, Link } from "./style";
import { useRef } from "react";
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

  const handleClick = (e: any) => {
    if (parentRef.current) {
      parentRef.current.scrollTo({
        left: e.target.getBoundingClientRect().left,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container
      ref={parentRef}
      vertical={vertical}
      listlength={list?.length}
      margin={margin}
      padding={padding}
    >
      {list?.map((v) => (
        <Link
          onClick={handleClick}
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
