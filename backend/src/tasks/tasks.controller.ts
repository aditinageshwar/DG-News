import { Controller, Get, Post, Patch, Body, Query, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Make sure this path exists

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
findAll(@Query('status') status: string, @Request() req) {
  return this.tasksService.findAll(req.user.userId, status);
}

@Post()
create(@Body() createTaskDto: any, @Request() req) {
  return this.tasksService.create(
    createTaskDto.title, 
    createTaskDto.description, 
    req.user.userId 
  );
}

  @Patch(':id/toggle')
  toggleStatus(@Param('id') id: string) {
    return this.tasksService.toggleStatus(id);
  }
}