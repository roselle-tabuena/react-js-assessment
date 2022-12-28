import { useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { contactActions } from "../store/index";

function responseReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      message: null, 
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      message: action.message, 
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      message: action.message, 
      status: 'completed',
    };
  }

  return state;
}

function useResponse(requestFunction, startWithPending = false, action_type) {
  const use_dispatch = useDispatch();

  const [httpState, dispatch] = useReducer(responseReducer, {
                                            status: startWithPending ? 'pending' : null,
                                            data: null,
                                            message: null,
                                            error: null,
                                          });

  const sendRequest = useCallback(
    async function (requestData = null, obj = null) {
      dispatch({ type: 'SEND' });
      try {

        let message = null
        const responseData = await requestFunction(requestData, obj);

        if (action_type === 'FETCH_ALL') {
          use_dispatch(contactActions.populateContacts(responseData));
        }

        if (action_type === 'REMOVE') {
          use_dispatch(contactActions.removeContact(requestData));
        }

        if (action_type === 'ADD_CONTACT') {

          message = 'Contact was successfully added.'
          use_dispatch(contactActions.addContact(responseData));
        }

        if (action_type === 'UPDATE_CONTACT') {

          responseData['id'] = requestData

          message = 'Contact was successfully updated.'
          use_dispatch(contactActions.updateContact(responseData))
        }

        dispatch({ type: 'SUCCESS', responseData, message });

      } catch (error) {

        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });

      }
    },
    [requestFunction, use_dispatch, action_type]
  );

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return {
    sendRequest,
    ...httpState,
    reset 
  };
}

export default useResponse;
