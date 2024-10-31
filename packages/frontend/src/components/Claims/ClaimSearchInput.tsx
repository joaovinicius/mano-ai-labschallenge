import { TextInput } from '@mantine/core';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchClaims } from '~/services/claimsService';
import store from "~/stores/claimStore";
import { observer } from "mobx-react-lite";

export function ClaimSearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const textRef = useRef<string>(searchParams.get('q') || '');

  const updateSearchParams = useCallback(
    throttle((value) => {
      if (value) {
        setSearchParams({ q: value });
      } else {
        setSearchParams((params) => {
          params.delete('q');
          return params;
        });
      }
      store.clear()
      getSearchClaims(value).then((response) => {
        store.setClaims(response.data);
      });
    }, 300),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current = event.target.value ?? '';
    updateSearchParams(textRef.current);
  };

  useEffect(() => {
      return () => {
        updateSearchParams.cancel();
      };
  }, [updateSearchParams]);

  useEffect(() => {
    store.clear()
    getSearchClaims(searchParams.get('q') ?? '').then((response) => {
      store.setClaims(response.data);
    });
  }, []);

  return (
    <TextInput placeholder="Search for a claim"
      onChange={handleChange}
      defaultValue={textRef.current}
      size='md'
    />
  )
}

const ClaimSearchInputObserver = observer(ClaimSearchInput);

export default ClaimSearchInputObserver;