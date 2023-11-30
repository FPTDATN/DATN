import joi from "joi";

export const discountSchema = joi.object({
    code: joi.string().required().max(12),
    discount: joi.number().required().min(0).max(100),
    count: joi.number().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
});
