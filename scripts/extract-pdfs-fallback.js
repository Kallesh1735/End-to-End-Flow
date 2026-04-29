const fs = require('fs')
const path = require('path')
const extract = require('pdf-text-extract')

function extractFile(src, dest){
  return new Promise((resolve, reject)=>{
    extract(src, function (err, pages) {
      if (err) return reject(err)
      const text = pages.join('\n\n')
      fs.writeFileSync(dest, text, 'utf8')
      resolve(dest)
    })
  })
}

(async ()=>{
  const base = path.resolve(__dirname, '..')
  const files = [
    'C sqaure x giropie.pdf',
    'End To End. C sqaure.pdf'
  ]
  const outDir = path.join(base, 'src','data')
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true})
  for(const f of files){
    const src = path.join(base, f)
    const dest = path.join(outDir, f.replace(/\.pdf$/i,'.txt'))
    try{
      const w = await extractFile(src,dest)
      console.log('Wrote', w)
    }catch(e){
      console.error('Failed', f, e && e.message)
    }
  }
})()
