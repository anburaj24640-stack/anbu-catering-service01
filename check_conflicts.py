with open("assets/css/style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Look for duplicate .nav-menu or .menu-toggle rules
pos = css.find("/* Tablet & Smaller Desktops (<= 1140px) */")
print("Position of old MQ:", pos)
if pos != -1:
    print(css[pos:pos+1000])
