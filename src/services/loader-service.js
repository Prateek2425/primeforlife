export function loadingReducer(state = { loading: false }, action) {
    switch (action.type) {
      case SHOW:
        return {
          ...state,
          loading: true,
        };
      case HIDE:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }

  export default function loadingMiddleware(config) {
    const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes;
    return ({ dispatch }) => next => action => {
      if (action.type) {
        const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes;
        const isPending = new RegExp(`${PENDING}$`, 'g');
        const isFulfilled = new RegExp(`${FULFILLED}$`, 'g');
        const isRejected = new RegExp(`${REJECTED}$`, 'g');
        if (action.type.match(isPending)) {
          dispatch(showLoading());
        } else if (
          action.type.match(isFulfilled) ||
          action.type.match(isRejected)
        ) {
          dispatch(hideLoading());
        }
      }
      return next(action);
    };
  }