import React from 'react';
import { FONT_SIZE } from '../../../services/Types/enums';
import { Text } from '../../../styles/CustomStyles';
interface IProps {
  src?: string;
  text?: string;
  date?: string;
  title?: string;
}

const NewsCard: React.FC<IProps> = ({ src, text, date, title }) => {
  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        flexDirection: 'column',
        boxShadow: '2px 4px 4px #ccc',
        position: 'relative',
        marginTop: '20px',
      }}
    >
      <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
        <Text fontSize={FONT_SIZE.meduim} color='white'>
          {date}
        </Text>
      </div>
      <div style={{ width: '100%', height: '180px' }}>
        <img src={src} alt='' style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ padding: '20px', boxSizing: 'border-box' }}>
        <div>
          <Text fontWeight={700} fontSize={FONT_SIZE.meduim}>
            {title}
          </Text>
        </div>
        <div style={{ width: '70%' }}>
          <Text fontSize={FONT_SIZE.smallPlus} fontWeight={400}>
            {text}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
