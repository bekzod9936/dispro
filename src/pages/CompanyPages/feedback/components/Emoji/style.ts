import styled from 'styled-components';

export const EPicker = styled.div`
  position: absolute;
  bottom: 15%;
  right: 0;
  .emoji-mart-scroll {
    ::-webkit-scrollbar {
      width: 7px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #606eea;
      border-radius: 14px 0px 0px 14px;
      min-height: 80px;
    }
  }
`;
