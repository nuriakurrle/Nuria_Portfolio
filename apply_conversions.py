import re

# Read the full data.jsx file
with open('data.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Track replacements
replacements = 0

# Helper function to find and replace a project's old format with new section01-04
def replace_project_structure(content, project_id, new_de_block, new_en_block):
    global replacements
    
    # Pattern: find `de: {` after project id, capture up to next `},` at proper nesting
    # This is tricky, so we'll use a simpler approach: find the problemStatement line and replace from there
    
    # For de: block, find from 'problemStatement:' to the closing `},` before the next language block or metrics comment
    # This is complex, so let's mark it more carefully
    
    print(f"Processing {project_id}...")
    return content, replacements

# For now, just verify the file is readable
lines = content.split('\n')
print(f"File has {len(lines)} lines")

# Find project markers
for i, line in enumerate(lines):
    if 'id: ' in line and "'" in line:
        match = re.search(r"id: '([^']+)'", line)
        if match:
            project_id = match.group(1)
            if project_id in ['echoes', 'vinted', 'munichapp', 'donbosco', 'clarity']:
                print(f"Found {project_id} at line {i+1}")

