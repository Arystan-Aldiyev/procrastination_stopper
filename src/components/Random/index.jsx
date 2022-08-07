import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export const Random = ({ taskTime, value }) => {


  return (
    <>
      {
        1 <= value & value <= 5 ? (
          <ul className='itemList'>
            <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
            <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
            <li>{taskTime[value][Math.floor(Math.random() * taskTime[value].length)].task}</li>
          </ul>
        ) : (
          null
        )
      }
      {
        6 <= value & value <= 10 ? (
          <ul className='itemList'>
            <li>{taskTime[6][Math.floor(Math.random() * taskTime[6].length)].task}</li>
            <li>{taskTime[6][Math.floor(Math.random() * taskTime[6].length)].task}</li>
            <li>{taskTime[6][Math.floor(Math.random() * taskTime[6].length)].task}</li>
          </ul>
        ) : (
          null
        )}
      {
        11 <= value & value <= 19 ? (
          <ul className='itemList'>
            <li>{taskTime[11][Math.floor(Math.random() * taskTime[11].length)].task}</li>
            <li>{taskTime[11][Math.floor(Math.random() * taskTime[11].length)].task}</li>
            <li>{taskTime[11][Math.floor(Math.random() * taskTime[11].length)].task}</li>
          </ul>
        ) : (
          null
        )}
      {
        20 <= value & value <= 29 ? (
          <ul className='itemList'>
            <li>{taskTime[20][Math.floor(Math.random() * taskTime[20].length)].task}</li>
            <li>{taskTime[20][Math.floor(Math.random() * taskTime[20].length)].task}</li>
            <li>{taskTime[20][Math.floor(Math.random() * taskTime[20].length)].task}</li>
          </ul>
        ) : (
          null
        )}
      {
        30 <= value & value <= 59 ? (
          <ul className='itemList'>
            <li>{taskTime[30][Math.floor(Math.random() * taskTime[30].length)].task}</li>
            <li>{taskTime[30][Math.floor(Math.random() * taskTime[30].length)].task}</li>
            <li>{taskTime[30][Math.floor(Math.random() * taskTime[30].length)].task}</li>
          </ul>
        ) : (
          null
        )}
      {
        60 <= value & value <= 89 ? (
          <ul className='itemList'>
            <li>{taskTime[60][Math.floor(Math.random() * taskTime[60].length)].task}</li>
            <li>{taskTime[60][Math.floor(Math.random() * taskTime[60].length)].task}</li>
            <li>{taskTime[60][Math.floor(Math.random() * taskTime[60].length)].task}</li>
          </ul>
        ) : (
          null
        )}
      {
        90 <= value & value <= 120 ? (
          <ul className='itemList'>
            <li>{taskTime[90][Math.floor(Math.random() * taskTime[90].length)].task}</li>
            <li>{taskTime[90][Math.floor(Math.random() * taskTime[90].length)].task}</li>
            <li>{taskTime[90][Math.floor(Math.random() * taskTime[90].length)].task}</li>
          </ul>
        ) : (
          null
        )}
    </>

  )
}