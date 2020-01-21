import React from 'react'
import { View } from "react-native";
import { CostContainer, Currency, Decimal, Value } from "./styles";

export default ({ spending }) => {

  const [value, decimal] = React.useMemo(() => {
    return String(spending.value).split('.')
  }, [spending.value]);


  return (
      <CostContainer>
        <Currency>R$</Currency>
        <Value>{value}</Value>
        <Decimal>,{decimal}</Decimal>
      </CostContainer>
  )
}
