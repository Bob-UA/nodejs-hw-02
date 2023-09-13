const { HttpError, ctrlWrapper } = require("../helpers");
const {Contact} = require("../models/contact");


const getAll = async (req, res) => {
    res.json(await Contact.find());
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const response = await Contact.findById(contactId);
    if (!response) {
        throw HttpError(404, "Not found");
    }
    return res.json(response);
};

const add = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const response = await Contact.findByIdAndRemove(contactId);
    if (!response) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "contact deleted",
    });
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    return res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};