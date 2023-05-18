import format from "./token.definition.json" assert { type: "json" };
import fieldsDef from "./field.definition.json" assert { type: "json" };

export function findField( fieldId ) {
    return fieldsDef[ fieldId ];
}

export function evalToken (id, value) {
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
        
        let pos = 0;
        def.fields.forEach( fldId => {
            const fld = fieldsDef[fldId];
            const step = fld.length;
            const fieldValue = value.substring( pos, pos+step);
            
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

