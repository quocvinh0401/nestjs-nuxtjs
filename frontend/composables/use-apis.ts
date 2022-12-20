import { Builder } from 'builder-pattern';
import { serialize } from '~/libraries/utilities';
import { ApiOptions } from '~/shared/interface';

export const useApi = (
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE',
  options: ApiOptions,
  ..._paths: string[]
) => {
  const { $config } = useNuxtApp();
  //   const authenticationState = useAuthentication()
  const route = useRoute();

  //   const setLoading = useLoading()[1]

  const { apiBaseUrl } = $config;
  const requestInit: RequestInit = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      source: route.fullPath,
    },
  };

  //   if (authenticationState.value.jwt) {
  //     requestInit.headers = {...requestInit.headers,Authorization: `Bearer ${authenticationState.value.jwt}`}
  //   }

  const defaultOptions = Builder<ApiOptions>()
    .loading(true)
    .alert({
      is: true,
      title: {
        GET: '조회',
        PUT: '변경',
        PATCH: '반영',
        POST: '저장',
        DELETE: '삭제',
      },
    })
    .build();

  //   const addToast = useToasts()[1]

  options = { ...defaultOptions, ...options };
  if (typeof options.alert?.title === 'string') {
    const _ = options.alert.title;
    options.alert.title = { GET: _, PUT: _, PATCH: _, POST: _, DELETE: _ };
  }

  return async (
    ...pathsAndParms: (string | { [key: string]: any })[]
  ): Promise<any> => {
    let paths =
      apiBaseUrl + (_paths && _paths.length > 0) ? '/' + _paths.join('/') : '';
    let body = {};
    pathsAndParms.forEach((element) => {
      if (element instanceof Object) {
        if ('headers' in element) {
          requestInit.headers = { ...requestInit.headers, ...element.headers };
        } else if (Array.isArray(element)) {
          body = element;
        } else body = { ...body, ...element };
      } else {
        paths += '/' + element;
      }
    });

    let input: RequestInfo = apiBaseUrl + paths;
    if (body && Object.keys(body).length > 0) {
      if (method == 'GET') {
        input += '?' + serialize(body);
      } else if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
        requestInit.body = JSON.stringify(body);
      }
    }
    // if (options.loading) setLoading(true)
    // return await fetch(input, requestInit).then(res => res.json());
    const res = await fetch(input, requestInit);
    // setLoading(false)
    let json: any = null;
    try {
      json = await res.json();
    } catch (err) {
      console.log('==================================>>>>', err);
    }
    // if (options.alert?.is) {
    //   const title = typeof options.alert.title == 'string' ? options.alert.title : options.alert.title?.[method]
    //   if (res.ok) addToast({ title, message: `${title} 되었습니다`, type: 'success' })
    //   else addToast({ title: `${title}오류`, message: json['message'], type: 'error' })
    // }
    if (res.ok && json) return json;
    else if (!res.ok) throw json;
  };
};

export const useGet = <T>(..._paths: (string | ApiOptions)[]) => {
  const paths = [] as string[];
  let options: ApiOptions = {};
  _paths.forEach((d) => {
    if (typeof d === 'string') paths.push(d);
    else options = d;
  });
  const api = useApi('GET', options, ...paths);

  return async (...pathsAndParms: (string | Partial<T>)[]): Promise<T | Record<string, never>> =>
    await api(...pathsAndParms);
};

export const usePost = <T>(..._paths: (string | ApiOptions)[]) => {
  const paths = [] as string[];
  let options: ApiOptions = {};
  _paths.forEach((d) => {
    if (typeof d === 'string') paths.push(d);
    else options = d;
  });
  const api = useApi('POST', options, ...paths);

  return async (...pathsAndParms: (string | Partial<T>)[]): Promise<T | Record<string, never>> =>
    await api(...pathsAndParms);
};

export const usePatch = <T>(..._paths: (string | ApiOptions)[]) => {
  const paths = [] as string[];
  let options: ApiOptions = {};
  _paths.forEach((d) => {
    if (typeof d === 'string') paths.push(d);
    else options = d;
  });
  const api = useApi('PATCH', options, ...paths);

  return async (...pathsAndParms: (string | Partial<T>)[]): Promise<T | Record<string, never>> =>
    await api(...pathsAndParms);
};
