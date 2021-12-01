import React from 'react'
import CheckBox from './CheckBox'

const CheckBoxTest: React.FC = () => {
  return (
    <div style={{padding: '1rem'}}>
      <CheckBox isChecked={false} />
      <CheckBox isChecked={true} />
    </div>
  )
}

export default CheckBoxTest
