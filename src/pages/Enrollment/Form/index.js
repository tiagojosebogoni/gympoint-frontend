import React, { useEffect, useState, useMemo } from 'react';

import { addMonths, format, parseISO } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { MdDone } from 'react-icons/md';
import * as Yup from 'yup';

import { Container, Row, Column } from '~/components/Grid';
import Title from '~/components/Title';
import { HeaderPage } from '~/components/HeaderPage/styles';
import { Controls } from '~/components/Controls/styles';

import ButtonLink from '~/components/ButtonLink';
import Button from '~/components/Button';

import colors from '~/styles/colors';
import { Panel } from '~/components/Panel/styles';
import Label from '~/components/Label';
import { FormGroup } from '~/components/FormGroup/styles';

import { enrollmentsSaveRequest } from '~/store/modules/enrollment/actions';
import api from '~/services/api';
import { formatCurrencyBR } from '~/util';
import ReactSelect from '~/components/ReactSelect';
import ReactSelectAsync from '~/components/SelectAsync';

// import { Container } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string(),
  plan_id: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.string().required('A data de início é obrigatória'),
});

export default function EnrollmentForm() {
  const dispath = useDispatch();
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [planSelected, setPlanSelected] = useState();
  const [startDateSelected, setStartDateSelected] = useState();
  const [endDate, setEndDate] = useState();
  const [price, setPrice] = useState();

  async function loadEnrollment() {
    const res = await api.get(`enrollments/${id}`);
    setEnrollment({
      ...res.data,
      endDateFormatted: format(parseISO(res.data.end_date), 'dd/MM/yyyy'),
      priceFormatted: formatCurrencyBR(res.data.price),
    });
  }

  async function loadPlans() {
    const res = await api.get('plans');
    setPlans(res.data.data);
  }

  async function loadStudents(value) {
    const res = await api.get('students', {
      params: {
        name: value,
        page: 1,
        perPage: 10,
      },
    });

    const data = res.data.data.map(student => ({
      id: student.id,
      title: student.name,
    }));

    setStudents(data);

    return new Promise(resolve => {
      resolve(data);
    });
  }

  useMemo(() => {
    // console.log(startDateSelected, planSelected);

    if (startDateSelected && planSelected) {
      // console.log('Start Date:', startDateSelected);
      const end_date = addMonths(startDateSelected, planSelected.duration);
      const price = planSelected.price * planSelected.duration;
      setEndDate(end_date);
      setPrice(price);

      setEnrollment({
        ...enrollment,
        endDateFormatted: format(end_date, 'dd/MM/yyyy'),
        priceFormatted: formatCurrencyBR(price),
      });
    }
  }, [startDateSelected, planSelected]); // eslint-disable-line

  useEffect(() => {
    if (id) {
      loadEnrollment();
    }
  }, [id]);

  useEffect(() => {
    loadPlans();
  }, []);

  function handleSubmit(data) {
    console.tron.log('Values:', {
      ...data,
      start_date: parseISO(data.start_date),
      price,
      end_date: endDate,
    });

    dispath(
      enrollmentsSaveRequest({
        ...data,
        start_date: parseISO(data.start_date),
        price,
        end_date: endDate,
      })
    );
    // resetForm();
  }
  return (
    <Container>
      <HeaderPage>
        <Title>
          {id > 0 ? 'Edição de Matrículas' : 'Cadastro de Matrículas'}
        </Title>
        <Controls>
          <ButtonLink to="/matriculas" color={colors.second}>
            <MdArrowBack size={24} color="#fff" />
            <span>Voltar</span>
          </ButtonLink>
          <Button type="submit" form="formEnrollment">
            <MdDone size={24} color="#fff" />
            <span>Salvar</span>
          </Button>
        </Controls>
      </HeaderPage>

      <Panel>
        <Form
          id="formEnrollment"
          initialData={enrollment}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Label>ALUNO</Label>
          <ReactSelectAsync
            // label="Aluno"
            name="student_id"
            options={students}
            asyncFunc={loadStudents}
          />

          <Row>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>PLANO</Label>
                <ReactSelect
                  // label="plano"
                  placeholder="Selecione..."
                  name="plan_id"
                  options={plans}
                  onChange={e => setPlanSelected(e)}
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE INÍCIO</Label>
                <Input
                  name="start_date"
                  type="date"
                  onChange={e => setStartDateSelected(parseISO(e.target.value))}
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE TÉRMINO</Label>
                <Input
                  disabled
                  name="endDateFormatted"
                  value={enrollment.endDateFormatted}
                  placeholder="Témino"
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>VALOR FINAL</Label>
                <Input
                  disabled
                  name="priceFormatted"
                  value={enrollment.priceFormatted}
                />
              </FormGroup>
            </Column>
          </Row>

          {/* <MaskInput name="date" mask="99/99/9999" /> */}

          {/* <DatePicker name="date" options={{ format: 'yyyy-mm-dd' }} /> */}
          {/* 
          <ReactSelect
            name="tech"
            options={[
              { id: 'react', title: 'ReactJS' },
              { id: 'node', title: 'NodeJS' },
              { id: 'rn', title: 'React Native' },
            ]}
          /> */}
        </Form>
      </Panel>
    </Container>
  );
}
