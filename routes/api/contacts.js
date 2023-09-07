const express = require('express');
const { HttpError } = require('../../helpers');
const Joi = require ('joi');

const router = express.Router()

const contacts = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/',
  async (req, res, next) => {
    try {
        res.json(await contacts.listContacts());
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await contacts.getContactById(contactId);
    if (!response) {
      throw HttpError(404,"Not found");
      }
      return res.json(response);
  } catch (error) {
      next(error);
    }})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");      
    }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
} catch (error) {
  next(error);
}
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await contacts.removeContact(contactId);
    if (!response) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router
