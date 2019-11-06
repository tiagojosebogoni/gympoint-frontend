import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { debounce } from 'throttle-debounce';

import Container from '~/components/Container';
import Title from '~/components/Title';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Thead from '~/components/Table/Thead';
import Th from '~/components/Table/Th';
import Tbody from '~/components/Table/Tbody';
import Td from '~/components/Table/Td';

import { Header, Controls } from './styles';
import InputSearch from '~/components/InputSearch';
import Loading from '~/components/Loading';
import { studentsSearchRequest } from '~/store/modules/student/actions';
import Tr from '~/components/Table/Tr';

export default function Student() {
  const students = useSelector(state => state.student.students);
  const loading = useSelector(state => state.student.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentsSearchRequest({ searchName: '' }));
  }, []); // eslint-disable-line

  function handleSearchMain(value) {
    // setTimeout(() => {
    //   dispatch(studentsSearchRequest({ searchName: value }));
    // }, 3000);
    // debounce(3000, value => {
    debounce(300, () => {
      console.log('debounce');
    });
    dispatch(studentsSearchRequest({ searchName: value }));
    // });
  }

  return (
    <Container>
      <Header>
        <Title>Gerenciando Alunos</Title>
        <Controls>
          <Button>
            <MdAdd size={24} color="#fff" title="Adicionar Novo Aluno" />
            <span>Cadastrar</span>
          </Button>

          <InputSearch
            handleSearch={handleSearchMain}
            placeholder="Buscar aluno"
          />
        </Controls>
      </Header>

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
                  <Link to="/alunos/1">editar</Link>
                </Td>
                <Td>
                  <Link to="/">apagar</Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
}
