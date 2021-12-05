import React from 'react'
import {Panel as BPanel} from 'react-bulma-components'

interface IProps {
  children: string
  active: boolean
  handleClick: () => void
}

const TodoTab: React.FC<IProps> = ({children, active, handleClick}) => {
  return (
    <BPanel.Tabs.Tab active={active} onClick={() => handleClick()}>
      {children}
    </BPanel.Tabs.Tab>
  )
}

export default TodoTab
