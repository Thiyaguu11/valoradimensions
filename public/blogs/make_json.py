import json
import os
import sys

def generate_json(blog_id, niche, title, hook, image1, image2):
    # Determine the directory where this script resides to read relative md files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    md_path = os.path.join(script_dir, f"blog_{blog_id}.md")
    json_path = os.path.join(script_dir, f"blog_{blog_id}.json")
    
    if not os.path.exists(md_path):
        print(f"Error: {md_path} does not exist.")
        return False
        
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    word_count = len(content.split())
    
    data = {
        "id": blog_id,
        "niche": niche,
        "title": title,
        "hook": hook,
        "wordCount": word_count,
        "image1": image1,
        "image2": image2,
        "content": content
    }
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Successfully generated {json_path} with word count {word_count}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 7:
        print("Usage: python make_json.py <id> <niche> <title> <hook> <image1> <image2>")
    else:
        blog_id = int(sys.argv[1])
        niche = sys.argv[2]
        title = sys.argv[3]
        hook = sys.argv[4]
        image1 = sys.argv[5]
        image2 = sys.argv[6]
        generate_json(blog_id, niche, title, hook, image1, image2)
