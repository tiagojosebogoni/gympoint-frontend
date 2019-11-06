import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { studentsFailure, studentsSearchSeccess } from './actions';

function* searchStudents({ payload }) {
  try {
    console.tron.log('search: ', payload);

    const { searchName } = payload.data;

    const res = yield call(api.get, 'students', {
      params: {
        name: searchName || '',
      },
    });

    yield put(studentsSearchSeccess(res.data));
  } catch (error) {
    toast.error('Erro pesquisar alunos!');
    yield put(studentsFailure());
  }
}

export default all([
  takeLatest('@student/STUDENT_SEARCH_REQUEST', searchStudents),
]);
