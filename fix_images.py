import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('src="./assets/Projects/Medbay.jpg" alt="Deep Learning" class="pg-img" style="filter: hue-rotate(90deg);" onerror', 'src="./assets/Projects/DeepLearning.jpg" alt="Deep Learning" class="pg-img" onerror')
html = html.replace('src="./assets/Projects/Medbay.jpg" alt="Lightsek" class="pg-img" style="filter: grayscale(1);" onerror', 'src="./assets/Projects/Lightsek.png" alt="Lightsek" class="pg-img" onerror')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('Projects.html', 'r', encoding='utf-8') as f:
    p_html = f.read()

# Update image paths in Projects.html
p_html = p_html.replace('src="./Projects/', 'src="./assets/Projects/')
p_html = p_html.replace('Green Bridge.png', 'GreenBridge.jpg')
p_html = p_html.replace('MedBook.png', 'Medbay.jpg')
p_html = p_html.replace('Bus Ticket system.png', 'bus.png')
p_html = p_html.replace('Playneax logo.png', 'PlayNexa.jpg')
p_html = p_html.replace('UniMind_Logo.png', 'Unimind_landing_page.jpg')

# Also fix the link back to home
p_html = p_html.replace('<a href="index.html#experience">Work</a>', '<a href="index.html#experience">Work</a>\n      <a href="index.html#projects">Projects</a>')

with open('Projects.html', 'w', encoding='utf-8') as f:
    f.write(p_html)

