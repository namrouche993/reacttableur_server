
  var retreived_data= [];
  retreived_data.push(  
  ['',"République Algérienne Démocratique et Populaire",'','','','','','','','','','','','','','','',   ''],
  ['',"Ministére de l'Habitat, de l'Urbanisme et de la Ville",'','','','','','','','','','','','','','','',   ''],
  ['',"Etat d'éxecution des travaux de raccordement en énergies électrique et gaziéres  - Projets achevés ou dépassants les 50% d'avancement",'','','','','','','','','','','','','','','',   ''],

  [null,'Organisme :','','','','','','','','','','','','','','','',''],


  ['','Projet','Consistance de Projet',"Taux d'\navancement\ndes travaux\nlogements","Taux d'avancement des travaux VRD",'Raccordement en énergie Electrique','','','','','Raccordement en énergie Gaziere','','','','',   ''],
  ['','','','','',"Taux d'avancement des travaux",'Montant des travaux (devis SADEG)','Montant payé (DA)','Créances détenues travaux','Contraintes',"Taux d'avancement des travaux",'Montant des travaux (devis SADEG)','Montant payé (DA)','Créances détenues travaux','Contraintes',   ''],
  ['','','','','','','','','','','','','','','','','',''],
  ) 

  //const retreived_data = req.body.data;

function findIndicesOfTargetValue(array,targetValue) {
    const indices = array.flatMap((row, rowIndex) =>
      row.map((cell, colIndex) => ({ rowIndex, colIndex, value: cell }))
    ).filter(cell => cell.value === targetValue);
  
    return indices;
  }

const last_row_after_header = 15 // editable must be equal to the one in initials_inputs_nb ;
function ddatafct(last_row_after_header){
    var ddata= [];
    ddata.push(  
      ['empty',"start0with_République Algérienne Démocratique et Populaire",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],
      ['empty',"start0with_Ministére de l'Habitat, de l'Urbanisme et de la Ville",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],
      ['empty',"start0with_Etat d'éxecution des travaux de raccordement en énergies électrique et gaziéres  - Projets achevés ou dépassants les 50% d'avancement",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],

      ['empty','modal0from_Organisme :','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],


      ['empty','start0with_Projet','start0with_Consistance de Projet',"start0with_Taux d'\navancement\ndes travaux\nlogements","start0with_Taux d'avancement des travaux VRD",'start0with_Raccordement en énergie Electrique','empty','empty','empty','empty','start0with_Raccordement en énergie Gaziere','empty','empty','empty','empty',   'empty'],
      ['empty','empty','empty','empty','empty',"start0with_Taux d'avancement des travaux",'start0with_Montant des travaux (devis SADEG)','start0with_Montant payé (DA)','start0with_Créances détenues travaux','start0with_Contraintes',"start0with_Taux d'avancement des travaux",'start0with_Montant des travaux (devis SADEG)','start0with_Montant payé (DA)','start0with_Créances détenues travaux','start0with_Contraintes',   'empty'],
    )
    
    if( retreived_data[0].length !== ddata[0].length ) {
        return false;
    }
    console.log('we depasse col length')
    if (retreived_data.length < ddata.length ) {
        return false;
    }
    console.log('we depasse row length')
    if( retreived_data.every(row => row[0] == '' || row[0] == null )
     && retreived_data.every(row => row[ Number(retreived_data[0].length)-1 ] == '' || row[ Number(retreived_data[0].length)-1 ] == null )
    ) {
        //console.log('0 col and last col are equal to "" or null ')
    } else {
        console.log('0 and last col are not all equal to "" or NULLL !!!')
        return false;
    }
    console.log('we depasse 0 col and last col that are equal')

    let AreReallyEmpty = true;
    const ddata_empty_index = findIndicesOfTargetValue(ddata,'empty');
    for (let index = 0; index < ddata_empty_index.length; index++) {
      if( 
        retreived_data[Number(ddata_empty_index[index].rowIndex)][Number(ddata_empty_index[index].colIndex)]=='' ||
        retreived_data[Number(ddata_empty_index[index].rowIndex)][Number(ddata_empty_index[index].colIndex)]==null 
      ) {
      } else {
        AreReallyEmpty=false;
        break;
      }
      //const element = ddata_empty_index[index];
    }
    if(!AreReallyEmpty){
      return false
  }

    console.log('we depasse empty equal to "" ')


  /*  
for(let i=0 ; i<=last_row_after_header ; i++) {
  //let zzrow=['','123 456 789','1234567','52%','','','','','','','','','','','','','',   '']
  let zzrow=['','','','','','','','','','','','','','','','','',   '']

  ddata.push(zzrow);
}
return ddata
}
*/
}

var data_to_verify =  ddatafct(last_row_after_header);
console.log(data_to_verify);
module.exports = {data_to_verify};