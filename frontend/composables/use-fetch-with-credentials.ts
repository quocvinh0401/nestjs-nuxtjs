import { Query } from '~/shared/interface';
import { Ref } from 'vue';
import { AsyncDataOptions } from 'nuxt/dist/app';
import { serialize } from '~/libraries/utilities';
import { hash } from 'ohash';

export const useFetchWithCredentials = <T>(
  url: string,
  options?: any,
  query?: Ref<Query>,
) => {
  const { $config } = useNuxtApp();
  const route = useRoute();
  const authenticationState  = useAuthentication()

  const { initialize, ...rest } = options ?? [];

  const asyncDataOptions: AsyncDataOptions<T> = {
    lazy: false,
  };

  const opts = computed(() => {
    const _ = {
      baseUrl: $config.apiBaseUrl,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        source: route.fullPath,
      },
      ...rest,
    };
    if (authenticationState.value.authenticated){
      _.headers['Authorization'] = `Bearer ${authenticationState.value.jwt}`
    }
    return _

  });

  if (initialize) asyncDataOptions['default'] = initialize;
  else asyncDataOptions['default'] = () => <T>[];

  const urlWithQuery = computed(() =>
    query ? `${url}?${serialize(query.value)} ` : url,
  );
  const key = hash(urlWithQuery.value);
  const _fetch = useAsyncData(
    key,
    () => $fetch(`${$config.apiBaseUrl}/${url}`, opts.value) as Promise<T>,
    asyncDataOptions,
  );

  return _fetch

};
