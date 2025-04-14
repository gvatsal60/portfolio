import os
import sys
import re

def update_action_url(file_path, new_url):
    try:
        # Read the file content
        with open(file_path, "r") as file:
            content = file.read()

        # Use regex to specifically target the form with id="contactForm"
        updated_content = re.sub(
            r'(id="contactForm".*?action=")#"',
            rf'\1{new_url}"',
            content,
            flags=re.DOTALL
        )

        # Write the updated content back to the file
        with open(file_path, "w") as file:
            file.write(updated_content)

        print(f"Successfully updated the action URL for id='contactForm' in {file_path}")
    except Exception as e:
        print(f"Error updating the action URL: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Get the file path and new URL from environment variables
    file_path = os.getenv("HTML_FILE_PATH", "src/index.html")
    new_url = os.getenv("FORM_ACTION_URL")

    if not new_url:
        print("Error: FORM_ACTION_URL environment variable is not set.")
        sys.exit(1)

    update_action_url(file_path, new_url)