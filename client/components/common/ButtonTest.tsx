import React from 'react'
import ButtonComponent from './ButtonComponent'
import {Color} from '../../types/bulma'

const buttonColors: Color[] = [
  'primary',
  'link',
  'info',
  'success',
  'warning',
  'danger',
  'dark',
  'text',
]

const ButtonTest: React.FC = () => {
  return (
    <div style={{padding: '1rem'}}>
      <div style={{padding: '1rem'}}>
        <h2
          style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}
        >
          default ButtonComponent
        </h2>
        {buttonColors.map((color, index) => (
          <ButtonComponent
            color={color}
            key={index}
            submit={false}
            onClick={() => console.log(`${color} button clicked.`)}
          >
            {color}
          </ButtonComponent>
        ))}
      </div>
      <div style={{padding: '1rem'}}>
        <h2
          style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}
        >
          default + size small
        </h2>
        {buttonColors.map((color, index) => (
          <ButtonComponent
            color={color}
            key={index}
            size="small"
            submit={false}
            onClick={() => console.log(`${color} button clicked.`)}
          >
            {color}
          </ButtonComponent>
        ))}
      </div>
      <div style={{padding: '1rem'}}>
        <h2
          style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}
        >
          default + size medium
        </h2>
        {buttonColors.map((color, index) => (
          <ButtonComponent
            color={color}
            key={index}
            size="medium"
            submit={false}
            onClick={() => console.log(`${color} button clicked.`)}
          >
            {color}
          </ButtonComponent>
        ))}
      </div>
      <div style={{padding: '1rem'}}>
        <h2
          style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}
        >
          default + outlined true
        </h2>
        {buttonColors.map((color, index) => (
          <ButtonComponent
            color={color}
            key={index}
            outlined={true}
            submit={false}
            onClick={() => console.log(`${color} button clicked.`)}
          >
            {color}
          </ButtonComponent>
        ))}
      </div>
    </div>
  )
}

export default ButtonTest
