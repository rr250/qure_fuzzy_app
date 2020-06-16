import React, { Fragment } from 'react';
import Form from './Form';
import Contacts from './Contacts';
import Search from './Search';

export default function Dashboard() {
  return (
    <Fragment>
      <br/>
      <br/>
      <Search />
      <br/>
      <Contacts />
      <br/>
      <Form />
    </Fragment>
  );
}
