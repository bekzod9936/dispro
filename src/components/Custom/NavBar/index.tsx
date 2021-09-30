import React from 'react';
import { Container, Link } from './style';

interface Props {
  list?: { path?: string; text?: string }[];
  margin?: string;
  padding?: string;
}

const activeStyle = {
  color: 'white',
  background: '#606EEA',
  boxShadow: '0px 4px 9px rgba(96, 110, 234, 0.46)',
};

const NavBar = ({ list, margin, padding }: Props) => {
  return (
    <Container listlength={list?.length} margin={margin} padding={padding}>
      {list?.map((v) => (
        <Link to={`${v.path}`} exact activeStyle={activeStyle}>
          {v.text}
        </Link>
      ))}
    </Container>
  );
};

export default NavBar;
