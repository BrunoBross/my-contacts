const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    if (!contacts || contacts.length <= 0) {
      return response.status(404).json({ error: "No contacts found" });
    }
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findByEmail(email);

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    if (contactExists) {
      return response
        .status(400)
        .json({ error: "This email is already in use" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExistsById = await ContactsRepository.findById(id);
    const contactExistsByEmail = await ContactsRepository.findByEmail(email);

    if (!contactExistsById) {
      return response.status(404).json({ error: "User not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    if (contactExistsByEmail && contactExistsByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: "This email is already in use" });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    // const contactExists = await ContactsRepository.findById(id);

    // if (!contactExists) {
    //   return response.status(404).json({ error: "User not found" });
    // }

    await ContactsRepository.deleteById(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
