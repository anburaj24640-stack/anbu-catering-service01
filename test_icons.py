with open("assets/css/style.css", "r", encoding="utf-8") as f:
    css = f.read()

pos = css.find("nav-link-icon")
print("nav-link-icon pos:", pos)
if pos != -1:
    print(css[pos-100:pos+800])
