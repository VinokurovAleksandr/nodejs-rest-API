const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require ('nanoid'); 

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
};

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath)
  return JSON.parse(allContacts)
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(index => index.id === id);
    if(idx === -1) {
      return null;
    }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(index => index.id === id);
  if(idx === -1) {
    return null;
  }
  contacts[idx].name = body.name;
  contacts[idx].email = body.email;
  contacts[idx].phone = body.phone;
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
