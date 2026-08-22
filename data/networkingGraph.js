// data/networkingGraph.js
import { Skill, Misconception } from '../lib/domain/models.js';

export const NETWORKING_SKILLS = [
  new Skill({ id: 'net_fund', name: 'Networking Fundamentals', description: 'Basic concepts of computer networks', difficulty: 0.2 }),
  new Skill({ id: 'osi_model', name: 'OSI Model', description: 'The 7 layers of the OSI model', parent: 'net_fund', difficulty: 0.3 }),
  new Skill({ id: 'ipv4_fund', name: 'IPv4 Fundamentals', description: 'Structure of an IPv4 address', parent: 'net_fund', difficulty: 0.3 }),
  new Skill({ id: 'binary_math', name: 'Binary Representation', description: 'Converting between decimal and binary', parent: 'ipv4_fund', difficulty: 0.5 }),
  new Skill({ id: 'cidr', name: 'CIDR Notation', description: 'Classless Inter-Domain Routing', parent: 'ipv4_fund', prerequisites: ['binary_math'], difficulty: 0.6 }),
  new Skill({ id: 'subnetting', name: 'Subnetting', description: 'Dividing networks into subnets', parent: 'ipv4_fund', prerequisites: ['cidr', 'binary_math'], difficulty: 0.8 }),
  new Skill({ id: 'routing_fund', name: 'Routing Fundamentals', description: 'How routers move packets', parent: 'net_fund', prerequisites: ['ipv4_fund'], difficulty: 0.5 }),
];

export const NETWORKING_MISCONCEPTIONS = [
  new Misconception({ id: 'misc_mask', skillId: 'subnetting', description: 'Misunderstanding subnet mask boundary vs host portion' }),
  new Misconception({ id: 'misc_l2_l3', skillId: 'osi_model', description: 'Confusing Layer 2 (MAC) and Layer 3 (IP) addressing' }),
  new Misconception({ id: 'misc_ping_down', skillId: 'routing_fund', description: 'Assuming every ping failure means the physical network is down (ignoring ACLs/firewalls)' })
];

export class MockNetworkingRepository {
  async getSkills() {
    return NETWORKING_SKILLS;
  }
  
  async getMisconceptions() {
    return NETWORKING_MISCONCEPTIONS;
  }

  async getPrerequisites(skillId) {
    const skill = NETWORKING_SKILLS.find(s => s.id === skillId);
    return skill ? skill.prerequisites : [];
  }
}
