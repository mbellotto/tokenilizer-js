import {findField, evalAdicData, evalTokenStructure, parseTokenData} from "./utils.js";

const trama = '& 0000500156! 0400020 00000000032 ! C000026 C1429BEC        ! C400012 102510000660! R200046 01 01 R 10';

// parseTokenData( 'C0', 'abcdefghijklmnopqrstuvwxyz');

evalAdicData( trama );