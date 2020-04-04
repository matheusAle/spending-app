import React from 'react';
import { LinkGroup } from './styles'
import Container from './Container';
import OpenFormFAB from './OpenFormFAB';
import Link from './Link';

export default () => {

  return (
    <Container>

      <LinkGroup>
        <Link icon="home" route="SpendingList" active={true}/>
        <Link icon="search" route="Search"/>
      </LinkGroup>

      <OpenFormFAB />

      <LinkGroup>
        <Link icon="timeline" route="Reports"/>
        <Link icon="person" route="User"/>
      </LinkGroup>

    </Container>
  )
};
