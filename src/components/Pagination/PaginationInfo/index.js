import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function PaginationInfo({ page, perPage, totalPage, total }) {
  return (
    <Container>
      <strong>Total: {total}</strong>
      <span>
        Página: {page}/{totalPage} itens por página: {perPage}
      </span>
    </Container>
  );
}

PaginationInfo.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
