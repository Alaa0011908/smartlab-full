
f = open('new_sections.js', 'w', encoding='utf-8')
q = chr(39)

# Section 4: ipv6
f.write('// SECTION 4: ipv6 (30 + 12 quick)\n')
f.write('const ipv6 = [\n')

questions = [
    ['ما هو طول عنوان IPv6 بالبتات؟', ['128 بت', '64 بت', '32 بت', '256 بت'], 0, 1],
    ['كم عدد العناوين الممكنة في IPv6 تقريباً؟', ['3.4 × 10^38', '4.3 × 10^9', '1.8 × 10^19', '6.5 × 10^12'], 0, 1],
    ['كيف يُكتب عنوان IPv6؟', ['8 مجموعات من 4 أرقام عشرية سداسية عشر مفصولة بـ :', '4 مجموعات من 8 بت مفصولة بـ .', '16 رقم عشري', '8 أرقام ثنائية'], 0, 1],
]

for q_data in questions:
    f.write('  [' + q + q_data[0] + q + ', [')
    for i, opt in enumerate(q_data[1]):
        if i > 0:
            f.write(', ')
        f.write(q + opt + q)
    f.write('], ' + str(q_data[2]) + ', ' + str(q_data[3]) + '],\n')

f.write('];\n')
f.close()
print('Done')
