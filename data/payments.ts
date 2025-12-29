import { v4 as uuidV4 } from 'uuid';
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
  dictionaries: [names],
};

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  clientName: string;
};

// Generate random status
const randomStatus = (): Payment['status'] => {
  const statuses = ['pending', 'processing', 'success', 'failed'] as const;
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate random email
const randomEmail = (clientName: string): string => {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const cleanName = clientName.replace(/\s/g, '');
  return `${cleanName}@${randomDomain}`;
};

/**
 * Mock data generation
 * This array can be used for data tables, testing, or prototyping.
 */
export const payments: Payment[] = Array.from({ length: 100 }, () => {
  const randomName = uniqueNamesGenerator(config);

  return {
    id: uuidV4(),
    amount: Math.floor(Math.random() * 10000) / 100,
    status: randomStatus(),
    clientName: randomName,
    email: randomEmail(randomName.toLowerCase()),
  };
});
