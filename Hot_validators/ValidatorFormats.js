const currencyht_nbnb = '' // editable must be equal to the one in initials_inputs_nb; 
const currencyht_intint = ''; // editable must be equal to the one in initials_inputs_nb
const text_length_txt = 600;  // editable must be equal to the one in initials_inputs_nb

const valid_amounts = (oldvalue,currencyht_nbnb) => {
    if (oldvalue != null) {//|| oldvalue.toString()!==null){
        var value = oldvalue.toString().replace(currencyht_nbnb, '');
      } else {
        var value = null;
      }  
      if (value == null ||
        /^\s*[-+]?(\s*\d+)\s*$/.test(value) || // /^\s*[-+]?(\d+)\s*$/.test(value) || // when the value is whole number like 45 1987 2 36 ... // /^\s*[-+]?(\d+)\s*\$?\s*$/.test("  1235$  ")
        /^\s*[-+]?(\s*\d+(\.\d*)?|\.\d+)\s*$/.test(value) || //1234567.89 (BY DEFAULT VALUE) AMERICAN NUMERIC FORMAT WITHOUT THOUSAND SEPARATOR
        /^\s*[-+]?(\s*\d+(,\d*)?|,\d+)\s*$/.test(value) || //1234567,89 EUROPEAN NUMERIC FORMAT WITHOUT THOUSAND SEPARATOR
        /^\s*[-+]?(\s*\d{1,3}( \d{3})*(,\d*)?|,\d+)\s*$/.test(value.toString().replace(/[\s\u00A0]/g, ' ') ) || // 1 234 567,89 FRENCH NUMERIC FORMAT WITH THOUSAND SEPARATOR as space
        /^\s*[-+]?(\s*\d{1,3}(,\d{3})*(\.\d+)?|\.\d+)\s*$/.test(value) || // 1,234,567.89 AMERICAN NUMERIC FORMAT WITH THOUSAND SEPARATOR as comma
        /^\s*[-+]?(\s*\d{1,3}(?:\.\d{3})+(?:,\d+)?)\s*(?=\s|$)/.test(value) || // 1.234.567,89 EUROPEAN NUMERIC FORMAT WITH THOUSAND SEPARATOR as dot /^\s*[-+]?(\d{1,3}(?:[.,\s]\d{3})*(?:,\d+)?)\s*$/
        /^\s*[-+]?(\s*\d{1,3}( \d{3})*(\.\d*)?|\.\d+)\s*$/.test(value.toString().replace(/[\s\u00A0]/g, ' ')) ||   // 1 234 567.89 AMERICAN NUMERIC FORMAT WITH THOUSAND SEPARATOR as space
        /^\s*[-+]?[\s]*[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/.test(value) || // 1.6e6 1.60E+04  -13.65E4  - 12.3E+03  scientific notation with E sign
        /^\s*[-+]?[\s]*[0-9]*,?[0-9]+([eE][-+]?[0-9]+)?\s*$/.test(value)    // 1,6e6 1,60E+04  -13,65E4  - 12.3E+03  scientific notation with E sign
  
      ) {
        //callback(true);
        return true
      } else {
        //////console.log('we are in callback false')
        return false;
        //callback(false);
      }      
}

const valid_date = (value) => {
    if( value==null || 
        /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||  // "31/12 / 1995"
        /^\d{1,2}\-\d{1,2}\-\d{4}$/.test(value.toString().trim().replace(/\s*-\s*/g,"-")) ||   // "31 - 12-1995"
        /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(value.toString().trim().replace(/\s*\.\s*/g,".")) ||   // "31.12. 1995"

        /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||  // 1995/31/12
        /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(value.toString().trim().replace(/\s*-\s*/g,"-")) ||   // 1995-12-31
        /^\d{4}\.\d{1,2}\.\d{1,2}$/.test(value.toString().trim().replace(/\s*\.\s*/g,".")) ||   // 1995.12.31

        /^\d{1,2}\/\d{1,2}\/\d{2}$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||   // 11/12/23
        /^\d{1,2}\-\d{1,2}\-\d{2}$/.test(value.toString().trim().replace(/\s*-\s*/g,"-"))  ||   // 11-12-23
        /^\d{1,2}\.\d{1,2}\.\d{2}$/.test(value.toString().trim().replace(/\s*\.\s*/g,".")) ||   // 11.12.23


        ///^\d{1,2}\/\d{1,2}$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/"))   // 01/12 25/12 99/11
        /^\d{1,2}\/\d{1,2}(\/)?$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||   // 01/12 25/12/ 99/11/
        /^\d{1,2}\-\d{1,2}(\-)?$/.test(value.toString().trim().replace(/\s*-\s*/g,"-")) ||   // 01-12 25-12- 99-11-
        /^\d{1,2}\.\d{1,2}(\.)?$/.test(value.toString().trim().replace(/\s*\.\s*/g,".")) ||  // 01.12 25.12. 99.11.
        
        /^\d{4}\/\d{1,2}(\/)?$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||   // 2023/12 2022/1/
        /^\d{4}\-\d{1,2}(\-)?$/.test(value.toString().trim().replace(/\s*-\s*/g,"-")) ||   // 2001-12 2025-1-
        /^\d{4}\.\d{1,2}(\.)?$/.test(value.toString().trim().replace(/\s*\.\s*/g,".")) ||   // 2001.2 2025.12.

        /^\d{1,2}\/\d{4}(\/)?$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||   // 12/2023 1/2022/
        /^\d{1,2}\-\d{4}(\-)?$/.test(value.toString().trim().replace(/\s*-\s*/g,"-")) ||   // 12-2001 1-2025-
        /^\d{1,2}\.\d{4}(\.)?$/.test(value.toString().trim().replace(/\s*\.\s*/g,".")) ||   // 3.2001 12.2025.

        /^\d{4}\/?$/.test(value.toString().trim().replace(/\s*\/\s*/g,"/")) ||              // 2023  2022/
        /^\d{4}[-]?\s*$/.test(value.toString().trim().replace(/\s*-\s*/g,"-")) ||              // 2023  2022-
        /^\d{4}[.]?\s*$/.test(value.toString().trim().replace(/\s*\.\s*/g,"."))                 // 2023  2022.

    ){
      //////console.log('calback trueeeeeeeeeeeeee')
      //callback(true)
      return true;
    } else {
     //////console.log('calback falseeeeeeeeeeeeeee')
      //callback(false);
      return false;
    }
}

const valid_dropdown = (value,my_source) => {
    console.log('validator_dropdown')
    if(value==null){
      return true;
    } else if(my_source.includes(value)){
      return true;
    } else if (value===' ') {
      return true;
    } else {
      return false;
    }

}

const valid_email = (value) => {
    if(value==null || /^[\w.-]+@[a-zA-Z0-9.,-]+\.[a-zA-Z]{2,}$/.test(value.toString().trim()) ) {
        //callback(true)
        return true;
    } else {
        return false;
    }
}

const valid_integers = (oldvalue,currencyht_intint) => {
    if (oldvalue != null) {//|| oldvalue.toString()!==null){
        var value = oldvalue.toString().replace(currencyht_intint, '');
      } else {
        ////console.log('we are inside validator oldvalue==null')
        var value = null;
      }

     if (value == null ||
       /^\s*[-+]?(\s*\d+)\s*$/.test(value) || // /^\s*[-+]?(\d+)\s*$/.test(value) || // when the value is whole number like 45 1987 2 36 ... // /^\s*[-+]?(\d+)\s*\$?\s*$/.test("  1235$  ")
       /^\s*[-+]?(\s*\d+(\.\d*)?|\.\d+)\s*$/.test(value) || //1234567.89 (BY DEFAULT VALUE) AMERICAN NUMERIC FORMAT WITHOUT THOUSAND SEPARATOR
       /^\s*[-+]?(\s*\d+(,\d*)?|,\d+)\s*$/.test(value) || //1234567,89 EUROPEAN NUMERIC FORMAT WITHOUT THOUSAND SEPARATOR
       /^\s*[-+]?(\s*\d{1,3}( \d{3})*(,\d*)?|,\d+)\s*$/.test(value.toString().replace(/[\s\u00A0]/g, ' ') ) || // 1 234 567,89 FRENCH NUMERIC FORMAT WITH THOUSAND SEPARATOR as space
       /^\s*[-+]?(\s*\d{1,3}(,\d{3})*(\.\d+)?|\.\d+)\s*$/.test(value) || // 1,234,567.89 AMERICAN NUMERIC FORMAT WITH THOUSAND SEPARATOR as comma
       /^\s*[-+]?(\s*\d{1,3}(?:\.\d{3})+(?:,\d+)?)\s*(?=\s|$)/.test(value) || // 1.234.567,89 EUROPEAN NUMERIC FORMAT WITH THOUSAND SEPARATOR as dot /^\s*[-+]?(\d{1,3}(?:[.,\s]\d{3})*(?:,\d+)?)\s*$/
       /^\s*[-+]?(\s*\d{1,3}( \d{3})*(\.\d*)?|\.\d+)\s*$/.test(value.toString().replace(/[\s\u00A0]/g, ' ')) ||   // 1 234 567.89 AMERICAN NUMERIC FORMAT WITH THOUSAND SEPARATOR as space
       /^\s*[-+]?[\s]*[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/.test(value) || // 1.6e6 1.60E+04  -13.65E4  - 12.3E+03  scientific notation with E sign
       /^\s*[-+]?[\s]*[0-9]*,?[0-9]+([eE][-+]?[0-9]+)?\s*$/.test(value)    // 1,6e6 1,60E+04  -13,65E4  - 12.3E+03  scientific notation with E sign


     ) {
        return true;
     } else {
        return false;
    }

}

const valid_onlynb = (value) => {
    if(value==null || /^\d+(\s*\d+)*$/.test(value.toString().trim()) ) {
        return true;
    } else {
        return false;
    }
}

const valid_percentage = (value) => {
    if (value == null || // value == '' ||
    /^[-+]?(\s*\d+(\.\d+)?)\s*%$/.test(value.toString().trim()) || // for example 14.65%  "14.65 %"  
    /^[-+]?(\s*\d+(,\d+)?)\s*%$/.test(value.toString().trim()) || // for example 14,65%   "14,65 %"
    
    /^[-+]?(\s*\d+(\.\d+)?)\s*$/.test(value.toString().trim()) || // for example 14.65  "14.65 "  
    /^[-+]?(\s*\d+(,\d+)?)\s*$/.test(value.toString().trim()) // for example 14,65   "14,65 "
  ) {
    ////////console.log('it returns true in percentage validator')             
    return true;              
  } else {
    ////////console.log('we are in callback false percentage validator')
    return false;
  }
}

const valid_phonenumber = (value) => {
    if(value==null || /^\+?[\d\/\s()+\-_:]+$/.test(value.toString().trim()) ) {  // when it may start with "+" or it includes / \ - ( ) _ : 
        return true;
    } else {
      return false;
    }
}

const valid_text = (value,text_length_txt) => {
    if( value==null || 
        value.toString().length<text_length_txt    
    ) {
      callback(true)
    } else {
      callback(false)
    }
}

module.exports = {
    valid_amounts,
    valid_date,
    valid_dropdown,
    valid_email,
    valid_integers,
    valid_onlynb,
    valid_percentage,
    valid_phonenumber,
    valid_text
};
