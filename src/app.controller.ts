import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Response,
  StreamableFile,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import path from 'path';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Response({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    const outPath = await this.appService.convertImagesToWebp(files);
    const filename = path.parse(outPath).base;

    const file = createReadStream(path.join(process.cwd(), outPath));

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(file);
  }
}
