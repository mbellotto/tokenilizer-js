let format = {
    "C0": {
        "id": "PS51-TKN",
        "title": "Datos de Validación de la Transacción POS (OK)",
        "format": {
            "count": 10,
            "length": 26,
            "fields": [
                {"order":  1,"name": "CVD-FLD", "type": "X", "length": 4, "dafault": "    "},
                {"order":  2,"name": "RESUB-STAT", "type": "X", "length": 1, "validValues": [" ", "S", "R", "A", "D", "T", "Q"], "dafault": " "},
                {"order":  3,"name": "RESUB-CNTR", "type": "X", "length": 3, "dafault": "   "},
                {"order":  4,"name": "TERM-POSTAL-CDE", "type": "X", "length": 10, "dafault": "          "},
                {"order":  5,"name": "E-COM-FLG", "type": "X", "length": 1, "validValues": [" ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "S", "T"], "dafault": " ", "alt": "MOTO-FLG"},
                {"order":  6,"name": "CMRCL-CRD-TYP", "type": "X", "length": 1, "validValues": ["0", "B", "L", "R", "S", " "], "dafault": " "},
                {"order":  7,"name": "ADNL-DATA-IND", "type": "X", "length": 1, "dafault": " "},
                {"order":  8,"name": "CVD-FLD-PRESENT", "type": "X", "length": 1 ,"validValues": ["0", "1", "2", "3", "4", "9", " "], "dafault": " "},
                {"order":  9,"name": "SAF-OR-FORCE-POST", "type": "X", "length": 1 ,"validValues": [" ", "S", "F", "0", "1"], "dafault": " ", "alt": "MRCH-SRVC-RQST"},
                {"order": 10,"name": "AUTHN-COLL-IND", "type": "X", "length": 1 ,"validValues": ["0", "1", "2", "3", "4", "5", "6", "7", "B", "F"], "dafault": " "},
                {"order": 11,"name": "FRD-PRN-FLG", "type": "X", "length": 1 ,"validValues": ["0", "1", "2"], "dafault": "0"},
                {"order": 12,"name": "CAVV-AAV-RSLT-CDE", "type": "X", "length": 1 ,"validValues": [" ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "M", "N", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], "dafault": "0"}
            ]
        }
    }
};

function evalToken (id, value) {
    if ( !value ) {
        console.log(`No value was provided`);
        return false;
    }
    if ( format[id] ) {
        
        const def = format[id].format;
        
        const diff = def.length - value.length;
        
        console.log(`Token ${id} - ${format[id].title}`);
        
        if ( diff ) {
            console.log(`Value length is ${diff > 0 ? 'shorter': 'larger'} than expected. Expected length = ${def.length}`);
            return false;
        }
        console.log()
        let pos = 0;
        def.fields.forEach( fld => {
            const step = fld.length;
            fieldValue = value.substring( pos, pos+step);
            
            let idx = 0
            if (fld.validValues) {
                idx = fld.validValues.indexOf(fieldValue);
            }

            console.log(`   ${fld.name} = [${fieldValue}]  [ ${idx === -1 ? 'INAVLID' : 'VALID'} ]`);

            pos = pos + step;
        })
        return true;
        
    } else {
        console.log(`No definition was found for token with id=${id}`);
        return false;
    }
}

evalToken( 'C0', 'abcdefghijklmnopqrstuvwxyz');