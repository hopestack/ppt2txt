
const fs = require('fs')
const ppt = require('ppt')
const path = require('path')


if (process.argv.length < 3) {
  return console.log("usage: node proc.js <in.ppt file or dir of ppts> <out.txt file or dir>");
} else {
  let input = process.argv[2];
  let output = process.argv[3];
  (fs.statSync(input).isDirectory()?procDir:procFile)(input, output);
}

function procFile(inFile, outFile) {
  fs.writeFileSync(outFile, ppt.utils.to_text(ppt.readFile(inFile)).join('\n'))
}

function procDir(inDir, outDir) {
  fs.readdirSync(inDir).forEach(n=>{
    if(n.endsWith('.ppt')) {
      let inFile = path.join(inDir, n);
      let outFile = path.join(outDir, 
        n.replace(/\s*\(\w*\).*beta/g, '')
        .replace(/_*beta/g, '')
        .replace('.ppt', '.txt')
        .replace(/\s+/g, '-')
        .toLowerCase()
      );
      procFile(inFile, outFile);
    }
  });
}