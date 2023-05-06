import Logger from './index.js'

import { resolve } from 'path'

function main() {
    const logger = Logger({
        dir: resolve('./', 'data', 'logs'),
        debug: true
    })

    logger.log('app message', {key: 'app info'})
    logger.log('splat message %d - %s', 123, 'title', {key: 'app info'})
    logger.error('error msg', { extra: 'hello'})

}

try {
    main()
} catch(e) {
    console.error(e)
}