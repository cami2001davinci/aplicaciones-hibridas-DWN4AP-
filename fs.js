const fs = require('fs').promises;
async function testFs(path){

       try{
           await fs.mkdir('Actividad3',{recursive:true});
           console.log (" directorio creado correctamente!");

           await fs.writeFile(path, 'utf-8');
           console.log ("archivo escrito correctamente!");
       }catch(error){
           console.log ("error:", error)
       }
    
   }
    
   testFs('./Actividad3/server.js')