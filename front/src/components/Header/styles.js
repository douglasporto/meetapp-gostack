import styled from 'styled-components';

export const Container = styled.div`
  background: #000;
  padding: 0 30;
`;
export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
    & > a {
      color: #d44059;
      font-weight: bold;
      max-height: 43px;
      opacity: 0.7;
      transition: 0.2s;
      &:hover {
        opacity: 1;
        transform: translateY(-2px);
      }
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #fff;
    }
    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
      &:hover {
        transform: scale(1.03);
        strong {
          opacity: 1;
        }
      }
    }
  }
  img {
    width: 32px;
    height: 32px;
    border-radius: 50px;
  }
`;
