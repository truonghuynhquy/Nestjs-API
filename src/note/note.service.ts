import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  async getNotes(userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
    return notes;
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaService.note.findFirstOrThrow({
      where: {
        id: noteId,
      },
    });
    return note;
  }

  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDTO,
        userId,
      },
    });
    return note;
  }

  updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to Update');
    }
    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: { ...updateNoteDTO },
    });
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
    return note;
  }
}
