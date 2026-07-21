import { IContact } from "@/types/IContact";

export async function getContactById(id: string): Promise<IContact | null> {
  // Simulate fetching contact from a database or API
  const contacts: IContact[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, Anytown, USA',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return contacts.find(contact => contact.id === id) || null;
}