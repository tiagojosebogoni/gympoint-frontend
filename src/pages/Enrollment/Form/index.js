import React, { useEffect, useState, useMemo } from 'react';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Form, Input } from '@rocketseat/unform';
// import { useDispatch } from 'react-redux';
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
import ReactSelect from '~/components/ReactSelect';
import ReactSelectAsync from '~/components/SelectAsync';
import DatePicker from '~/components/DatePicker';
import Info from '~/components/Info';
import api from '~/services/api';

import { formatCurrencyBR, formatCurrency } from '~/util';

const schema = Yup.object().shape({
  student_id: Yup.number().required('O Aluno é obrigatório'),
  plan_id: Yup.number().required('O plano é obrigatório'),
  start_date: Yup.date().required('A data de início é obrigatória'),
});

export default function EnrollmentForm() {
  // const dispath = useDispatch();
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [planSelected, setPlanSelected] = useState(null);

  const [endDateFormatted, setEndDateFormatted] = useState(null);
  const [priceFormatted, setPriceFormatted] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);

  async function loadEnrollment() {
    const res = await api.get(`enrollments/${id}`);
    setEnrollment(res.data);
  }

  async function loadPlans() {
    const res = await api.get('plans');
    const data = res.data.data.map(plan => ({
      ...plan,
      title: `${plan.title} - ${formatCurrencyBR(plan.price)} / ${
        plan.duration
      } (${plan.duration === 1 ? 'Mês' : 'Meses'})`,
    }));
    setPlans(data);
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

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    if (id) {
      loadEnrollment();
    }
  }, [id]);

  function handleSubmit(data) {
    const dataSubmit = {
      ...data,
      price,
      end_data: endDate,
    };

    console.tron.log('Values:', dataSubmit);
    // dispath(enrollmentsSaveRequest(dataSubmit));
  }

  useMemo(() => {
    if (startDate && planSelected) {
      const end = addMonths(startDate, planSelected.duration);
      setEndDate(end);
      setEndDateFormatted(
        format(end, 'dd/MM/yyyy', {
          locale: pt,
        })
      );

      const price = planSelected.duration * planSelected.price;
      setPrice(price);
      setPriceFormatted(formatCurrencyBR(price));
    }
  }, [startDate, planSelected]);

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
            placeholder="Selecione..."
            name="student_id"
            options={students}
            asyncFunc={loadStudents}
          />

          <Row>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>PLANO</Label>
                <ReactSelect
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
                {/* <Input
                  name="start_date"
                  type="date"
                  onChange={e => setStartDateSelected(parseISO(e.target.value))}
                /> */}

                <DatePicker name="start_date" onSelect={e => setStartDate(e)} />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE TÉRMINO</Label>
                <Info>{endDateFormatted}</Info>
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>VALOR FINAL</Label>
                <Info>{priceFormatted}</Info>
              </FormGroup>
            </Column>
          </Row>
        </Form>
      </Panel>
    </Container>
  );
}
