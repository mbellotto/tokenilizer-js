import {findField, evalAdicData, evalTokenStructure, parseTokenData} from "./utils.js";

const trama = '& 0000800348! C400012 102510000660! 0400020  00000000032        ! P000038 020206 1  0000000000000               ! P400040  19210            6005cf97f459          ! PH00080 000000074200000000000000   19210000000000000000000000000000000000000742001N6N1  ! R200046 06    01 5cf97f459                            ! PX00030                          1    ';

// parseTokenData( 'C0', 'abcdefghijklmnopqrstuvwxyz');

evalAdicData( trama );

console.log('\n');