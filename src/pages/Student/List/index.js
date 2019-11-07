import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { Container } from '~/components/Grid';
import Title from '~/components/Title';
import Table from '~/components/Table';
import Thead from '~/components/Table/Thead';
import Th from '~/components/Table/Th';
import Tbody from '~/components/Table/Tbody';
import Tr from '~/components/Table/Tr';
import Td from '~/components/Table/Td';
import InputSearch from '~/components/InputSearch';
import Loading from '~/components/Loading';
import { HeaderPage } from '~/components/HeaderPage/styles';
import { Controls } from '~/components/Controls/styles';

import colors from '~/styles/colors';

import {
  studentsSearchRequest,
  studentsDeleteRequest,
} from '~/store/modules/student/actions';
import ButtonLink from '~/components/ButtonLink';
import Alert from '~/util/alert';

export default function StudentList() {
  const students = useSelector(state => state.student.students);
  const loading = useSelector(state => state.student.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentsSearchRequest({ searchName: '' }));
  }, []); // eslint-disable-line

  function handleSearchMain(value) {
    dispatch(studentsSearchRequest({ searchName: value }));
  }

  function handleDelete(id) {
    Alert.delete().then(result => {
      if (result.value) {
        dispatch(studentsDeleteRequest(id));
      }
    });
  }

  return (
    <Container>
      <HeaderPage>
        <Title>Gerenciando Alunos</Title>
        <Controls>
          <ButtonLink pathRoute="/alunos/new">
            <MdAdd size={24} color="#fff" title="Adicionar Novo Aluno" />
            <span>Cadastrar</span>
          </ButtonLink>

          {/* <Link to="/alunos/new">Novo</Link> */}

          <InputSearch
            handleSearch={handleSearchMain}
            placeholder="Buscar aluno"
          />
        </Controls>
      </HeaderPage>

      {loading ? (
        <Loading>Carregando...</Loading>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>NOME</Th>
              <Th>EMAIL</Th>
              <Th align="center">IDADE</Th>
              <Th colSpan="2" />
            </Tr>
          </Thead>
          <Tbody>
            {students.map(student => (
              <Tr key={String(student.id)}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td align="center">{student.age}</Td>
                <Td>
                  <Link
                    style={{ color: colors.edit }}
                    to={`/alunos/${student.id}/edit`}
                  >
                    editar
                  </Link>
                </Td>
                <Td>
                  <a
                    href
                    style={{ color: colors.delete }}
                    onClick={() => handleDelete(student.id)}
                  >
                    apagar
                  </a>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
}
