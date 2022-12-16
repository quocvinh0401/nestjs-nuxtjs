import { Configuration } from '@/entities/shared/configuration.interface'
import {Builder} from 'builder-pattern'

export default () => 
    Builder<Configuration.Configure>()
        .database({
            mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
            mongoDbs: process.env.MONGO_DBS || 'local'
        })
        .build()
