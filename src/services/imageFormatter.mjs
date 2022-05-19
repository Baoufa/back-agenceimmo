import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

const imageFormatter = (imageBuffer) => {

  return sharp(imageBuffer)
  .toFormat('png')
  .resize({ width: 100 })
  .greyscale()
  .toBuffer()
  .then(formattedData => {
    let result = {};
    result.data = formattedData;
    result.name = `${uuidv4()}.png`;
    return result;
  });

  // Example de format de l'objet reçu de postman
  // const bob = {
  //   name: '350-536x354.jpeg',
  //   data: 'rr',
  //   size: 21603,
  //   encoding: '7bit',
  //   tempFilePath: '',
  //   truncated: false,
  //   mimetype: 'image/jpeg',
  //   md5: '778b009f537c8f90b15860d3594c4fb5',
  //   mv: ''
  // }
}

export default imageFormatter;