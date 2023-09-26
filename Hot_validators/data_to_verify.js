
  var retreived_data= [];
  retreived_data.push(  
  ['',"République Algérienne Démocratique et Populaire",'','','','','','','','','','','','','','','',   ''],
  ['',"Ministére de l'Habitat, de l'Urbanisme et de la Ville",'','','','','','','','','','','','','','','',   ''],
  ['',"Etat d'éxecution des travaux de raccordement en énergies électrique et gaziéres  - Projets achevés ou dépassants les 50% d'avancement",'','','','','','','','','','','','','','','',   ''],

  ['','Organisme :','','','','','','','','','','','','','','','',''],


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
      ['empty',"sta_rt_0_abc_with_République Algérienne Démocratique et Populaire",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],
      ['empty',"sta_rt_0_abc_with_Ministére de l'Habitat, de l'Urbanisme et de la Ville",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],
      ['empty',"sta_rt_0_abc_with_Etat d'éxecution des travaux de raccordement en énergies électrique et gaziéres  - Projets achevés ou dépassants les 50% d'avancement",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],

      ['empty','modal0from_Organisme :','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],


      ['empty','sta_rt_0_abc_with_Projet','sta_rt_0_abc_with_Consistance de Projet',"sta_rt_0_abc_with_Taux d'\navancement\ndes travaux\nlogements","sta_rt_0_abc_with_Taux d'avancement des travaux VRD",'sta_rt_0_abc_with_Raccordement en énergie Electrique','empty','empty','empty','empty','sta_rt_0_abc_with_Raccordement en énergie Gaziere','empty','empty','empty','empty',   'empty'],
      ['empty','empty','empty','empty','empty',"sta_rt_0_abc_with_Taux d'avancement des travaux",'sta_rt_0_abc_with_Montant des travaux (devis SADEG)','sta_rt_0_abc_with_Montant payé (DA)','sta_rt_0_abc_with_Créances détenues travaux','sta_rt_0_abc_with_Contraintes',"sta_rt_0_abc_with_Taux d'avancement des travaux",'sta_rt_0_abc_with_Montant des travaux (devis SADEG)','sta_rt_0_abc_with_Montant payé (DA)','sta_rt_0_abc_with_Créances détenues travaux','sta_rt_0_abc_with_Contraintes',   'empty'],
    )
    
    if( retreived_data[0].length !== ddata[0].length ) {
        return false;
    }
    console.log('we depasse col length')
    if (retreived_data.length < ddata.length ) {
        return false;
    }

  let AreReallySomething = true;
  for (let i = 0; i < retreived_data.length; i++) {
    for (let j = 0; j < retreived_data[0].length; j++) {
      console.log("i is : " + i + " j is : " + j);
      console.log(ddata[i][j])
      console.log(retreived_data[i][j])

      if( j==0 && !(retreived_data[i][j]=='' || retreived_data[i][j]==null ) ) {
        console.log('we depasse 1');
        AreReallySomething=false;
        break;
       }
       else if( j== Number(Number(retreived_data[0].length)-1) && !(retreived_data[i][j]=='' || retreived_data[i][j]==null ) ) {
        AreReallySomething=false;
        break;
       }
       else if(ddata[i][j]=='empty' && !( retreived_data[i][j]=='' || retreived_data[i][j]==null ) ){
        console.log('we depasse 2');         
        AreReallySomething=false;
        break;
        }
       else if( ddata[i][j].includes('sta_rt_0_abc_with_') && retreived_data[i][j]!==ddata[i][j].replace('sta_rt_0_abc_with_','') ) {
        console.log('we depasse 3');         
        AreReallySomething=false;
          break;
        }
      console.log('we depasse 4');       

    }
   if(!AreReallySomething){
       break;
   }

  }
  //console.log(i)
  //console.log(j)
  console.log(AreReallySomething)

  if(!AreReallySomething){
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