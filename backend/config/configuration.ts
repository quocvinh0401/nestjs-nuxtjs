import { Configuration } from '@/entities/shared/configuration.interface'
import {Builder} from 'builder-pattern'

export default () => 
    Builder<Configuration.Configure>()
        .database({
            mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
            mongoDbs: process.env.MONGO_DBS || 'local'
        })
        .security({
            authentication: {
                jwt: {
                    secret: process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0Ijoic29jaWFsLW1lZGlhIiwibmFtZSI6IlplcmVmIiwibmlja25hbWUiOjE1MTYyMzkwMjJ9.ltEGvyXJTYVbLF8uv3eLEv3LprpJ9FRKo7QCPdrVB7o'
                }
            }
        })
        .build()
