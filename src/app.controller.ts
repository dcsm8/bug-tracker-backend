import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Response,
  StreamableFile,
  UseGuards,
  Request,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import path from 'path';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

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

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
