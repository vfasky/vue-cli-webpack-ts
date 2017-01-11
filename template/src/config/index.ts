/**
 * config
 **/
'use strict'

import env from 'env'
import * as objectAssign from 'object-assign'

export default objectAssign(env, {
    apiSign: {
        id: '',
        key: ''
    }
})