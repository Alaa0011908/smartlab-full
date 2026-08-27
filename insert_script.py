import re

with open("generate-questions.js", "r", encoding="utf-8") as f:
    content = f.read()

marker = "// Write output file"
marker_pos = content.find(marker)

if marker_pos == -1:
    print("ERROR: marker not found")
    exit(1)

new_sections = open("new_sections.js", "r", encoding="utf-8").read()

new_content = content[:marker_pos] + new_sections + content[marker_pos:]

with open("generate-questions.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Sections inserted successfully")
