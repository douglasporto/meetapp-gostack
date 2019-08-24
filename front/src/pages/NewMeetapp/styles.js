import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  padding: 50px 40px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input,
    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    textarea {
      padding: 14px 20px;
      border-radius: 4px;
      border: 0px;
      font-size: 14px;
      line-height: 21px;
      height: 150px;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    > button {
      display: flex;
      align-items: center;
      align-self: flex-end;
      max-width: 200px;
      margin: 5px 0 0;
      height: 44px;
      padding: 15px 20px;
      background: #d44059;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#d44059')};
      }
      svg {
        margin-right: 10px;
      }
    }
    a {
      align-self: flex-end;
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .react-datepicker-wrapper > div {
      display: inline;
      > input {
        width: 100%;
      }
    }
  }
`;

export const BannerInput = styled.div``;
