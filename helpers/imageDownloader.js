  
  export default function imageDownloader(imageName){

      const file = fs.createWriteStream(imageName);
      
      https.get(imageUrl, response => {
        response.pipe(file);
      
        file.on('finish', () => {
          file.close();
         return {imageName};
        });
      }).on('error', err => {
        fs.unlink(imageName);
        console.error(`Error downloading image: ${err.message}`);
      });
  }
  