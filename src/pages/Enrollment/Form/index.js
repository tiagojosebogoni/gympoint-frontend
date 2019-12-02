import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
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
import Select from '~/components/Select';
import SelectAsync from '~/components/SelectAsync';

import api from '~/services/api';

import { formatCurrencyBR } from '~/util';
import { enrollmentsSaveRequest } from '~/store/modules/enrollment/actions';
import Input from '~/components/Input';
import DatePicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  student_id: Yup.number().required('O Aluno é obrigatório'),
  plan_id: Yup.number().required('O Plano é obrigatório'),
  start_date: Yup.date().required('A data de início é obrigatória'),
});

export default function EnrollmentForm() {
  const dispath = useDispatch();
  const { id } = useParams();

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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (studentSelected && planSelected) {
  //     const dataSubmit = {
  //       student_id: studentSelected.id,
  //       plan_id: planSelected.id,
  //       start_date: parseISO(startDate),
  //       price, // será calculado pela api
  //       end_data: endDate, // será calculado pela api
  //     };

  //     console.log('Values:', dataSubmit);
  //     dispath(enrollmentsSaveRequest(dataSubmit));
  //   }
  // }
  function handleSubmit(data) {
    console.log('DATA', data);
  }

  useMemo(() => {
    if (startDate && planSelected) {
      let end;

      if (startDate.length === 10) {
        const startDateParser = parseISO(startDate);
        end = addMonths(startDateParser, planSelected.duration);

        setStartDate(startDateParser);
      } else {
        end = addMonths(startDate, planSelected.duration);
      }

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
          <Button
            type="submit"
            label="Salvar"
            icon={<MdDone size={24} color="#fff" />}
            form="formEnrollment"
          ></Button>
        </Controls>
      </HeaderPage>

      <Panel>
        <Form schema={schema} id="formEnrollment" onSubmit={handleSubmit}>
          <Label>ALUNO</Label>
          <SelectAsync
            placeholder="Digite o nome do aluno..."
            noOptionsMessage={() => 'Nenhum registro localizado'}
            cacheOptions
            name="student_id"
            loadOptions={loadStudents}
            value={enrollment.student}
            onChange={e => setStudentSelected(e)}
          />
          <Row>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>PLANO</Label>
                <Select
                  name="plan_id"
                  placeholder="Selecione..."
                  noOptionsMessage={() => 'Nenhum registro localizado'}
                  cacheOptions
                  options={plans}
                  value={enrollment.plan}
                  getOptionLabel={option => option.title}
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
                  onChange={e => setStartDate(e.target.value)}
                  value={enrollment.start_date}
                  // value={startDate}
                /> */}
                <DatePicker
                  name="start_date"
                  value={startDate}
                  onChange={e => setStartDate(e)}
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>DATA DE TÉRMINO</Label>
                <Input name="end_date" disabled value={endDateFormatted} />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="3">
              <FormGroup>
                <Label>VALOR FINAL</Label>
                <Input name="price" disabled value={priceFormatted} />
              </FormGroup>
            </Column>
          </Row>
        </Form>
      </Panel>
    </Container>
  );
}
