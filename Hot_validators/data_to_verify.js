  const ValidatorFormats = require('./ValidatorFormats.js');
  
  var retreived_data= [];
  retreived_data.push(  
  ['',"République Algérienne Démocratique et Populaire",'','','','','','','','','','','','','',   ''],
  ['',"Ministére de l'Habitat, de l'Urbanisme et de la Ville",'','','','','','','','','','','','','',   ''],
  ['',"Etat d'éxecution des travaux de raccordement en énergies électrique et gaziéres  - Projets achevés ou dépassants les 50% d'avancement",'','','','','','','','','','','','','',   ''],

  ['','Organisme :','','','','','','','','','','','','','',''],


  ['','Projet','Consistance de Projet',"Taux d'\navancement\ndes travaux\nlogements","Taux d'avancement des travaux VRD",'Raccordement en énergie Electrique','','','','','Raccordement en énergie Gaziere','','','','',   ''],
  ['','','','','',"Taux d'avancement des travaux",'Montant des travaux (devis SADEG)','Montant payé (DA)','Créances détenues travaux','Contraintes',"Taux d'avancement des travaux",'Montant des travaux (devis SADEG)','Montant payé (DA)','Créances détenues travaux','Contraintes',   ''],
  ['','','','','','','','','','','','','','','',''],

  ) 

  //const retreived_data = req.body.data;


const last_row_after_header = 15 // editable must be equal to the one in initials_inputs_nb ;
function ddatafct_verify(last_row_after_header,retreived_data){
    var ddata_header= [];
    ddata_header.push(  
      ['empty',"sta_rt_0_abc_with_République Algérienne Démocratique et Populaire",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],
      ['empty',"sta_rt_0_abc_with_Ministére de l'Habitat, de l'Urbanisme et de la Ville",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],
      ['empty',"sta_rt_0_abc_with_Etat d'éxecution des travaux de raccordement en énergies électrique et gaziéres  - Projets achevés ou dépassants les 50% d'avancement",'empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty',   'empty'],

      ['empty','modal0from_Organisme :','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],


      ['empty','sta_rt_0_abc_with_Projet','sta_rt_0_abc_with_Consistance de Projet',"sta_rt_0_abc_with_Taux d'\navancement\ndes travaux\nlogements","sta_rt_0_abc_with_Taux d'avancement des travaux VRD",'sta_rt_0_abc_with_Raccordement en énergie Electrique','empty','empty','empty','empty','sta_rt_0_abc_with_Raccordement en énergie Gaziere','empty','empty','empty','empty',   'empty'],
      ['empty','empty','empty','empty','empty',"sta_rt_0_abc_with_Taux d'avancement des travaux",'sta_rt_0_abc_with_Montant des travaux (devis SADEG)','sta_rt_0_abc_with_Montant payé (DA)','sta_rt_0_abc_with_Créances détenues travaux','sta_rt_0_abc_with_Contraintes',"sta_rt_0_abc_with_Taux d'avancement des travaux",'sta_rt_0_abc_with_Montant des travaux (devis SADEG)','sta_rt_0_abc_with_Montant payé (DA)','sta_rt_0_abc_with_Créances détenues travaux','sta_rt_0_abc_with_Contraintes',   'empty'],
    )
    //('retreived_data in data_to_verify file :')
    //(retreived_data[0].length)
    //(ddata_header[0].length)
    //('**--**')
    //(retreived_data.length)
    //(ddata_header.length)
    if( retreived_data[0].length !== ddata_header[0].length ) {
        //return wedepasse
        return false;
    }
    ////('we depasse col length')
    if (retreived_data.length < ddata_header.length ) {
      var wedepasse = '0.2';
    //  //('we depasse 0.2')
      //return wedepasse
      return false;
    }

  let AreReallySomething = true;
  for (let i = 0; i < retreived_data.length; i++) {
    for (let j = 0; j < retreived_data[0].length; j++) {
      //////(i)
      ////(j)
      ////(retreived_data[i][j])
      ////(ddata_header[i][j]);

      if( j==0 && !(retreived_data[i][j]=='' || retreived_data[i][j]==null ) ) {
        var wedepasse = ' 1';
        AreReallySomething=false;
        break;
       }
       else if( j== Number(Number(retreived_data[0].length)-1) && !(retreived_data[i][j]=='' || retreived_data[i][j]==null ) ) {
        var wedepasse = ' 1.5';
        AreReallySomething=false;
        break;
       }
       else if( i <= Number(ddata_header.length-1) && ddata_header[i][j]=='empty' && !( retreived_data[i][j]=='' || retreived_data[i][j]==null ) ){
        var wedepasse = ' 2';         
        AreReallySomething=false;
        break;
        }
       else if( i <= Number(ddata_header.length-1) && ddata_header[i][j].includes('sta_rt_0_abc_with_') && retreived_data[i][j]!==ddata_header[i][j].replace('sta_rt_0_abc_with_','') ) {
        var wedepasse = ' 3';         
        AreReallySomething=false;
          break;
        }
    
    
    
        else if (i>Number(ddata_header.length-1) ){
          if(j==1 || j==9) { //editable index 
            var validformat = ValidatorFormats.valid_text(retreived_data[i][j],600);
            if (!validformat){
              var wedepasse = ' 4';
              AreReallySomething=false;
              break;
            }
          }
          else if (j==2){ // editable index
            var mysource_dropdown = ['','yellow', 'red', 'orange', 'green', 'blue', 'gray', 'black', 'white'] // editable
            var validformat = ValidatorFormats.valid_dropdown(retreived_data[i][j],mysource_dropdown);
            if (!validformat){
              var wedepasse = ' 5';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==3){ // editable index
            var validformat = ValidatorFormats.valid_email(retreived_data[i][j]);
            if (!validformat){
              var wedepasse = ' 6';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==4){ // editable index
            var validformat = ValidatorFormats.valid_onlynb(retreived_data[i][j]);
            if (!validformat){
              var wedepasse = ' 7';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==5){ // editable index
            var validformat = ValidatorFormats.valid_phonenumber(retreived_data[i][j]);
            if (!validformat){
              var wedepasse = ' 8';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==6){ // editable index
            var validformat = ValidatorFormats.valid_date(retreived_data[i][j]);
            if (!validformat){
              var wedepasse = ' 9';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==7){ // editable index
            var validformat = ValidatorFormats.valid_percentage(retreived_data[i][j]);
            if (!validformat){
              var wedepasse = ' 10';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==8){ // editable index
            var validformat = ValidatorFormats.valid_amounts(retreived_data[i][j],'$'); // editable currency
            if (!validformat){
              var wedepasse = ' 11';
              AreReallySomething=false;
              break;  
            }
          }
          else if (j==10){ // editable index
            var validformat = ValidatorFormats.valid_integers(retreived_data[i][j],'$');  // editable currency
            if (!validformat){
              var wedepasse = ' 12';
              AreReallySomething=false;
              break;  
            }
          }

       } 

       }
      ////('we depasse 4';       
      if(!AreReallySomething){
       // //('i : ' + i)
        ////('j : ' + j)
        break;
    }
    }
    if(!AreReallySomething){
      return false
     // return wedepasse

    }
    ////(AreReallySomething)
    //return wedepasse
    return AreReallySomething
    
  }
  ////('we depasse empty equal to "" ')

//var data_to_verify =  ddatafct_verify(last_row_after_header);
////(data_to_verify);
module.exports = {ddatafct_verify , retreived_data};