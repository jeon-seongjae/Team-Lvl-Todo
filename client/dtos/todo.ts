import {Transform, Expose, Exclude} from 'class-transformer'
// import 'reflect-metadata'

enum TodoStatus {
  IN_PROGRESS,
  DONE,
}

@Exclude()
export class TodoDto {
  @Expose({name: 'id'})
  id?: number = 0

  @Expose({name: 'content'})
  text: string = ''

  @Transform(({value}) => value === TodoStatus.DONE)
  @Expose({name: 'status'})
  done: boolean = false
}
