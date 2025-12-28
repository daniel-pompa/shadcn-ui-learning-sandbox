import { v4 as uuidV4 } from 'uuid';
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  clientName: string;
};

const generatorConfig: Config = {
  dictionaries: [names],
};

const getRandomStatus = (): Payment['status'] => {
  const statuses = ['pending', 'processing', 'success', 'failed'] as const;
  return statuses[Math.floor(Math.random() * statuses.length)];
};

/**
 * Mock data generation
 * This array can be used for data tables, testing, or prototyping.
 */
export const payments: Payment[] = Array.from({ length: 100 }, () => {
  const name = uniqueNamesGenerator(generatorConfig);

  return {
    id: uuidV4(),
    amount: parseFloat((Math.random() * 5000).toFixed(2)),
    status: getRandomStatus(),
    clientName: name,
    email: `${name.toLowerCase().replace(/\s/g, '')}@example.com`,
  };
});
