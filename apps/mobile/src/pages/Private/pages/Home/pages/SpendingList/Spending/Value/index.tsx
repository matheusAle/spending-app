import { Text } from '@ui-kitten/components';
import React from 'react'
import { CostContainer, Currency, Decimal, Value } from "./styles";

export default ({ spending }) => {

  const [value, decimal] = React.useMemo(() => {
    const [value, decimal = ''] = String(spending.value).split('.');

    if (decimal.length === 1) {
      return [value, `${decimal}0`];

    } else if (decimal.length === 0) {
      return [value, `00`];
    }

    return [value, decimal];
  }, [spending.value]);


  return (
      <CostContainer>
        <Currency category={'c1'}>R$</Currency>
        <Value category={'h2'}>{value}</Value>
        <Decimal category={'c1'}>,{decimal}</Decimal>
      </CostContainer>
  )
}
