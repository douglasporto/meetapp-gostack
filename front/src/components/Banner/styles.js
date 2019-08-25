import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 50px;
  align-self: stretch;
  border-radius: 10px;
  label {
    cursor: pointer;
    width: 100%;
    max-height: 26vw;
    overflow: hidden;
    display: block;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    &:hover {
      opacity: 0.7;
    }
    .icon-add {
      padding: 50px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
    input {
      display: none;
    }
  }
`;
