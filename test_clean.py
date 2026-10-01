with open("assets/css/style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Check for any remaining translateY in nav-menu
import re
matches = [m.start() for m in re.finditer(r'translateY\(-1\d\d%\)', css)]
print("Remaining translateY(-1xx%):", len(matches))

# Check for nav-menu rules
nav_matches = [m.start() for m in re.finditer(r'\.nav-menu\s*\{', css)]
print("Total .nav-menu declarations:", len(nav_matches))
