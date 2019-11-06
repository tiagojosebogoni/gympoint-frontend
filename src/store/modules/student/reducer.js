import produce from 'immer';

const INITIAL_STATE = {
  students: [],
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/STUDENT_SEARCH_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@student/STUDENT_SEARCH_SUCCESS': {
        draft.students = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@student/STUDENT_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
        return state;
    }
  });
}
