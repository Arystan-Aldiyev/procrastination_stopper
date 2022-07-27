import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const Random = ({ taskTime, value }) => {


  return (
    <ul className='itemList'>
      <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
      <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
      <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
    </ul>
  )
}