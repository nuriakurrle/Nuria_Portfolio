#!/usr/bin/env python3
"""
Apply 4-section template conversion to all 5 projects.
Maps existing content from old format to new section01-04 structure.
"""

import re, json

def extract_project_section(lines, start, end):
    """Extract a project's lines"""
    return ''.join(lines[start:end+1])

def create_section01_template(project_data):
    """Create section01 from problem-related fields"""
    de = project_data['de']
    return {
        "number": "01/04",
        "title": de.get('title', 'Das Problem'),
        "subtitle": de.get('problemStatement', '')[:100] + '...',
        "statement": de.get('problemStatement', ''),
        "context": de.get('problemContext', ''),
        "researchHighlights": de.get('research', []),
        "images": []  # Extract from heroImage if available
    }

def extract_json_block(text, key_name):
    """Safely extract JSON-like objects from JSX"""
    # This is complex - JSX strings aren't pure JSON
    # For now, return the raw structure
    return {}

# Read full file
with open('data.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

boundaries = {
    'echoes': (614, 876),  # 0-indexed
    'vinted': (878, 1174),
    'munichapp': (1176, 1366),
    'donbosco': (1368, 1447),
    'clarity': (1449, 1642),
}

print("=" * 60)
print("CONVERSION STRATEGY")
print("=" * 60)

print("\nPhase 1: Analyze each project's current structure")
for proj, (start, end) in boundaries.items():
    section = extract_project_section(lines, start, end)
    print(f"\n✓ {proj:12} ({end-start:3d} lines)")
    
    # Look for key fields
    has_problem = 'problemStatement' in section
    has_research = 'research:' in section
    has_solution = 'solutionStatement' in section
    has_metrics = 'metrics:' in section
    has_learnings = 'learnings:' in section
    
    print(f"   Fields: problem={'✓' if has_problem else '✗'} " +
          f"research={'✓' if has_research else '✗'} " +
          f"solution={'✓' if has_solution else '✗'} " +
          f"metrics={'✓' if has_metrics else '✗'} " +
          f"learnings={'✓' if has_learnings else '✗'}")

print("\n" + "=" * 60)
print("Next: Apply structured replacements")
print("=" * 60)
print("\nRecommendation: Use multi_replace_string_in_file or")
print("manually craft section01-04 structures with existing content.")

