with open("assets/css/style.css", "r", encoding="utf-8") as f:
    css = f.read()

pos_old_mq = css.find("/* Tablet & Smaller Desktops (<= 1140px) */")
pos_drawer_css = css.find("/* ========================================================\n   MOBILE DRAWER & COMPACT ACTION BUTTONS (BULLETPROOF UX)")

print("pos_old_mq:", pos_old_mq)
print("pos_drawer_css:", pos_drawer_css)

# If pos_old_mq exists and is before pos_drawer_css, let's see how much to remove
if pos_old_mq != -1 and pos_drawer_css != -1 and pos_old_mq < pos_drawer_css:
    # Cut out from pos_old_mq to pos_drawer_css
    cleaned_css = css[:pos_old_mq] + css[pos_drawer_css:]
    with open("assets/css/style.css", "w", encoding="utf-8") as f:
        f.write(cleaned_css)
    print("SUCCESS: Cleaned up duplicate old media query block!")
else:
    print("No cut needed or positions different.")
