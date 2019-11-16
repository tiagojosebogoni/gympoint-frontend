import React, { useState, useEffect } from 'react';

import { Paginator, PagePrev, PageItem, PageNext } from './styles';

export default function Pagination({ align, onLoadPage, page, totalPage }) {
  const [itens, setItens] = useState([]);
  const [pageSelected, setPageSelected] = useState(1);

  useEffect(() => {
    if (totalPage > 0) {
      const fill = new Array(totalPage).fill(1);
      setItens(fill);
    }

    setPageSelected(page);
  }, [page, totalPage]);

  function handleLoadPage(page) {
    setPageSelected(page);
    onLoadPage(page);
  }

  function handlePrevPage() {
    if (pageSelected === 1) return;
    const page = pageSelected - 1;
    setPageSelected(page);
    handleLoadPage(page);
  }

  function handleNextPage() {
    if (pageSelected === totalPage) return;
    const page = pageSelected + 1;
    setPageSelected(page);
    handleLoadPage(page);
  }

  return (
    <Paginator align={align}>
      {pageSelected > 1 && (
        <PagePrev onClick={handlePrevPage}>Anterior</PagePrev>
      )}

      {itens.map((item, index) => (
        <PageItem
          key={String(index)}
          active={index + 1 === pageSelected}
          onClick={() => handleLoadPage(index + 1)}
        >
          {index + 1}
        </PageItem>
      ))}
      {pageSelected < totalPage && (
        <PageNext onClick={handleNextPage}>Próximo</PageNext>
      )}
    </Paginator>
  );
}
