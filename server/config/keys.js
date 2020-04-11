import * as localKeys from '../config/keys_local';
import * as devKeys from '../config/keys_dev';
import * as uatKeys from '../config/keys_uat';
import * as prodKeys from '../config/keys_prod';
let keysHolder;
if (process.env.NODE_ENV === 'production') {
  keysHolder = prodKeys;
} else if (process.env.NODE_ENV === 'uat') {
  keysHolder = uatKeys;
} else if (process.env.NODE_ENV === 'dev') {
  keysHolder = devKeys;
} else {
  keysHolder = localKeys;
}
export const keys = keysHolder.default;
