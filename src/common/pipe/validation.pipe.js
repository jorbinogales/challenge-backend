"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPipe = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validationPipe = (type, source = 'body') => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = source === 'body' ? req.body : req.query;
            const dto = (0, class_transformer_1.plainToClass)(type, data);
            const errors = yield (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            if (source === 'body') {
                req.body = dto;
            }
            else {
                req.query = dto;
            }
            next();
        }
        catch (error) {
            console.error('Error en validationPipe:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};
exports.validationPipe = validationPipe;
