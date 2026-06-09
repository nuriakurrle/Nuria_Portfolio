#!/usr/bin/env python3
import re

# Backup
import shutil
shutil.copy('data.jsx', 'data.jsx.backup')

# Read file
with open('data.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# For each project, we need to replace the de: { ... }, { ... } blocks with section01-04 structures
# This is complex, so let's use marker-based replacement

print("Starting conversions...")

# Function to find content between markers
def replace_between_markers(content, project_id, old_marker_start, new_block):
    # Find the old section and replace it
    # This is project-specific, so we'll build patterns carefully
    
    projects_to_convert = {
        'echoes': 'pink',
        'vinted': 'peach', 
        'munichapp': 'brand',
        'donbosco': 'mint',
        'clarity': 'mint'
    }
    
    if project_id in projects_to_convert:
        print(f"✓ {project_id} queued for conversion")
    
    return content

# Just verify the structure is understood
for proj in ['echoes', 'vinted', 'munichapp', 'donbosco', 'clarity']:
    replace_between_markers(content, proj, None, None)

print("\nTo apply all 5 conversions, use multi_replace_string_in_file with:")
print("- 5 simultaneous replacements (echoes, vinted, munichapp, donbosco, clarity)")
print("- Each oldString: current de/en structure")
print("- Each newString: new section01-04 structure")
print("\nReady to apply!")

