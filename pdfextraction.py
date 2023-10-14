import aspose.words as aw
from bs4 import BeautifulSoup
import requests

doc = aw.Document("Algebra2_Holt_Test.pdf")
#doc = aw.Document("dasgupta-lp.pdf")

html_file = "Output.html"
doc.save(html_file)


def remove_images_from_html(html_file):
    print("removing images")
    with open(html_file, "r", encoding="utf-8") as file:
        html = file.read()

    soup = BeautifulSoup(html, "html.parser")

    # Find and remove all image tags
    for img_tag in soup.find_all("img"):
        img_tag.extract()

    # Save the modified HTML back to a file
    with open(html_file, "w", encoding="utf-8") as file:
        file.write(str(soup))

# Input HTML file path

# Remove images from HTML
remove_images_from_html(html_file)
