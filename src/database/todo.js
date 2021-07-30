import {Model} from '@nozbe/watermelondb';
import {text, field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Todo extends Model {
  static table = 'todos';

  @text('task') task;
  @field('is_done') isDone;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
