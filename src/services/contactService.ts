import { Contact } from "@/types/Contact";

export async function getContactById(id: string): Promise<Contact | null> {
  // Simulate fetching contact from a database or API
  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return contacts.find(contact => contact.id === id) || null;
}
