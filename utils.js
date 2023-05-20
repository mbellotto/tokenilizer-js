import format from "./token.definition.json" assert { type: "json" };
import fieldsDef from "./field.definition.json" assert { type: "json" };

export function findField( fieldId ) {
    return fieldsDef[ fieldId ];
}

export function parseTokenData (def, value) {
    if ( !value ) {
        console.log(`No value was provided`);
        return null;
    }

    let pos = 0;
    let observed = [];

    def.fields.forEach( fldId => {
        const fld = fieldsDef[fldId];
        if ( !fld ) {
            console.log(`Bad field definition [${fldId}]`);
            throw 'Bad field definition';
        }
        const step = fld.length;
        const fieldValue = value.substring( pos, pos+step);
        
        let idx = 0
        if (fld.validValues) {
            idx = fld.validValues.indexOf(fieldValue);
        }

        console.log(`   ${fld.name} = [${fieldValue}]  [ ${idx === -1 ? 'INAVLID' : 'VALID'} ]`);

        if ( idx === -1 ) {
            observed.push(fld.name);
        }

        pos = pos + step;
    })
    
    return observed;
}

export function evalTokenStructure( token ) {

    let header;

    // check min length of field. Min length = Header length = 12
    if ( token.length < 10 ) {
        console.log('Token subfield bad format!!!!');
        return false;
    }
    
    try {
        header = {
            catcher: token.substring(0,2),
            id: token.substring(2,4),
            length: parseInt(token.substring(4,8)),
            filler: token.substring(8,10)
        };

        if ( header.catcher !== '! ' ) {
            throw ` Header wrong catcher or missing. "! " was expected`;
        }

    } catch (error) {
        console.log('Token header bad format');
        console.log(error);
        return false;
    }

    if ( format[header.id] ) {
        
        const value = token.substring(10);
        
        const def = format[header.id].format;
        
        const diff = def.length - value.length;
        
        console.log(`Token ${header.id} - ${format[header.id].title}`);
        console.log('------------------------------------------------------------------------------');
        
        if ( diff ) {
            console.log(`Value length is ${diff > 0 ? 'shorter': 'larger'} than expected. Expected length = ${def.length}, received = ${value.length}`);
            return false;
        }
        
        const observed = parseTokenData( def, value );
        console.log('------------------------------------------------------------------------------\n');
        console.log(`Observed fields: ${observed.join(', ')}`);
        console.log('------------------------------------------------------------------------------\n');

    } else {
        console.log(`No definition was found for token with id=${header.id}\n`);
        return false;
    }
}

export function evalAdicData( adicData ) {
    // check min length of field. Min length = Header length = 12
    if ( adicData.length < 12 ) {
        console.log('AdicData field bad format!!!!');
        return false;
    }

    let header;

    try {
        header = {
            catcher: adicData.substring(0,2),
            count:   parseInt(adicData.substring(2,7)),
            length:  parseInt(adicData.substring(7,12))
        };

        if ( header.catcher !== '& ' ) {
            throw ` Header wrong catcher or missing. "& " was expected, insted get [${header.catcher}]`;
        }

        if ( header.count === 0 || adicData.length === 12) {
            throw `Zero tokens where found`;
        }
    } catch (error) {
        console.log('AdicData header bad format');
        console.log(error);
        return false;
    }
    const data = adicData.substring(11);

    const tokens = data.split('!');

    if ( tokens.length === 0 ) {
        console.log('No tokens data found, bad format or missing data');
        return false;
    } 
    
    console.log(`${tokens.length} token${tokens.length===1 ? ' was' :'s were'} found\n`);

    for (let idx = 1; idx < tokens.length; idx++) {
        const tkn = tokens[idx];

        console.log(`Processing token: [!${tkn}]`);

        evalTokenStructure( `!${tkn}` );
    }

}