import json

# Load all data
with open('all_sections_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def write_questions(f, name, questions):
    f.write('const ' + name + ' = [\n')
    for q in questions:
        f.write('  ' + json.dumps(q, ensure_ascii=False) + ',\n')
    f.write('];\n\n')

with open('new_sections.js', 'w', encoding='utf-8') as f:
    for section_name, section_data in data.items():
        f.write('// SECTION: ' + section_name + '\n')
        write_questions(f, section_name, section_data['comprehensive'])
        write_questions(f, section_name + 'Q', section_data['quick'])
        f.write('\n')

# Add forEach calls
with open('new_sections.js', 'a', encoding='utf-8') as f:
    for section_name in data.keys():
        f.write(section_name + '.forEach((item, i) => q(\'' + section_name + '_\' + String(i + 1).padStart(3, \'0\'), item[0], item[1], item[2], \'' + section_name + '\', \'' + section_name + '_topic\', item[3], false));\n')
        f.write(section_name + 'Q.forEach((item, i) => q(\'' + section_name + 'q_\' + String(i + 1).padStart(2, \'0\'), item[0], item[1], item[2], \'' + section_name + '\', \'' + section_name + '_topic\', 1, true));\n')
        f.write('\n')

print('new_sections.js created')
