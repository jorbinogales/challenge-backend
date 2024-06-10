import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    JWT_SECRET_KEY: string;
    ORIGIN: string
}
const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        JWT_SECRET_KEY: joi.string().required(),
        ORIGIN: joi.string().required()
    })
    .unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
});

if (error) {
    throw new Error('Config Environment Error: '+error.details[0].message);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    jwtSecretKey: envVars.JWT_SECRET_KEY,
    origin: envVars.ORIGIN
};
