import React from 'react';

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
