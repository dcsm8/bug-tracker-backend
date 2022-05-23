import { CreateTaskDto } from './dto/create-task.dto';

export type CreateTaskPreview = Omit<CreateTaskDto, 'assignedToId'>;
