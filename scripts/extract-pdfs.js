const fs = require('fs')
const path = require('path')
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js')

async function extract(filePath, outPath){
  const data = fs.readFileSync(filePath)
  const uint8 = new Uint8Array(data)
  const loadingTask = pdfjs.getDocument({data: uint8})
  const doc = await loadingTask.promise
  let full = ''
  for(let i=1;i<=doc.numPages;i++){
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const strings = content.items.map(i=> i.str)
    full += strings.join(' ') + '\n\n'
  }
  fs.writeFileSync(outPath, full, 'utf8')
  console.log('Wrote', outPath)
}

(async ()=>{
  const base = path.resolve(__dirname, '..')
  const files = [
    'C sqaure x giropie.pdf',
    'End To End. C sqaure.pdf'
  ]
  for(const f of files){
    const p = path.join(base, f)
    const outDir = path.join(base, 'src','data')
    if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true})
    const out = path.join(outDir, f.replace(/\.pdf$/i,'.txt'))
    try{
      await extract(p,out)
    }catch(e){
      console.error('Failed',f,e && e.message)
    }
  }
})()
