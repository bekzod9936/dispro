import { EPicker } from './style';
import { Picker } from 'emoji-mart';
import { useRef, useEffect } from 'react';

interface Props {
  onBlur?: () => void;
  onSelect?: (e: any) => void;
  value?: any;
}

const Emoji = ({ value, onBlur = () => {}, onSelect = () => {} }: Props) => {
  const ref: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onBlur();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <EPicker ref={ref}>
      <Picker
        set='google'
        onSelect={(e: any) => {
          const m = value + e.native;
          onSelect(m);
        }}
        sheetSize={20}
        showPreview={false}
        emojiTooltip={true}
        showSkinTones={false}
        useButton={true}
        color='#606eea'
      />
    </EPicker>
  );
};

export default Emoji;
