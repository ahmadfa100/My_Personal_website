import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define section patterns. We will capture them.
# The page content starts with <div id="page"> and ends with <!-- /#page -->
# I'll find sections by searching for <!-- ═══════════ [NAME] ═══════════ -->
# Hero
hero_m = re.search(r'<!-- ═══════════ HERO ═══════════ -->.*?<!-- ═══════════ EXPERIENCE ═══════════ -->', content, re.DOTALL)
if not hero_m: print("Hero not found")

exp_m = re.search(r'<!-- ═══════════ EXPERIENCE ═══════════ -->.*?<!-- ═══════════ PROJECTS ═══════════ -->', content, re.DOTALL)
if not exp_m: print("Exp not found")

proj_m = re.search(r'<!-- ═══════════ PROJECTS ═══════════ -->.*?<!-- ═══════════ SKILLS ═══════════ -->', content, re.DOTALL)
if not proj_m: print("Proj not found")

skills_m = re.search(r'<!-- ═══════════ SKILLS ═══════════ -->.*?<!-- ═══════════ EDUCATION ═══════════ -->', content, re.DOTALL)
if not skills_m: print("Skills not found")

edu_m = re.search(r'<!-- ═══════════ EDUCATION ═══════════ -->.*?<!-- ═══════════ COURSES ═══════════ -->', content, re.DOTALL)
if not edu_m: print("Edu not found")

courses_m = re.search(r'<!-- ═══════════ COURSES ═══════════ -->.*?<!-- ═══════════ CONTACT ═══════════ -->', content, re.DOTALL)
if not courses_m: print("Courses not found")

contact_m = re.search(r'<!-- ═══════════ CONTACT ═══════════ -->.*?<!-- ═══════════ FOOTER ═══════════ -->', content, re.DOTALL)
if not contact_m: print("Contact not found")

# Now reassemble.
# 1. Hero
hero_text = hero_m.group(0).replace('<!-- ═══════════ EXPERIENCE ═══════════ -->', '')
# Add AWS banner right after Hero section
aws_banner = """
  <!-- ═══════════ AWS CERT ═══════════ -->
  <section id="certifications" aria-label="Certifications">
    <div class="container">
      <div class="cert-banner reveal">
        <div class="cert-aws-i"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"/><path d="M8 12l3 3 5-5"/></svg></div>
        <div class="cert-body">
          <div class="cert-name">AWS Certified Cloud Practitioner</div>
          <div class="cert-sub">Amazon Web Services (AWS)</div>
        </div>
        <div class="cert-badge">Valid 2026 – 2029</div>
      </div>
    </div>
  </section>

"""
hero_text += aws_banner

skills_text = skills_m.group(0).replace('<!-- ═══════════ EDUCATION ═══════════ -->', '')
exp_text = exp_m.group(0).replace('<!-- ═══════════ PROJECTS ═══════════ -->', '')
proj_text = proj_m.group(0).replace('<!-- ═══════════ SKILLS ═══════════ -->', '')
courses_text = courses_m.group(0).replace('<!-- ═══════════ CONTACT ═══════════ -->', '')
contact_text = contact_m.group(0).replace('<!-- ═══════════ FOOTER ═══════════ -->', '')

# Replace the whole block from HERO to FOOTER
start_idx = content.find('<!-- ═══════════ HERO ═══════════ -->')
end_idx = content.find('<!-- ═══════════ FOOTER ═══════════ -->')

new_content = content[:start_idx] + hero_text + skills_text + exp_text + proj_text + courses_text + contact_text + content[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("HTML Structure Updated!")
