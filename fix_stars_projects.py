import re

with open('css/sections.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix project spacing
css = css.replace("flex: 1;\n  margin-bottom: 20px;", "margin-bottom: 20px;")
css = css.replace("margin-top: auto;\n}", "}")

# Add shine to strongest tag
shine_css = """
.tag.strongest {
  background: linear-gradient(135deg, rgba(245,158,11,.18), rgba(234,179,8,.08));
  border: 1.5px solid rgba(245,158,11,.55);
  color: #d97706;
  font-weight: 600;
  padding-right: 30px;
  box-shadow: 0 2px 12px rgba(245,158,11,.15), inset 0 0 0 1px rgba(255,215,0,.08);
  position: relative;
  overflow: hidden;
}
.tag.strongest::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-20deg);
  animation: shine 3s infinite;
}
@keyframes shine {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}
"""

css = re.sub(r'\.tag\.strongest \{[\s\S]*?position: relative;\n\}', shine_css.strip(), css)

with open('css/sections.css', 'w', encoding='utf-8') as f:
    f.write(css)

