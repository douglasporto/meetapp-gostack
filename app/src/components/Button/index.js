import React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, ButtonText, Text } from './styles';

export default function Button({ children, loading, icon, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          <ButtonText>
            <Icon name={icon} size={15} color="#fff" />
            <Text>{children}</Text>
          </ButtonText>
        </>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  icon: '',
};
