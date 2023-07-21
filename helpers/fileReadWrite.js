const fs = require('fs');
const fsPath = require('path');

const  fsPromises = fs.promises;
const join = fsPath.join;

// ✅ write to file SYNCHRONOUSLY
function syncWriteFile(filename, data) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  fs.writeFileSync(fsPath.join(__dirname, filename), data, {
    flag: 'w',
  });

  const contents = fs.readFileSync(fsPath.join(__dirname, filename), 'utf-8');


  return contents;
}



// ✅ write to file ASYNCHRONOUSLY
async function asyncWriteFile(filename, data) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  try {
    await fsPromises.writeFile(join(__dirname, filename), data, {
      flag: 'w',
    });

    const contents = await fsPromises.readFile(
      join(__dirname, filename),
      'utf-8',
    );
    return contents;
  } catch (err) {
    console.log(err);
    return 'Something went wrong';
  }
}


module.exports={
  syncWriteFile,
  asyncWriteFile
}