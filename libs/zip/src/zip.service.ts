import { Injectable } from '@nestjs/common';
import archiver from 'archiver';
import fs from 'fs';

@Injectable()
export class ZipService {
  /**
   * @param {String} sourceDir: /some/folder/to/compress
   * @param {String} outPath: /path/to/created.zip
   * @returns {Promise}
   */
  zipDirectory(sourceDir, outPath): Promise<void> {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
      archive
        .directory(sourceDir, false)
        .on('error', (err) => reject(err))
        .pipe(stream);

      stream.on('close', () => resolve());
      archive.finalize();
    });
  }
}
