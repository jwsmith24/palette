import { Criteria } from './types/criteria.ts';
import { Cluster } from './types/cluster.ts';
import { v4 as uuid } from 'uuid';

export default function createCluster(
  title: string = '',
  criteria: Criteria[] = [],
  description: string = 'Enter description',
  id: number = crypto.getRandomValues(new Uint32Array(1))[0] // default to unique random number if not assigned by
  // the database yet
): Cluster {
  return {
    title,
    criteria,
    description,
    id,
    key: uuid(), // generates unique uuid string for React DOM
  };
}
