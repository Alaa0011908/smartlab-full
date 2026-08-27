import re

with open('generate-questions.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the position of "// Write output file"
marker = "// Write output file"
marker_pos = content.find(marker)

if marker_pos == -1:
    print("ERROR: marker not found")
    exit(1)

new_sections = r'''
