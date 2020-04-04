import React from 'react';
import { useQuery } from "@/hooks/useQuery";
import { LIST_SPENDING } from "@/graphql/spending";
import Spending from './Spending';
import Container from './Container';

export type SpendingListRouteProps = undefined;

export default () => {

  const { data: { spendingList } = {}, loading, refetch } = useQuery(LIST_SPENDING);

  return (
    <Container loading={loading} refresh={refetch}>
      {spendingList && spendingList.map((spending => (
        <Spending spending={spending} />
      )))}
    </Container>
  )
};
