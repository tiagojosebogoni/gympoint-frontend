import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';

import { Container } from '~/components/Grid';
import Title from '~/components/Title';
import { Table, Thead, Th, Tbody, Tr, Td } from '~/components/Table';
import Loading from '~/components/Loading';
import { HeaderPage } from '~/components/HeaderPage/styles';
import { Controls } from '~/components/Controls/styles';
import colors from '~/styles/colors';

import {
  enrollmentsSearchRequest,
  enrollmentsDeleteRequest,
} from '~/store/modules/enrollment/actions';
import ButtonLink from '~/components/ButtonLink';
import Alert from '~/util/alert';
import { Panel } from '~/components/Panel/styles';
import NoResultFound from '~/components/NoResultFound';
import Pagination from '~/components/Pagination';
import PaginationInfo from '~/components/Pagination/PaginationInfo';
import ButtonLikeLink from '~/components/ButtonLikeLink';

export default function EnrollmentList() {
  const [termSearch, setTermSearch] = useState('');
  const enrollments = useSelector(state => state.enrollment.enrollments);
  const loading = useSelector(state => state.enrollment.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enrollmentsSearchRequest({ term: termSearch, page: 1 }));
  }, []); // eslint-disable-line

  function handleSearchMain(value, page = 1) {
    setTermSearch(value);
    dispatch(enrollmentsSearchRequest({ term: value, page }));
  }

  function handleDelete(id) {
    Alert.delete().then(result => {
      if (result.value) {
        dispatch(enrollmentsDeleteRequest(id));
      }
    });
  }

  function handleLoadPage(page) {
    // console.tron.log('load: ', page);
    handleSearchMain(termSearch, page);
  }

  return (
    <Container>
      <HeaderPage>
        <Title>Gerenciando de Matrículas</Title>
        <Controls>
          <ButtonLink to="/matriculas/new">
            <MdAdd size={24} color="#fff" title="Adicionar Novo Enrollmento" />
            <span>Cadastrar</span>
          </ButtonLink>
        </Controls>
      </HeaderPage>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <Panel>
          {enrollments.total === 0 ? (
            <NoResultFound />
          ) : (
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th>ALUNO</Th>
                    <Th align="center">PLANO</Th>
                    <Th align="center">INÍCIO</Th>
                    <Th align="center">TÉRMINO</Th>
                    <Th align="center">STATUS</Th>
                    <Th colSpan="2" />
                  </Tr>
                </Thead>
                <Tbody>
                  {enrollments.data.map(enrollment => (
                    <Tr key={String(enrollment.id)}>
                      <Td>{enrollment.student.name}</Td>
                      <Td align="center">{enrollment.plan.title}</Td>
                      <Td align="center">{enrollment.startDateFormatted}</Td>
                      <Td align="center">{enrollment.endDateFormatted}</Td>
                      <Td align="center">
                        {enrollment.status ? (
                          <MdCheckCircle size={23} color="#42CB59" />
                        ) : (
                          <MdCheckCircle size={23} color="#DDDDDD" />
                        )}
                      </Td>
                      <Td>
                        <Link
                          style={{ color: colors.edit }}
                          to={`/matriculas/${enrollment.id}/edit`}
                        >
                          editar
                        </Link>
                      </Td>
                      <Td>
                        <ButtonLikeLink
                          onClick={() => handleDelete(enrollment.id)}
                        >
                          apagar
                        </ButtonLikeLink>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <br />
              <PaginationInfo
                page={enrollments.page}
                perPage={enrollments.perPage}
                totalPage={enrollments.totalPage}
                total={enrollments.total}
              />
              <Pagination
                page={enrollments.page}
                totalPage={enrollments.totalPage}
                align="center"
                onLoadPage={handleLoadPage}
              />
            </>
          )}
        </Panel>
      )}
    </Container>
  );
}
