import { lsGetToken } from './helper';

export interface FetchOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  additionalHeaders?: any;
  body?: any;
  actionType: string;
}

const fetchHandler = (
  { url, method, body, actionType, additionalHeaders }: FetchOptions,
  successHandler?: (response: any) => void,
  errorHandler?: (response: any) => void
) => {
  return async (dispatch: any) => {
    const token = lsGetToken();
    
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...additionalHeaders
    };
  

    const triggerSuccessHandler = (payload: any) => {
      dispatch({
        type: actionType,
        payload: payload
      });
      successHandler && successHandler(payload);
    };

    const triggerErrorHandler = (error: any) => {
      dispatch({
        type: actionType,
        payload: error
      });
      errorHandler && errorHandler(error);
    };

    const fetchData = async () => {
      try {        
        const request = await fetch(url, {
          method: method,
          body: body,
          headers: {
            ...headers
          }
        });
        
        const status = request.status;
        const response = await request.json();

        if (status && status > 399) {
          triggerErrorHandler(response);
        } else {
          triggerSuccessHandler(response);
        }

        return request;
      } catch (error) {
        const errorObj = {
          error: {
            statusCode: 'FETCH_FAILED',
            message: `${error}`
          }
        };
        triggerErrorHandler(errorObj);
      }
    };

    return {
      type: actionType,
      payload: await fetchData()
    };
  };
};

export default fetchHandler;
