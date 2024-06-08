import { Controller, Get, Post, Body, Patch, Param, Delete,Res,Query   } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { UUID } from 'crypto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

//   @Get('pdf')
//   async generatePDF(@Res() res: Response) {
//     const users = await this.userService.findAll();
//     const doc = new PDFDocument();

//     let filename = 'users.pdf';
//     res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
//     res.setHeader('Content-type', 'application/pdf');

//     doc.pipe(res);
//     console.log(users)
//     users.forEach(user => {
//       doc.text(`Name: ${user.name}`);
//       doc.text(`Email: ${user.email}`);
//       doc.text(`Phone: ${user.phone}`);
//       doc.text(`Address: ${user.address}`);
//       doc.moveDown();
//     });

//     doc.end();
//     console.log(doc)
//   }
// @Get(':filename')
// createPdf(@Res() res: Response, @Query('data') data: string) {
//     const jsonData = JSON.parse(data)[0];
//     console.log(jsonData)
//     const doc = new PDFDocument();
//     let buffers = [];

//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => {
//       const pdfData = Buffer.concat(buffers);
//       res.setHeader('Content-Type', 'application/pdf');
//       res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
//       res.send(pdfData);
//     });

//     doc.fontSize(25).text('Generated PDF', {
//       align: 'center',
//     });

//     doc.moveDown();
//     doc.fontSize(12).text(`Name: ${jsonData.name}`);
//     doc.text(`Phone: ${jsonData.phone}`);
//     doc.text(`Address: ${jsonData.address}`);

//     doc.end();
//   }

@Get('pdf')
  async generatePDF(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      const doc = new PDFDocument();
      let filename = 'users.pdf';

      res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-type', 'application/pdf');

      doc.pipe(res);

      users.forEach(user => {
        doc.text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Phone: ${user.phone}`);
        doc.text(`Address: ${user.address}`);
        doc.moveDown();
      });

      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error.message);
      res.status(500).send('Internal Server Error');
    }
  }
}
