import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  padding: 50px 0 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  .loading {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .btn {
      display: flex;
    }
    strong {
      color: #fff;
      font-size: 24px;
    }
    h2 {
      &.cancel {
        color: #d44059;
      }
      &.fineshed {
        color: #4dbaf9;
      }
    }
  }
`;

export const Button = styled.button`
  align-items: center;
  color: #fff;
  border: 0;
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  height: 44px;
  justify-content: space-between;
  margin: 5px 10px;
  padding: 0 20px;
  transition: background 0.2s;
  svg {
    margin-right: 10px;
  }
  &.btn-blue {
    background: #4dbaf9;
    &:hover {
      background: ${darken(0.09, '#4DBAF9')};
    }
  }
  &.btn-red {
    background: #d44059;
    &:hover {
      background: ${darken(0.09, '#D44059')};
    }
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  .description {
    font-size: 18px;
    line-height: 50px;
  }
  > div {
    align-items: center;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    .others-info {
      display: flex;
      align-items: center;
      font-size: 16px;
      span {
        margin-right: 30px;
      }
      svg {
        margin-right: 10px;
      }
    }
    .subscriber {
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        li {
          position: relative;
          width: 25px;
          height: 25px;
          transition: transform 0.3s, margin 0.3s;
          & + li {
            margin-left: 5px;
          }
          &:hover {
            transform: scale(1.3);
            margin: 0 10px;
            > .subscriber-tooltip {
              visibility: visible;
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      > span {
        margin-left: 10px;
      }
    }
  }
`;
export const Banner = styled.div`
  align-self: stretch;
  border-radius: 10px;
  img {
    width: 100%;
    border-radius: 10px;
    transition: transform 0.5s;
    transform-origin: center;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const Tooltip = styled.span`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  width: 120px;
  top: 115%;
  left: 50%;
  margin-left: -60px;
  &::after {
    content: ' ';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;
