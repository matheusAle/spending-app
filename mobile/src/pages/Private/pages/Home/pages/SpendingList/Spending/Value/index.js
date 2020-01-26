import React from 'react'
import { View } from "react-native";
import { CostContainer, Currency, Decimal, Value } from "./styles";

export default ({ spending }) => {

  const [value, decimal] = React.useMemo(() => {
    const [value, decimal] = String(spending.value).split('.')

    if (decimal.length === 1) {
      return [value, `${decimal}0`]
    }

    return [value, decimal];
  }, [spending.value]);


  return (
      <CostContainer>
        <Currency>R$</Currency>
        <Value>{value}</Value>
        <Decimal>,{decimal}</Decimal>
      </CostContainer>
  )
}
