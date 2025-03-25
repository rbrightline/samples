import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { mkdir } from 'fs/promises';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

const UPLOAD_DIRECTORY = './uploads';

@Controller('files')
export class FileUploadController {
  @Post('img/:appId/:ressourceName/:ressourceId')
  @ApiOperation({ summary: 'Upload an image file' }) // Endpoint description
  @ApiConsumes('multipart/form-data') // Specifies the content type
  @ApiParam({
    name: 'appId',
    description: 'Application ID',
    example: 'app',
    required: true,
  })
  @ApiParam({
    name: 'ressourceName',
    description: 'Ressource name',
    example: 'product',
    required: true,
  })
  @ApiParam({
    name: 'ressourceId',
    description: 'Ressource ID',
    example: 1,
    required: true,
  })
  @ApiBody({
    description: 'Image file to upload (max 3MB)',
    schema: {
      type: 'object',
      properties: {
        file: {
          // Must match the field name in FileInterceptor
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File successfully uploaded' })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIRECTORY,
        filename: async (req, file, cb) => {
          const { appId, ressourceName, ressourceId } = req.params;
          await mkdir(
            join(UPLOAD_DIRECTORY, appId, ressourceName, ressourceId),
            { recursive: true }
          );
          // Generate a random name with the original extension

          const randomName = new Date().getTime().toString(36);
          cb(
            null,
            join(
              appId,
              ressourceName,
              ressourceId,
              `${randomName}${extname(file.originalname)}`
            )
          );
        },
      }),
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
      fileFilter(_, file, cb) {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  uploadImage(
    @Param('appId') appId: string,
    @Param('ressourceName') ressourceName: string,
    @Param('ressourceId') ressourceId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded or file is too large');
    }

    // Here you can process the file (save to disk, cloud storage, etc.)
    // For now, we'll just return some file info
    return {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      // In a real application, you might return the file path or URL here
    };
  }
}
