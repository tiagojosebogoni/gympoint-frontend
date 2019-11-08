import React, { useEffect, useState, useRef } from 'react';
import CurrencyInput from 'react-currency-input';
import InputMask from 'react-input-mask';

import { Form, Input, useField } from '@rocketseat/unform';
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

import { plansSaveRequest } from '~/store/modules/plan/actions';
import api from '~/services/api';

// import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título do plano é obrigatório'),
  duration: Yup.number()
    .min(1, 'A duração dever ser no mínimo 1 mês')
    .max(60, 'A duração dever ser no máximo 60 meses')
    .required('A duração em meses é obrigatório'),
  price: Yup.number().required('O preço é obrigatório'),
});

export default function PlanForm() {
  const { id } = useParams();
  const [plan, setPlan] = useState({});
  const dispath = useDispatch();
  const [cep, setCep] = useState(null);
  const [price, setPrice] = useState(null);

  // useEffect(() => {
  //   registerField({
  //     name: fieldName,
  //     ref: ref.current,
  //     path: 'props.value',
  //     clearValue: pickerRef => {
  //       pickerRef.setInputValue(null);
  //     },
  //   });
  // }, [ref.current, fieldName]);

  function handleSubmit(data) {
    console.log('Plano: ', { ...data, cep, price });
    alert('ok');
    // dispath(plansSaveRequest({ ...data, id }));
  }

  useEffect(() => {
    if (id) {
      async function loadPlan() {
        const res = await api.get(`plans/${id}`);
        setPlan(res.data);
      }

      loadPlan();
    }
  }, [id]);

  function handleCep(e) {
    setCep(e.target.value);
  }

  function handlePrice(e) {
    console.log(e);
    // setPrice(e.target.value);
  }

  return (
    <Container>
      <HeaderPage>
        <Title>{id > 0 ? 'Edição de Plano' : 'Cadastro de Plano'}</Title>
        <Controls>
          <ButtonLink to="/planos" color={colors.second}>
            <MdArrowBack size={24} color="#fff" />
            <span>Voltar</span>
          </ButtonLink>
          <Button type="submit" form="formPlan">
            <MdDone size={24} color="#fff" />
            <span>Salvar</span>
          </Button>
        </Controls>
      </HeaderPage>

      <Panel>
        <Form
          id="formPlan"
          initialData={plan}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Input name="id" type="hidden" />
          <Label>TÍTULO DO PLANO</Label>
          <Input name="title" placeholder="Plano Ouro" />

          <Row>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>DURAÇÃO (em meses)</Label>
                <Input type="number" name="duration" placeholder="12 meses" />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>PREÇO MENSAL</Label>
                <Input name="price" placeholder="60,90" />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>PREÇO TOTAL</Label>
                <Input disabled={true} name="total" placeholder="R$ 1000,00" />
              </FormGroup>
            </Column>
          </Row>

          <Label>Cep</Label>
          <InputMask
            onChange={handleCep}
            id="cep"
            name="cep"
            mask="99999-999"
          />

          <Label>Preço</Label>
          <CurrencyInput
            onChange={handlePrice}
            decimalSeparator=","
            thousandSeparator="."
          />
        </Form>
      </Panel>
    </Container>
  );
}
