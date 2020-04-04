import React from "react";
import { Container, ActionButton, ActionButtonIcon } from './styles';
import { SpendingForm } from "@/store";
import { useDispatch } from "react-redux";



export default () => {
  const dispatch = useDispatch();

  return (
    <Container onPress={() => dispatch(SpendingForm.show(true))}>
      <ActionButton>
        <ActionButtonIcon name="add" size={48} type={'material'}/>
      </ActionButton>
    </Container>
  )
}
