import { Injectable } from '@nestjs/common';
import Sharp from 'sharp';
import path from 'path';
import shortid from 'shortid';
import fs from 'fs';
import { ZipService } from '@app/zip';

@Injectable()
export class AppService {
  constructor(private readonly zipService: ZipService) {}

  /**
   * @param {Express.Multer.File[]} files: images to convert
   * @returns {Promise}
   */
  async convertImagesToWebp(files: Express.Multer.File[]): Promise<string> {
    const id = shortid.generate();
    const sourceDir = `upload/${id}`;
    const outPath = sourceDir + '.zip';

    await this.createDirectory(sourceDir);
    await this.convertImages(files, id);
    await this.zipService.zipDirectory(sourceDir, outPath);

    return outPath;
  }

  /**
   * @param {Express.Multer.File[]} files: images to convert
   * @returns {Promise}
   */
  async convertImages(files: Express.Multer.File[], id: string): Promise<void> {
    for (const file of files) {
      const filename = path.parse(file.originalname).name;
      const filepath = `upload/${id}/${filename}.webp`;
      await Sharp(file.buffer).webp({ lossless: true }).toFile(filepath);
    }
  }

  /**
   * @param {String} path: /some/folder/to/create
   * @returns {Promise}
   */
  private async createDirectory(path: string): Promise<void> {
    return fs.promises.mkdir(path);
  }
}
