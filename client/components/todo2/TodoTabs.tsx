import React from 'react'
import {TabType} from '../../enums/todo2'
import {Panel as BPanel} from 'react-bulma-components'
import {TodoTab} from './'

interface IProps {
  type: TabType
  handleClickTab: (type: TabType) => void
}

const TodoTabs: React.FC<IProps> = ({type, handleClickTab}) => {
  return (
    <BPanel.Tabs>
      <TodoTab
        active={TabType.ALL === type}
        handleClick={() => handleClickTab(TabType.ALL)}
      >
        전체
      </TodoTab>
      <TodoTab
        active={TabType.TODO === type}
        handleClick={() => handleClickTab(TabType.TODO)}
      >
        할일
      </TodoTab>
      <TodoTab
        active={TabType.DONE === type}
        handleClick={() => handleClickTab(TabType.DONE)}
      >
        완료
      </TodoTab>
    </BPanel.Tabs>
  )
}

export default TodoTabs
