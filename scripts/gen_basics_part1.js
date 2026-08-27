// Generator: Part 1 - Header + functions + general-concepts + ipv4
const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '..', 'data', 'questions', 'basics.js');

const TOPIC_TO_CATEGORY = {
  'general-concepts': 'general-concepts',
  'ipv4': 'ipv4',
  'subnetting': 'subnetting',
  'ipv6': 'ipv6',
  'osi-model': 'osi-model',
  'network-devices': 'network-devices',
  'email-protocols': 'email-protocols',
  'tcp-ip': 'tcp-ip',
};

const QUESTIONS = [
// ============================================================
// general-concepts (30 comprehensive + 12 quick)
// ============================================================
gc_001(),gc_002(),gc_003(),gc_004(),gc_005(),gc_006(),gc_007(),gc_008(),gc_009(),gc_010(),
gc_011(),gc_012(),gc_013(),gc_014(),gc_015(),gc_016(),gc_017(),gc_018(),gc_019(),gc_020(),
gc_021(),gc_022(),gc_023(),gc_024(),gc_025(),gc_026(),gc_027(),gc_028(),gc_029(),gc_030(),
gc_031(),gc_032(),gc_033(),gc_034(),gc_035(),gc_036(),gc_037(),gc_038(),gc_039(),gc_040(),gc_041(),gc_042(),
// ============================================================
// ipv4 (30 comprehensive + 12 quick) - will be appended in part 2
// ============================================================
];

// Placeholder functions for gc - will be replaced
function gc_001() { return { id:'gc_001', question:'', options:['','','',''], correct:0, topic:'general-concepts', subSkill:'network_def', cognitiveLevel:'remembering', difficulty:1, errorPattern:'memorization', explanation:'', irt:{a:0.9,b:-2.0,c:0.2}, subSkills:['network_def'], diagnostic:{errorPattern:'misc_basic',rootCause:'',futureImpact:'',remediationVideoQuery:''}, prerequisites:[], isQuick:false }; }
