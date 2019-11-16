import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { MdDone } from 'react-icons/md';

import colors from '~/styles/colors';
import { Container, Row, Column } from '~/components/Grid';
import Title from '~/components/Title';
import { HeaderPage } from '~/components/HeaderPage/styles';
import { Controls } from '~/components/Controls/styles';
import ButtonLink from '~/components/ButtonLink';
import Button from '~/components/Button';
import { Panel } from '~/components/Panel/styles';
import Label from '~/components/Label';
import { FormGroup } from '~/components/FormGroup/styles';

import Info from '~/components/Info';
import api from '~/services/api';

import { formatCurrencyBR } from '~/util';
import { enrollmentsSaveRequest } from '~/store/modules/enrollment/actions';

export default function EnrollmentForm() {
  const dispath = useDispatch();
  const { id } = useParams();

  // const [enrollment, setEnrollment] = useState({
  //   status: true,
  //   id: 1,
  //   student_id: 1,
  //   plan_id: 2,
  //   start_date: '2019-12-01T12:00:00.000Z',
  //   end_date: '2020-03-01T13:00:00.000Z',
  //   price: '180.00',
  //   createdAt: '2019-11-15T14:00:09.254Z',
  //   updatedAt: '2019-11-15T14:00:09.254Z',
  //   student: { id: 1, name: 'David Faria' },
  //   plan: {
  //     total: 180,
  //     id: 2,
  //     title: 'Silver',
  //     duration: 3,
  //     price: '60.00',
  //   },
  // });

  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentSelected, setStudentSelected] = useState({});
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [planSelected, setPlanSelected] = useState(null);
  const [endDateFormatted, setEndDateFormatted] = useState(null);
  const [priceFormatted, setPriceFormatted] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [price, setPrice] = useState(null);

  async function loadEnrollment(id) {
    const res = await api.get(`enrollments/${id}`);

    const data = res.data;

    // const data = {
    //   status: true,
    //   id: 1,
    //   student_id: 1,
    //   plan_id: 2,
    //   start_date: '2019-12-01T12:00:00.000Z',
    //   end_date: '2020-03-01T13:00:00.000Z',
    //   price: '180.00',
    //   createdAt: '2019-11-15T14:00:09.254Z',
    //   updatedAt: '2019-11-15T14:00:09.254Z',
    //   student: { id: 1, name: 'David Faria' },
    //   plan: {
    //     total: 180,
    //     id: 2,
    //     title: 'Silver',
    //     duration: 3,
    //     price: '60.00',
    //   },
    // };

    setEnrollment(data);
    setStartDate(format(parseISO(data.start_date), 'yyyy-MM-dd'));
    setStudentSelected(data.student);
    setPlanSelected(data.plan);
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

    const data = res.data.data;
    setStudents(data);

    return new Promise(resolve => {
      resolve(data);
    });
  }

  useEffect(() => {
    if (id) {
      loadEnrollment(id);
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (studentSelected && planSelected) {
      const dataSubmit = {
        student_id: studentSelected.id,
        plan_id: planSelected.id,
        start_date: parseISO(startDate),
        // price, // será calculado pela api
        // end_data: endDate, // será calculado pela api
      };

      console.log('Values:', dataSubmit);
      dispath(enrollmentsSaveRequest(dataSubmit));
    }
  }

  useMemo(() => {
    if (startDate && planSelected) {
      const end = addMonths(parseISO(startDate), planSelected.duration);
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

  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

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
        <form id="formEnrollment" onSubmit={handleSubmit}>
          <Label>ALUNO</Label>
          <AsyncSelect
            cacheOptions
            name="student_id"
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            // defaultValue={enrollment.student}
            value={enrollment.student}
            onChange={e => setStudentSelected(e)}
          />
          {/* <input value={JSON.stringify(enrollment.student)} /> */}
          <Row>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>PLANO</Label>
                {/* <AsyncSelect
                  cacheOptions
                  name="plan_id"
                  defaultOptions={plans}
                  options={loadPlans}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.title}
                  // defaultValue={enrollment.plan}
                  onChange={e => setPlanSelected(e)}
                /> */}
                <Select
                  cacheOptions
                  options={plans}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.title}
                  // defaultOptions={planSelected}
                  // defaultValue={enrollment.plan}
                  value={enrollment.plan}
                  onChange={e => setPlanSelected(e)}
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE INÍCIO</Label>
                {/* <DatePicker
                  name="start_date"
                  selected={new Date()}
                  onSelect={e => setStartDate(e)}
                /> */}
                <input
                  type="date"
                  onChange={e => setStartDate(e.target.value)}
                  value={startDate}
                />
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
        </form>
      </Panel>
    </Container>
  );
}
